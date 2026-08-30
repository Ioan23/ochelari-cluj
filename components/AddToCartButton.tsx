"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { products } from "@/lib/data";

interface AddToCartButtonProps {
  productId: string;
  inStock: boolean;
  className?: string;
}

export default function AddToCartButton({
  productId,
  inStock,
  className = "",
}: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (!inStock) {
    return null;
  }

  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        const product = products.find((item) => item.id === productId);
        if (!product) return;
        addItem(product);
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1500);
      }}
      className={`relative z-10 rounded-lg bg-brand-700 px-3 py-1.5 text-xs font-medium text-white transition-colors hover:bg-brand-800 ${className}`}
    >
      {added ? "Adăugat ✓" : "Adaugă în coș"}
    </button>
  );
}
