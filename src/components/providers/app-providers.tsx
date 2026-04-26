"use client";

import type { PropsWithChildren } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { ToastProvider } from "@/context/toast-context";

export function AppProviders({ children }: PropsWithChildren) {
  return (
    <ToastProvider>
      <CartProvider>
        {children}
        <CartDrawer />
      </CartProvider>
    </ToastProvider>
  );
}
