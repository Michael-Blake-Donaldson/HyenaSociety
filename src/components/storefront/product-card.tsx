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
        <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority={false}
          />
          <Image
            src={product.images.secondary}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            className="object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            priority={false}
          />
        </div>

        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.14em] text-brand-secondary/55">{product.category}</p>
            <h3 className="mt-2 font-serif text-xl text-brand-secondary">{product.name}</h3>
          </div>
          <p className="text-sm text-brand-secondary/80">{formatCurrency(product.basePrice)}</p>
        </div>
      </article>
    </Link>
  );
}
