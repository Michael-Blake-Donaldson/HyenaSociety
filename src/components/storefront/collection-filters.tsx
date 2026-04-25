import Link from "next/link";
import type { ProductCategory, ProductSize } from "@/types/store";

type CollectionFiltersProps = {
  activeCategory?: ProductCategory;
  activeSize?: ProductSize;
  activePrice?: string;
};

const categories: Array<{ label: string; value?: ProductCategory }> = [
  { label: "All", value: undefined },
  { label: "Tops", value: "tops" },
  { label: "Bottoms", value: "bottoms" },
  { label: "Sets", value: "sets" },
];

const sizes: Array<{ label: string; value?: ProductSize }> = [
  { label: "Any", value: undefined },
  { label: "XS", value: "XS" },
  { label: "S", value: "S" },
  { label: "M", value: "M" },
  { label: "L", value: "L" },
  { label: "XL", value: "XL" },
];

const prices: Array<{ label: string; value?: string }> = [
  { label: "Any", value: undefined },
  { label: "Under $150", value: "under-150" },
  { label: "$150 to $220", value: "150-220" },
  { label: "Over $220", value: "over-220" },
];

function getHref(category?: ProductCategory, size?: ProductSize, price?: string) {
  const params = new URLSearchParams();

  if (category) params.set("category", category);
  if (size) params.set("size", size);
  if (price) params.set("price", price);

  const query = params.toString();
  return query ? `/collection?${query}` : "/collection";
}

function Chip({ href, active, children }: { href: string; active: boolean; children: string }) {
  return (
    <Link
      href={href}
      className={`inline-flex h-10 items-center rounded-full border px-4 text-xs uppercase tracking-[0.14em] transition-all duration-500 ${
        active
          ? "border-brand-accent bg-brand-accent text-black"
          : "border-white/15 text-brand-secondary/75 hover:border-brand-accent hover:text-brand-accent"
      }`}
    >
      {children}
    </Link>
  );
}

export function CollectionFilters({ activeCategory, activeSize, activePrice }: CollectionFiltersProps) {
  return (
    <div className="space-y-6">
      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-brand-secondary/55">Category</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Chip
              key={category.label}
              href={getHref(category.value, activeSize, activePrice)}
              active={category.value === activeCategory || (!category.value && !activeCategory)}
            >
              {category.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-brand-secondary/55">Size</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <Chip
              key={size.label}
              href={getHref(activeCategory, size.value, activePrice)}
              active={size.value === activeSize || (!size.value && !activeSize)}
            >
              {size.label}
            </Chip>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.18em] text-brand-secondary/55">Price</p>
        <div className="flex flex-wrap gap-2">
          {prices.map((price) => (
            <Chip
              key={price.label}
              href={getHref(activeCategory, activeSize, price.value)}
              active={price.value === activePrice || (!price.value && !activePrice)}
            >
              {price.label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
