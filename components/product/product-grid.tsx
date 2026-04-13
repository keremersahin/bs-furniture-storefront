"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types";

type ProductGridProps = {
  products: Product[];
  animationKey?: string;
};

const premiumEase = [0.22, 1, 0.36, 1] as const;

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.08
    }
  }
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 24
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: premiumEase
    }
  }
};

export function ProductGrid({ products, animationKey }: ProductGridProps) {
  return (
    <motion.div
      key={animationKey}
      variants={gridVariants}
      initial="hidden"
      animate="visible"
      className="grid gap-6 lg:grid-cols-3"
    >
      {products.map((product) => (
        <motion.div key={product.id} variants={itemVariants}>
          <ProductCard product={product} />
        </motion.div>
      ))}
    </motion.div>
  );
}
