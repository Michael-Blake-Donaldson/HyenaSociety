"use client";

import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/components/cart/cart-provider";

export function CheckoutPanel() {
  const { cart, subtotal } = useCart();

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
      <section className="space-y-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
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
      </section>

      <aside className="h-fit rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-brand-secondary/55">Summary</p>
        <div className="mt-6 flex items-center justify-between text-sm text-brand-secondary/80">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm text-brand-secondary/80">
          <span>Shipping</span>
          <span>Calculated at next step</span>
        </div>

        <button
          type="button"
          className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-full border border-brand-accent bg-brand-accent text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors duration-500 hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={cart.length === 0}
        >
          Continue to Payment
        </button>

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
