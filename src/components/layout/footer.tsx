import Link from "next/link";
import { brand } from "@/lib/constants/brand";

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-surface">
      <div className="mx-auto w-full max-w-none px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-accent">
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-black" aria-hidden="true">
                  <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 2.18L19 8v8l-7 3.88L5 16V8l7-3.82z" />
                </svg>
              </span>
              <p className="text-[12px] font-bold uppercase tracking-[0.24em] text-white">{brand.name}</p>
            </div>
            <p className="max-w-xs text-[12px] leading-relaxed text-brand-muted">{brand.description}</p>
          </div>

          <div className="flex gap-12">
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accent">Shop</p>
              {[{ label: "Collection", href: "/collection" }, { label: "New Drops", href: "/collection" }].map((l) => (
                <Link key={l.href + l.label} href={l.href} className="block text-[11px] uppercase tracking-[0.18em] text-brand-muted transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accent">Brand</p>
              {[{ label: "Our Story", href: "/story" }, { label: "Account", href: "/account" }].map((l) => (
                <Link key={l.href + l.label} href={l.href} className="block text-[11px] uppercase tracking-[0.18em] text-brand-muted transition-colors hover:text-white">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-line pt-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-muted/60">
            © {new Date().getFullYear()} {brand.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
