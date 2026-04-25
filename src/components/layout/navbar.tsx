import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { brand, navigation } from "@/lib/constants/brand";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-serif text-lg tracking-[0.22em] text-brand-secondary">
          {brand.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm uppercase tracking-[0.18em] text-brand-secondary/80 transition-colors duration-500 hover:text-brand-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Open cart"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-accent/40 text-brand-secondary transition-colors duration-500 hover:border-brand-accent hover:text-brand-accent"
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
      </div>
    </header>
  );
}
