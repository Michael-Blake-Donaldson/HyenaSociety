export type ProductCategory = "tops" | "bottoms" | "sets";

export type ProductSize = "XS" | "S" | "M" | "L" | "XL";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  basePrice: number;
  description: string;
  fitNotes: string;
  sizes: ProductSize[];
  images: {
    primary: string;
    secondary: string;
  };
  model: {
    name: string;
    height: string;
    wearing: ProductSize;
  };
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  size: ProductSize;
  quantity: number;
  unitPrice: number;
  image: string;
};
