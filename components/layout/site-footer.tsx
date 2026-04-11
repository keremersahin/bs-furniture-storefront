"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CreditCard, LockKeyhole, Mail, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/lib/config";

const categoryLinks = [
  { href: "/products?category=koltuk-takimi", label: "Koltuk Takimi" },
  { href: "/products?category=sandalye", label: "Sandalye" },
  { href: "/products?category=sehpa", label: "Sehpa" }
];

const corporateLinks = [
  { href: "/legal/distance-sales", label: "Mesafeli Satis Sozlesmesi" },
  { href: "/legal/returns", label: "Iade Kosullari" },
  { href: "/legal/privacy-security", label: "Gizlilik Politikasi" },
  { href: "/legal/delivery", label: "Teslimat Sartlari" }
];

const footerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.08 }
  }
};

const columnVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
  }
};

export function SiteFooter() {
  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="bg-slate-950 text-slate-200"
    >
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 border-b border-white/10 pb-12 md:grid-cols-2 xl:grid-cols-4">
          <motion.div variants={columnVariants} className="space-y-5">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/8 text-sm font-bold uppercase tracking-[0.18em] text-white">
                BS
              </span>
              <div>
                <p className="font-serif text-3xl leading-none text-white">BS Furniture</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.34em] text-[#d6b07a]">
                  Premium Interiors
                </p>
              </div>
            </div>

            <p className="max-w-sm text-sm leading-7 text-slate-400">
              Yumusak dokular, premium formlar ve guvenli odeme altyapisiyla tasarlanmis
              yasam alanlari icin ozenli bir koleksiyon deneyimi.
            </p>

            <div className="grid gap-2 text-sm text-slate-500">
              <p>Telefon: {siteConfig.phoneDisplay}</p>
              <p>E-posta: {siteConfig.email}</p>
              <p>Adres: {siteConfig.address}</p>
            </div>
          </motion.div>

          <motion.div variants={columnVariants} className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/85">
              Hizli Linkler
            </h3>
            <div className="grid gap-3 text-sm">
              {categoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/products" className="text-slate-400 transition hover:text-white">
                Tum Urunler
              </Link>
              <Link href="/contact" className="text-slate-400 transition hover:text-white">
                Iletisim
              </Link>
            </div>
          </motion.div>

          <motion.div variants={columnVariants} className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/85">
              Kurumsal
            </h3>
            <div className="grid gap-3 text-sm">
              {corporateLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-400 transition hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div variants={columnVariants} className="space-y-5">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white/85">
              Bulten
            </h3>
            <p className="text-sm leading-7 text-slate-400">
              Yeni koleksiyon duyurulari ve premium interiors notlari icin e-posta listemize
              katilin.
            </p>

            <form className="space-y-3" onSubmit={(event) => event.preventDefault()}>
              <label className="sr-only" htmlFor="newsletter-email">
                E-posta adresi
              </label>
              <div className="flex rounded-[1.4rem] border border-white/12 bg-white/6 p-1">
                <div className="inline-flex items-center px-3 text-slate-500">
                  <Mail className="h-4 w-4" />
                </div>
                <input
                  id="newsletter-email"
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white placeholder:text-slate-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-[1rem] bg-[#d6b07a] px-4 py-3 text-sm font-semibold text-[#121E2A] transition hover:bg-[#e1bf90]"
                >
                  Kayit Ol
                </button>
              </div>
            </form>

            <p className="text-xs leading-6 text-slate-500">
              Spam yok. Sadece koleksiyon, kampanya ve odeme-guvenligi odakli guncellemeler.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={columnVariants}
          className="flex flex-col gap-4 pt-6 md:flex-row md:items-center md:justify-between"
        >
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              <ShieldCheck className="h-3.5 w-3.5" />
              PayTR
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              <CreditCard className="h-3.5 w-3.5" />
              Visa
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              <CreditCard className="h-3.5 w-3.5" />
              Mastercard
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-2">
              <LockKeyhole className="h-3.5 w-3.5" />
              Secure Checkout
            </span>
          </div>

          <p className="text-xs leading-6 text-slate-500">
            © 2026 BS Furniture. Tum haklari saklidir.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
