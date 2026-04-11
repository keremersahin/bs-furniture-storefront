"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Settings2, ShoppingBag, X } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";

const navigation = [
  { href: "/", label: "Anasayfa" },
  { href: "/products", label: "Urunler" },
  { href: "/contact", label: "Iletisim" },
  { href: "/checkout", label: "Odeme" }
];

const headerVariants = {
  hidden: { opacity: 0, y: -18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] }
  }
};

const mobileOverlayVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] }
  }
};

const mobilePanelVariants = {
  hidden: { opacity: 0, y: -18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] }
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: { duration: 0.18, ease: [0.4, 0, 1, 1] }
  }
};

export function SiteHeader() {
  const pathname = usePathname();
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 border-b border-white/10 bg-[#0f1726]/65 text-white backdrop-blur-md"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-8">
          <Link href="/" className="group flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_14px_32px_rgba(0,0,0,0.18)] backdrop-blur">
              BS
            </span>
            <div>
              <p className="font-serif text-[1.75rem] leading-none tracking-[0.03em] text-white">
                BS Furniture
              </p>
              <p className="mt-1 text-[10px] uppercase tracking-[0.38em] text-[#d6b07a]">
                Premium Interiors
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative py-2 text-sm font-medium tracking-[0.08em] text-white/78 transition hover:text-white"
                >
                  <span>{item.label}</span>
                  <span
                    className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-[#d6b07a] transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/checkout"
              aria-label="Sepet"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:border-[#d6b07a]/60 hover:bg-white/12"
            >
              <ShoppingBag className="h-4.5 w-4.5" />
              <span className="absolute -right-1 -top-1 inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#d6b07a] px-1 text-[11px] font-semibold text-[#121E2A]">
                {cartCount}
              </span>
            </Link>

            <Link
              href="/admin/login"
              className="hidden items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-[#d6b07a]/60 hover:bg-white/12 sm:inline-flex"
            >
              <Settings2 className="h-4 w-4 text-[#d6b07a]" />
              <span>Admin Girisi</span>
            </Link>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/8 text-white transition hover:border-[#d6b07a]/60 hover:bg-white/12 lg:hidden"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileMenuOpen ? (
          <motion.div
            variants={mobileOverlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-40 bg-[#07101a]/55 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              variants={mobilePanelVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="mx-4 mt-24 overflow-hidden rounded-[2rem] border border-white/10 bg-[#0f1726]/92 p-5 text-white shadow-[0_30px_80px_rgba(2,6,12,0.45)]"
            >
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-serif text-2xl text-white">BS Furniture</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.36em] text-[#d6b07a]">
                    Premium Interiors
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Menüyü kapat"
                  onClick={() => setMobileMenuOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/8 text-white transition hover:bg-white/12"
                >
                  <X className="h-4.5 w-4.5" />
                </button>
              </div>

              <nav className="grid gap-2">
                {navigation.map((item) => {
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`rounded-[1.25rem] border px-4 py-3.5 text-sm font-semibold transition ${
                        isActive
                          ? "border-[#d6b07a]/30 bg-white/12 text-white"
                          : "border-white/8 bg-white/[0.04] text-white/78 hover:border-[#d6b07a]/25 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/checkout"
                  className="inline-flex items-center justify-center gap-2 rounded-[1.25rem] bg-[#d6b07a] px-4 py-3.5 text-sm font-semibold text-[#121E2A] transition hover:bg-[#e0bd8e]"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Sepete Git
                </Link>
                <Link
                  href="/admin/login"
                  className="inline-flex items-center justify-center gap-2 rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-3.5 text-sm font-semibold text-white transition hover:border-[#d6b07a]/25 hover:bg-white/12"
                >
                  <Settings2 className="h-4 w-4 text-[#d6b07a]" />
                  Admin Girisi
                </Link>
              </div>

              <div className="mt-5 rounded-[1.5rem] border border-white/8 bg-white/[0.04] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-[#d6b07a]">
                  Curated Comfort
                </p>
                <p className="mt-2 text-sm leading-7 text-white/72">
                  Premium interiors koleksiyonumuza mobilde de akiskan ve net bir deneyimle
                  ulasin.
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
