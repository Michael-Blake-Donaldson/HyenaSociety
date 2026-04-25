"use client";

import { useState } from "react";
import Link from "next/link";
import { Grid2X2, Menu, X } from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { brand, navigation } from "@/lib/constants/brand";

export function Navbar() {
  const { openCart, itemCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const cartLabel = `CART ${String(itemCount).padStart(2, "0")}`;

  return (
    <header className="sticky top-0 z-40 bg-brand-primary/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-none items-center justify-between px-5 sm:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-brand-accent bg-brand-accent">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-black" aria-hidden="true">
              <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.18L19 8v8l-7 3.88L5 16V8l7-3.82z" />
            </svg>
          </span>
          <span className="text-[13px] font-bold uppercase tracking-[0.22em] text-white">
            {brand.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-muted transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
            className="inline-flex h-9 items-center justify-center px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-muted transition-colors hover:text-white md:hidden"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          {/* Cart */}
          <button
            type="button"
            onClick={openCart}
            aria-label="Open cart"
            className="inline-flex h-9 items-center justify-center rounded-sm border border-white/20 bg-transparent px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:border-white/60"
          >
            {cartLabel}
          </button>

          {/* Shop */}
          <Link
            href="/collection"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-sm bg-brand-accent px-4 text-[11px] font-bold uppercase tracking-[0.18em] text-black transition-opacity duration-300 hover:opacity-85"
          >
            SHOP
            <Grid2X2 className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen ? (
        <div className="border-t border-brand-line bg-brand-surface px-5 py-5 sm:px-8 md:hidden">
          <nav className="flex flex-col gap-5">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-muted transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
