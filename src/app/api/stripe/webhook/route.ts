import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/db/prisma";
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

  // Check if event has already been processed (idempotency)
  const existingEvent = await prisma.stripeEvent.findUnique({
    where: { stripeEventId: event.id },
  });

  if (existingEvent) {
    // Event already processed, return success without reprocessing
    return NextResponse.json({ received: true, reprocessed: true });
  }

  try {
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
        } catch (printifyError) {
          // Webhook should still acknowledge payment even if fulfillment fails.
          console.error("[PRINTIFY WEBHOOK ERROR]", printifyError);
        }
      }
    }

    // Record event as processed
    await prisma.stripeEvent.create({
      data: {
        stripeEventId: event.id,
      },
    });
  } catch (error) {
    console.error("[STRIPE WEBHOOK PROCESSING ERROR]", error);
    // Return 500 so Stripe retries
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
