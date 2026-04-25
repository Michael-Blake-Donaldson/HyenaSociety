"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from "react";
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
const CART_STORAGE_KEY = "hyena.cart.items";

export function CartProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }

    try {
      const raw = window.localStorage.getItem(CART_STORAGE_KEY);
      if (!raw) {
        return [];
      }

      const parsed = JSON.parse(raw) as CartItem[];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  const addItem = useCallback(({ product, size, quantity = 1 }: AddPayload) => {
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
  }, []);

  const removeItem = useCallback((productId: string, size: ProductSize) => {
    setCart((prev) => prev.filter((entry) => !(entry.productId === productId && entry.size === size)));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const itemCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0), [cart]);

  const value = useMemo<CartContextValue>(
    () => ({
      cart,
      isOpen,
      itemCount,
      subtotal,
      openCart,
      closeCart,
      addItem,
      removeItem,
      clearCart,
    }),
    [addItem, cart, clearCart, closeCart, isOpen, itemCount, openCart, removeItem, subtotal],
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
