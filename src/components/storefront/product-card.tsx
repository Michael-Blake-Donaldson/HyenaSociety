import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types/store";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/product/${product.slug}`} className="group">
      <article className="space-y-4">
        <div className="relative aspect-4/5 overflow-hidden bg-brand-surface">
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />
          <Image
            src={product.images.secondary}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            priority={false}
          />
          <span className="absolute left-0 top-4 bg-brand-accent px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
            New Drop
          </span>
        </div>

        <div className="flex items-end justify-between gap-3 pt-1">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-brand-accent">{product.category}</p>
            <h3 className="mt-1.5 text-base font-bold uppercase tracking-tight text-white">{product.name}</h3>
          </div>
          <p className="text-sm font-semibold text-white/70">{formatCurrency(product.basePrice)}</p>
        </div>
      </article>
    </Link>
  );
}
