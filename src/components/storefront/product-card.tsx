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
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-brand-line bg-brand-surface/40">
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={false}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent" />
          <Image
            src={product.images.secondary}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            priority={false}
          />
          <span className="absolute left-3 top-3 rounded-full border border-brand-line bg-brand-primary/70 px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-brand-secondary/82">
            New Drop
          </span>
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-brand-muted">{product.category}</p>
            <h3 className="mt-2 text-lg font-medium uppercase tracking-[0.05em] text-brand-secondary">{product.name}</h3>
          </div>
          <p className="text-sm text-brand-secondary/84">{formatCurrency(product.basePrice)}</p>
        </div>
      </article>
    </Link>
  );
}
