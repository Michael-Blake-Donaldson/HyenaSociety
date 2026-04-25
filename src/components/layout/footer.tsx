import { brand } from "@/lib/constants/brand";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/90">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-10 sm:px-8">
        <p className="font-serif text-lg tracking-[0.16em] text-brand-secondary">{brand.name}</p>
        <p className="max-w-xl text-sm text-brand-secondary/60">{brand.description}</p>
        <p className="pt-2 text-xs uppercase tracking-[0.16em] text-brand-secondary/50">
          {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
