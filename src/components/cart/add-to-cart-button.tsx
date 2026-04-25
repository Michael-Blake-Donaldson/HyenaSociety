"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import type { Product, ProductSize } from "@/types/store";

type AddToCartButtonProps = {
  product: Product;
  size: ProductSize;
};

export function AddToCartButton({ product, size }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();

  const handleAdd = () => {
    setIsAdding(true);
    addItem({ product, size });
    setTimeout(() => setIsAdding(false), 450);
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isAdding}
      className="inline-flex h-12 items-center justify-center rounded-full border border-brand-accent bg-brand-accent px-7 text-xs font-medium uppercase tracking-[0.18em] text-black transition-all duration-500 hover:-translate-y-0.5 hover:bg-brand-accent/90 disabled:cursor-not-allowed disabled:opacity-85"
    >
      {isAdding ? "Added" : "Add to Cart"}
    </button>
  );
}
