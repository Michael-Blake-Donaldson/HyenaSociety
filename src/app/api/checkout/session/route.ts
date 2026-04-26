import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUserId } from "@/lib/auth/session";
import { prisma } from "@/lib/db/prisma";
import { getStripeClient } from "@/lib/payments/stripe";
import { mockProducts } from "@/lib/data/mock-products";

const payloadSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        size: z.string(),
        quantity: z.number().int().positive(),
      }),
    )
    .min(1),
  shipping: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    postalCode: z.string().min(1),
    country: z.string().min(2).max(2),
  }),
});

export async function POST(request: Request) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const payload = payloadSchema.parse(json);

    const lineItems: Array<{
      productId: string;
      productName: string;
      quantity: number;
      unitPrice: number;
      size: string;
      variantId: string | null;
    }> = [];

    for (const item of payload.items) {
      let product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true },
      });

      if (!product) {
        const mock = mockProducts.find((entry) => entry.id === item.productId);
        if (!mock) {
          return NextResponse.json({ error: `Unknown product ${item.productId}` }, { status: 400 });
        }

        product = await prisma.product.upsert({
          where: { slug: mock.slug },
          update: {
            name: mock.name,
            description: mock.description,
            category: mock.category,
            basePrice: mock.basePrice,
            images: [mock.images.primary, mock.images.secondary],
            sizes: mock.sizes,
            isActive: true,
          },
          create: {
            id: mock.id,
            slug: mock.slug,
            name: mock.name,
            description: mock.description,
            category: mock.category,
            basePrice: mock.basePrice,
            images: [mock.images.primary, mock.images.secondary],
            sizes: mock.sizes,
            isActive: true,
          },
          include: { variants: true },
        });
      }

      const matchedVariant = product.variants.find((variant) => variant.size === item.size && variant.isEnabled);

      lineItems.push({
        productId: product.id,
        productName: product.name,
        quantity: item.quantity,
        unitPrice: product.basePrice * 100,
        size: item.size,
        variantId: matchedVariant?.id ?? null,
      });
    }

    const subtotal = lineItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
    const shipping = 0;
    const tax = Math.round(subtotal * 0.07);
    const total = subtotal + shipping + tax;

    const order = await prisma.order.create({
      data: {
        userId,
        subtotal,
        shipping,
        tax,
        total,
        shippingName: payload.shipping.name,
        shippingEmail: payload.shipping.email,
        shippingPhone: payload.shipping.phone,
        shippingLine1: payload.shipping.line1,
        shippingLine2: payload.shipping.line2,
        shippingCity: payload.shipping.city,
        shippingState: payload.shipping.state,
        shippingPostalCode: payload.shipping.postalCode,
        shippingCountry: payload.shipping.country,
        items: {
          create: lineItems.map((item) => ({
            productId: item.productId,
            variantId: item.variantId,
            productName: item.productName,
            size: item.size,
            quantity: item.quantity,
            unitPrice: item.unitPrice,
            lineTotal: item.unitPrice * item.quantity,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      billing_address_collection: "required",
      customer_email: payload.shipping.email,
      line_items: lineItems.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: item.unitPrice,
          product_data: {
            name: item.productName,
            metadata: {
              productId: item.productId,
              size: item.size,
            },
          },
        },
      })),
      metadata: {
        orderId: order.id,
      },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel?order_id=${order.id}`,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeCheckoutId: session.id },
    });

    return NextResponse.json({ checkoutUrl: session.url, orderId: order.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid checkout payload", details: error.flatten() }, { status: 400 });
    }

    const message = error instanceof Error ? error.message : "Unable to create checkout session";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
