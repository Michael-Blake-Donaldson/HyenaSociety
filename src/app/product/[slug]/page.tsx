import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { getProductBySlug } from "@/lib/data/mock-products";
import { formatCurrency } from "@/lib/format";
import type { ProductSize } from "@/types/store";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.name} | Hyena Society | Luxury Performance Apparel`,
    description: product.description.substring(0, 160),
    openGraph: {
      title: product.name,
      description: product.description,
      type: "website",
      url: `/product/${slug}`,
      images: [
        {
          url: product.images.primary,
          alt: product.name,
        },
      ],
    },
    keywords: [product.name, product.category, "luxury apparel", "performance wear"],
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const defaultSize = product.sizes[0] as ProductSize;

  return (
    <section className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-[1.25fr_1fr] lg:gap-14 md:py-28">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={product.images.primary}
            alt={product.name}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
        <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-white/10">
          <Image
            src={product.images.secondary}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="lg:sticky lg:top-24 lg:h-fit">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-accent">{product.category}</p>
        <h1 className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-secondary sm:text-5xl">
          {product.name}
        </h1>
        <p className="mt-4 text-sm font-semibold text-brand-secondary/75">{formatCurrency(product.basePrice)}</p>

        <p className="mt-8 max-w-xl text-sm leading-7 text-brand-secondary/70 sm:text-base">{product.description}</p>

        <div className="mt-10 space-y-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-brand-secondary/55">Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <span
                key={size}
                className="inline-flex h-10 min-w-10 items-center justify-center border border-white/15 px-4 text-xs font-semibold uppercase tracking-[0.16em] text-brand-secondary/80"
              >
                {size}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <AddToCartButton product={product} size={defaultSize} />
        </div>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/3 p-5 text-sm leading-7 text-brand-secondary/70">
          <p className="font-medium text-brand-secondary">Fit Reference</p>
          <p className="mt-2">
            {product.model.name} is {product.model.height} and wears size {product.model.wearing}. {product.fitNotes}
          </p>
        </div>
      </div>
    </section>
  );
}
