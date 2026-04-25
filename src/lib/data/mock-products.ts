import type { Product, ProductCategory, ProductSize } from "@/types/store";

const allSizes: ProductSize[] = ["XS", "S", "M", "L", "XL"];

export const mockProducts: Product[] = [
  {
    id: "prod-obsidian-core-tee",
    slug: "obsidian-core-tee",
    name: "Obsidian Core Tee",
    category: "tops",
    basePrice: 128,
    description: "A sculpted training tee in weightless technical knit with silent stretch and matte finish.",
    fitNotes: "Tailored athletic fit. Size up for a relaxed drape.",
    sizes: allSizes,
    images: {
      primary: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80",
      secondary: "https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?auto=format&fit=crop&w=1400&q=80",
    },
    model: {
      name: "Kai",
      height: "6'1\"",
      wearing: "M",
    },
  },
  {
    id: "prod-noir-stride-jogger",
    slug: "noir-stride-jogger",
    name: "Noir Stride Jogger",
    category: "bottoms",
    basePrice: 168,
    description: "Tapered premium jogger with bonded seams and breathable structure for refined movement.",
    fitNotes: "Mid-rise taper. True to size.",
    sizes: allSizes,
    images: {
      primary: "https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&w=1400&q=80",
      secondary: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?auto=format&fit=crop&w=1400&q=80",
    },
    model: {
      name: "Niko",
      height: "6'0\"",
      wearing: "M",
    },
  },
  {
    id: "prod-gilded-motion-set",
    slug: "gilded-motion-set",
    name: "Gilded Motion Set",
    category: "sets",
    basePrice: 320,
    description: "Two-piece performance set balancing compression support with elevated lounge comfort.",
    fitNotes: "Cropped jacket with slim pant profile.",
    sizes: allSizes,
    images: {
      primary: "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=1400&q=80",
      secondary: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=1400&q=80",
    },
    model: {
      name: "Ayla",
      height: "5'9\"",
      wearing: "S",
    },
  },
  {
    id: "prod-onyx-seamless-tank",
    slug: "onyx-seamless-tank",
    name: "Onyx Seamless Tank",
    category: "tops",
    basePrice: 118,
    description: "Second-skin seamless tank engineered for intensity with a polished silhouette.",
    fitNotes: "Body-skimming. Consider your usual training fit.",
    sizes: allSizes,
    images: {
      primary: "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?auto=format&fit=crop&w=1400&q=80",
      secondary: "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1400&q=80",
    },
    model: {
      name: "Mia",
      height: "5'8\"",
      wearing: "S",
    },
  },
  {
    id: "prod-eclipse-compression-short",
    slug: "eclipse-compression-short",
    name: "Eclipse Compression Short",
    category: "bottoms",
    basePrice: 132,
    description: "Supportive compression short with precision contour panels and cloud-soft interior touch.",
    fitNotes: "High-compression profile. Size up between sizes.",
    sizes: allSizes,
    images: {
      primary: "https://images.unsplash.com/photo-1526401485004-2fda9f5f0f48?auto=format&fit=crop&w=1400&q=80",
      secondary: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?auto=format&fit=crop&w=1400&q=80",
    },
    model: {
      name: "Levi",
      height: "5'11\"",
      wearing: "M",
    },
  },
  {
    id: "prod-midnight-recovery-set",
    slug: "midnight-recovery-set",
    name: "Midnight Recovery Set",
    category: "sets",
    basePrice: 289,
    description: "Refined off-duty set with premium brushed interior and contemporary architecture.",
    fitNotes: "Relaxed fit with structured shoulders.",
    sizes: allSizes,
    images: {
      primary: "https://images.unsplash.com/photo-1550344071-13d4e8d7d2b9?auto=format&fit=crop&w=1400&q=80",
      secondary: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1400&q=80",
    },
    model: {
      name: "Rae",
      height: "5'10\"",
      wearing: "M",
    },
  },
];

type CollectionFilter = {
  category?: ProductCategory;
  size?: ProductSize;
  minPrice?: number;
  maxPrice?: number;
};

export function getProductBySlug(slug: string) {
  return mockProducts.find((product) => product.slug === slug);
}

export function getCollectionProducts(filter: CollectionFilter = {}) {
  return mockProducts.filter((product) => {
    const byCategory = !filter.category || product.category === filter.category;
    const bySize = !filter.size || product.sizes.includes(filter.size);
    const byMinPrice = !filter.minPrice || product.basePrice >= filter.minPrice;
    const byMaxPrice = !filter.maxPrice || product.basePrice <= filter.maxPrice;

    return byCategory && bySize && byMinPrice && byMaxPrice;
  });
}
