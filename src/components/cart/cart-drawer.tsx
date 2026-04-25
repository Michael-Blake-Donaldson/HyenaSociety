"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/components/cart/cart-provider";

export function CartDrawer() {
  const { cart, isOpen, subtotal, closeCart, removeItem } = useCart();

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-label="Close cart"
          />

          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed right-0 top-0 z-50 flex h-svh w-full max-w-md flex-col border-l border-white/10 bg-black px-5 py-6 sm:px-6"
          >
            <div className="flex items-center justify-between">
              <p className="font-serif text-2xl text-brand-secondary">Cart</p>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-brand-secondary/80 transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 flex-1 space-y-4 overflow-y-auto pr-1">
              {cart.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-sm text-brand-secondary/65">
                  Your cart is currently empty.
                </div>
              ) : (
                cart.map((item) => (
                  <article key={`${item.productId}-${item.size}`} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                    <div className="relative h-20 w-16 overflow-hidden rounded-lg">
                      <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <p className="text-sm text-brand-secondary">{item.name}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.14em] text-brand-secondary/55">Size {item.size}</p>
                      <div className="mt-auto flex items-center justify-between">
                        <p className="text-sm text-brand-secondary/80">{formatCurrency(item.unitPrice * item.quantity)}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.size)}
                          className="text-xs uppercase tracking-[0.14em] text-brand-secondary/55 transition-colors duration-500 hover:text-brand-accent"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            <div className="mt-6 space-y-4 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between text-sm text-brand-secondary/85">
                <p>Subtotal</p>
                <p>{formatCurrency(subtotal)}</p>
              </div>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="inline-flex h-12 w-full items-center justify-center rounded-full border border-brand-accent bg-brand-accent text-xs font-medium uppercase tracking-[0.16em] text-black transition-colors duration-500 hover:bg-brand-accent/90"
              >
                Checkout
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
