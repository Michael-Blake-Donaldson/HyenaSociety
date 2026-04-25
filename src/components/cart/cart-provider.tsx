"use client";

import { createContext, useContext, useMemo, useState, type PropsWithChildren } from "react";
import type { CartItem, Product, ProductSize } from "@/types/store";

type AddPayload = {
  product: Product;
  size: ProductSize;
  quantity?: number;
};

type CartContextValue = {
  cart: CartItem[];
  isOpen: boolean;
  itemCount: number;
  subtotal: number;
  openCart: () => void;
  closeCart: () => void;
  addItem: (payload: AddPayload) => void;
  removeItem: (productId: string, size: ProductSize) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = ({ product, size, quantity = 1 }: AddPayload) => {
    setCart((prev) => {
      const existing = prev.find((entry) => entry.productId === product.id && entry.size === size);

      if (existing) {
        return prev.map((entry) =>
          entry.productId === product.id && entry.size === size
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          size,
          quantity,
          unitPrice: product.basePrice,
          image: product.images.primary,
        },
      ];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, size: ProductSize) => {
    setCart((prev) => prev.filter((entry) => !(entry.productId === productId && entry.size === size)));
  };

  const clearCart = () => setCart([]);

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [cart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      itemCount,
      subtotal,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem,
      removeItem,
      clearCart,
    }),
    [cart, isOpen, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}
