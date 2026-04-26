import Stripe from "stripe";
import { env } from "@/lib/env";

// Validate env vars at import time
void env;

declare global {
  var stripeClient: Stripe | undefined;
}

function createStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not configured");
  }

  return new Stripe(secretKey, {
    appInfo: {
      name: "Hyena Society",
      version: "1.0.0",
    },
  });
}

export function getStripeClient() {
  if (global.stripeClient) {
    return global.stripeClient;
  }

  const client = createStripeClient();

  if (process.env.NODE_ENV !== "production") {
    global.stripeClient = client;
  }

  return client;
}
