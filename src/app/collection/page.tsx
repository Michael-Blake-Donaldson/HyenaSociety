import { CollectionFilters } from "@/components/storefront/collection-filters";
import { ProductCard } from "@/components/storefront/product-card";
import { getCollectionProducts } from "@/lib/data/mock-products";
import type { ProductCategory, ProductSize } from "@/types/store";

type CollectionPageProps = {
  searchParams: Promise<{
    category?: ProductCategory;
    size?: ProductSize;
    price?: string;
  }>;
};

function getPriceRange(price?: string): { minPrice?: number; maxPrice?: number } {
  if (price === "under-150") {
    return { maxPrice: 149 };
  }

  if (price === "150-220") {
    return { minPrice: 150, maxPrice: 220 };
  }

  if (price === "over-220") {
    return { minPrice: 221 };
  }

  return {};
}

export default async function CollectionPage({ searchParams }: CollectionPageProps) {
  const query = await searchParams;

  const products = getCollectionProducts({
    category: query.category,
    size: query.size,
    ...getPriceRange(query.price),
  });

  return (
    <section className="mx-auto w-full max-w-7xl px-5 py-20 sm:px-8 md:py-28">
      <div className="mb-12 space-y-5">
        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-brand-accent">Hyena Society Collection</p>
        <h1 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-secondary sm:text-6xl">
          Luxury performance essentials
        </h1>
        <p className="max-w-2xl text-sm leading-7 text-brand-secondary/70 sm:text-base">
          Precision-engineered silhouettes with premium fabrication and restrained design language.
        </p>
      </div>

      <CollectionFilters
        activeCategory={query.category}
        activeSize={query.size}
        activePrice={query.price}
      />

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-white/10 bg-white/3 p-8 text-sm text-brand-secondary/70">
            No products match your filters.
          </div>
        ) : (
          products.map((product) => <ProductCard key={product.id} product={product} />)
        )}
      </div>
    </section>
  );
}
