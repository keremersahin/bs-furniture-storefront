"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { AddToCartButton } from "@/components/product/add-to-cart-button";
import { formatCurrency } from "@/lib/utils";
import type { Product } from "@/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const primaryImage = product.images[0];
  const cardVariants = {
    rest: {
      y: 0,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
    },
    hover: {
      y: -6,
      transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
    }
  } as const;
  const imageVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.06,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
    }
  } as const;
  const overlayVariants = {
    rest: { opacity: 0, y: 18, pointerEvents: "none" as const },
    hover: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto" as const,
      transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] }
    }
  } as const;

  return (
    <motion.article
      layout
      variants={cardVariants}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className="group overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-card"
    >
      <div className="relative h-72 overflow-hidden bg-slate-100">
        {primaryImage ? (
          <motion.div variants={imageVariants} className="absolute inset-0">
            <Image
              src={primaryImage.url}
              alt={primaryImage.alt}
              fill
              className="object-cover"
            />
          </motion.div>
        ) : (
          <div className="flex h-full items-end bg-gradient-to-br from-brand/10 via-slate-50 to-slate-100 p-6">
            <span className="font-serif text-3xl text-slate-900/80">{product.title}</span>
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/68 via-slate-900/18 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        <motion.div
          variants={overlayVariants}
          className="absolute inset-x-0 bottom-0 flex justify-center p-5"
        >
          <div className="w-full max-w-[240px]">
            <AddToCartButton
              product={{
                id: product.id,
                slug: product.slug,
                title: product.title,
                price: product.price,
                imageUrl: primaryImage?.url ?? null
              }}
              className="w-full justify-center bg-[#121E2A] text-white shadow-[0_18px_40px_rgba(18,30,42,0.4)] hover:bg-[#1C2C3C]"
            />
          </div>
        </motion.div>
      </div>

      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand">
            {product.categoryName}
          </span>
          <p className="text-sm text-slate-500">{product.stock} adet stokta</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-serif text-2xl text-slate-950">{product.title}</h3>
          <p className="text-sm leading-7 text-slate-600">{product.shortDescription}</p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="text-xl font-semibold text-brand">{formatCurrency(product.price)}</p>
          <Link
            href={`/products/${product.slug}`}
            className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-brand hover:text-brand"
          >
            Detaya Git
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
