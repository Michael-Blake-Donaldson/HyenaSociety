"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/components/cart/cart-provider";

const AUTH_TOKEN_KEY = "hyena.auth.token";

export function CheckoutPanel() {
  const { cart, subtotal } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (cart.length === 0) {
      return;
    }

    const token = localStorage.getItem(AUTH_TOKEN_KEY);
    if (!token) {
      setError("Sign in from Account before checkout.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);

    const shipping = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? "") || undefined,
      line1: String(formData.get("line1") ?? ""),
      line2: String(formData.get("line2") ?? "") || undefined,
      city: String(formData.get("city") ?? ""),
      state: String(formData.get("state") ?? ""),
      postalCode: String(formData.get("postalCode") ?? ""),
      country: String(formData.get("country") ?? "US").toUpperCase(),
    };

    try {
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cart.map((item) => ({
            productId: item.productId,
            size: item.size,
            quantity: item.quantity,
          })),
          shipping,
        }),
      });

      const payload = (await response.json()) as { checkoutUrl?: string; error?: string };
      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error ?? "Unable to initialize Stripe checkout.");
      }

      window.location.href = payload.checkoutUrl;
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Checkout request failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Secure Checkout</p>
          <h1 className="mt-4 font-serif text-4xl text-brand-secondary sm:text-5xl">Order Review</h1>
        </div>
        {cart.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-black/40 p-6 text-brand-secondary/70">
            Your cart is empty. Add a product to continue.
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <article key={`${item.productId}-${item.size}`} className="flex items-center justify-between rounded-2xl border border-white/10 p-4">
                <div>
                  <p className="text-sm text-brand-secondary">{item.name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-secondary/55">
                    Size {item.size} • Qty {item.quantity}
                  </p>
                </div>
                <p className="text-sm text-brand-secondary/80">{formatCurrency(item.unitPrice * item.quantity)}</p>
              </article>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid gap-3 rounded-2xl border border-white/10 bg-black/40 p-5 sm:grid-cols-2">
          <p className="sm:col-span-2 text-xs uppercase tracking-[0.18em] text-brand-secondary/55">Shipping details</p>
          <input
            name="name"
            required
            placeholder="Full name"
            autoComplete="name"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            autoComplete="email"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="phone"
            placeholder="Phone (optional)"
            autoComplete="tel"
            inputMode="tel"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="line1"
            required
            placeholder="Address line 1"
            autoComplete="address-line1"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="line2"
            placeholder="Address line 2"
            autoComplete="address-line2"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="city"
            required
            placeholder="City"
            autoComplete="address-level2"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="state"
            required
            placeholder="State"
            autoComplete="address-level1"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="postalCode"
            required
            placeholder="Postal code"
            autoComplete="postal-code"
            inputMode="numeric"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />
          <input
            name="country"
            defaultValue="US"
            required
            minLength={2}
            maxLength={2}
            placeholder="Country code"
            autoComplete="country"
            className="h-11 rounded-xl border border-white/15 bg-black/50 px-4 text-sm uppercase text-brand-secondary outline-none transition-colors focus:border-brand-accent"
          />

          <button
            type="submit"
            className="sm:col-span-2 mt-2 inline-flex h-12 items-center justify-center rounded-full border border-brand-accent bg-brand-accent text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors duration-500 hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={cart.length === 0 || isSubmitting}
          >
            {isSubmitting ? "Redirecting..." : "Continue to Payment"}
          </button>

          {error ? (
            <p role="alert" aria-live="polite" className="sm:col-span-2 text-sm text-brand-accent">
              {error}
            </p>
          ) : null}
        </form>
      </section>

      <aside className="h-fit rounded-3xl border border-white/10 bg-white/3 p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Summary</p>
        <div className="mt-6 flex items-center justify-between text-sm text-brand-secondary/80">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-brand-secondary/80">
          <span>Shipping</span>
          <span>Calculated at next step</span>
        </div>

        <Link
          href="/collection"
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full border border-white/15 text-xs font-medium uppercase tracking-[0.16em] text-brand-secondary/80 transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent"
        >
          Continue Shopping
        </Link>
      </aside>
    </div>
  );
}
