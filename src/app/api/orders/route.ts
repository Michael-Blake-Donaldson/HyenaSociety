import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { z } from "zod";
import { verifyAuthToken } from "@/lib/auth/jwt";
import { prisma } from "@/lib/db/prisma";

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        size: z.string(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().int().nonnegative(),
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
    country: z.string().min(1),
  }),
});

function parseBearerToken(authHeader?: string | null) {
  if (!authHeader) {
    return null;
  }

  const [scheme, token] = authHeader.split(" ");
  if (scheme?.toLowerCase() !== "bearer" || !token) {
    return null;
  }

  return token;
}

async function getAuthUserId() {
  const requestHeaders = await headers();
  const token = parseBearerToken(requestHeaders.get("authorization"));

  if (!token) {
    return null;
  }

  try {
    const payload = verifyAuthToken(token);
    return payload.userId;
  } catch {
    return null;
  }
}

export async function GET() {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const orders = await prisma.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ orders });
}

export async function POST(request: Request) {
  const userId = await getAuthUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await request.json();
    const payload = createOrderSchema.parse(json);

    const subtotal = payload.items.reduce((sum, item) => sum + item.quantity * item.unitPrice * 100, 0);
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
          create: payload.items.map((item) => ({
            productId: item.productId,
            productName: item.productId,
            size: item.size,
            quantity: item.quantity,
            unitPrice: item.unitPrice * 100,
            lineTotal: item.quantity * item.unitPrice * 100,
          })),
        },
      },
      include: {
        items: true,
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid order payload", details: error.flatten() }, { status: 400 });
    }

    return NextResponse.json({ error: "Unable to create order" }, { status: 500 });
  }
}
