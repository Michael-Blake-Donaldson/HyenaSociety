import { brand } from "@/lib/constants/brand";

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-surface/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-5 py-10 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.24em] text-brand-secondary/90">{brand.name}</p>
        <p className="max-w-xl text-sm text-brand-muted">{brand.description}</p>
        <p className="pt-2 text-xs uppercase tracking-[0.16em] text-brand-muted/80">
          {new Date().getFullYear()} {brand.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
