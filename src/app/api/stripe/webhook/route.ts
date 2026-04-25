import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/db/prisma";
import { getStripeClient } from "@/lib/payments/stripe";
import { sendOrderToPrintify } from "@/lib/printify/fulfillment";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing Stripe webhook configuration" }, { status: 400 });
  }

  const body = await request.text();
  const stripe = getStripeClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid webhook signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const order = await prisma.order.findFirst({
      where: {
        OR: [{ stripeCheckoutId: session.id }, { id: session.metadata?.orderId }],
      },
    });

    if (order && order.status !== "PAID") {
      await prisma.order.update({
        where: { id: order.id },
        data: {
          status: "PAID",
          stripePaymentId: typeof session.payment_intent === "string" ? session.payment_intent : null,
        },
      });

      try {
        await sendOrderToPrintify(order.id);
      } catch {
        // Webhook should still acknowledge payment even if fulfillment fails.
      }
    }
  }

  return NextResponse.json({ received: true });
}
