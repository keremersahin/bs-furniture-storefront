"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types";

type ProductGalleryProps = {
  images: ProductImage[];
};

export function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? null;

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  function selectImage(index: number) {
    setActiveIndex(index);
  }

  function showPreviousImage() {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  }

  function showNextImage() {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  }

  if (!activeImage) {
    return (
      <div className="flex h-[460px] items-end rounded-[2rem] bg-gradient-to-br from-brand/10 via-slate-50 to-slate-100 p-8">
        <span className="font-serif text-4xl text-slate-900/80">Gorsel yakinda eklenecek</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative h-[460px] overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-100 shadow-[0_25px_60px_rgba(15,23,42,0.08)]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeImage.id}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={activeImage.url}
              alt={activeImage.alt}
              fill
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 ? (
          <>
            <button
              type="button"
              onClick={showPreviousImage}
              className="absolute left-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-slate-950/38 text-white backdrop-blur transition hover:bg-slate-950/58"
              aria-label="Onceki gorsel"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={showNextImage}
              className="absolute right-4 top-1/2 z-10 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-slate-950/38 text-white backdrop-blur transition hover:bg-slate-950/58"
              aria-label="Sonraki gorsel"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-slate-950/42 via-slate-950/10 to-transparent px-5 py-4">
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.28em] text-white/80">
                <span>Premium Gallery</span>
                <span>
                  {activeIndex + 1} / {images.length}
                </span>
              </div>
            </div>
          </>
        ) : null}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((image, index) => (
          <button
            key={image.id}
            type="button"
            onClick={() => selectImage(index)}
            className={cn(
              "relative h-24 overflow-hidden rounded-[1.4rem] border bg-white transition sm:h-28",
              activeImage.id === image.id
                ? "border-brand shadow-[0_18px_36px_rgba(29,78,216,0.12)]"
                : "border-slate-200 hover:border-brand/40"
            )}
          >
            <Image src={image.url} alt={image.alt} fill className="object-cover transition duration-500 hover:scale-105" />
          </button>
        ))}
      </div>
    </div>
  );
}
