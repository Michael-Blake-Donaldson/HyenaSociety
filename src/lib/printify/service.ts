import { prisma } from "@/lib/db/prisma";
import { fetchPrintifyProducts } from "@/lib/printify/client";
import type { PrintifyProduct } from "@/lib/printify/types";
import type { ProductCategory } from "@prisma/client";

const DEFAULT_MARKUP_MULTIPLIER = 1.65;

function mapCategory(title: string): ProductCategory {
  const normalized = title.toLowerCase();

  if (normalized.includes("set")) return "sets";
  if (normalized.includes("jogger") || normalized.includes("pant") || normalized.includes("short")) {
    return "bottoms";
  }

  return "tops";
}

function toSlug(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function resolveImages(product: PrintifyProduct) {
  const first = product.images[0]?.src ?? "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80";
  const second = product.images[1]?.src ?? first;

  return [first, second];
}

export async function syncPrintifyProducts() {
  const remoteProducts = await fetchPrintifyProducts();

  const result = {
    syncedProducts: 0,
    syncedVariants: 0,
  };

  for (const remote of remoteProducts) {
    const images = resolveImages(remote);
    const category = mapCategory(remote.title);
    const firstVariantPrice = remote.variants[0]?.price ?? 4500;
    const basePrice = Math.round((firstVariantPrice / 100) * DEFAULT_MARKUP_MULTIPLIER);

    const product = await prisma.product.upsert({
      where: { slug: toSlug(remote.title) },
      update: {
        name: remote.title,
        description: remote.description || `${remote.title} by Hyena Society`,
        category,
        basePrice,
        images,
        printifyProductId: remote.id,
        isActive: remote.visible,
      },
      create: {
        slug: toSlug(remote.title),
        name: remote.title,
        description: remote.description || `${remote.title} by Hyena Society`,
        category,
        basePrice,
        images,
        sizes: ["XS", "S", "M", "L", "XL"],
        printifyProductId: remote.id,
        isActive: remote.visible,
      },
    });

    result.syncedProducts += 1;

    for (const variant of remote.variants) {
      const normalizedPrice = Math.round((variant.price / 100) * DEFAULT_MARKUP_MULTIPLIER * 100);
      const size = variant.options.size ?? "M";

      await prisma.productVariant.upsert({
        where: {
          sku: variant.sku ?? `${product.id}-${variant.id}`,
        },
        update: {
          price: normalizedPrice,
          size,
          printifyVariantId: String(variant.id),
          isEnabled: variant.is_enabled,
        },
        create: {
          productId: product.id,
          sku: variant.sku ?? `${product.id}-${variant.id}`,
          size,
          price: normalizedPrice,
          printifyVariantId: String(variant.id),
          isEnabled: variant.is_enabled,
        },
      });

      result.syncedVariants += 1;
    }
  }

  return result;
}
