"use client";

import clsx from "clsx";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

type AddToCartButtonProps = {
  product: {
    id: string;
    slug: string;
    title: string;
    price: number;
    imageUrl?: string | null;
  };
  className?: string;
};

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        addItem({
          productId: product.id,
          slug: product.slug,
          title: product.title,
          price: product.price,
          imageUrl: product.imageUrl ?? null
        });

        setAdded(true);
        window.setTimeout(() => setAdded(false), 1800);
      }}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-4 text-sm font-semibold transition",
        className ?? "bg-brand text-white hover:bg-brand-dark"
      )}
    >
      <ShoppingCart className="h-4 w-4" />
      {added ? "Sepete Eklendi" : "Sepete Ekle"}
    </button>
  );
}
