"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

type ProductWhatsappButtonProps = {
  href: string;
};

export function ProductWhatsappButton({ href }: ProductWhatsappButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      className="w-full sm:w-auto"
    >
      <Link
        href={href}
        target="_blank"
        rel="noreferrer"
        className="group inline-flex w-full items-center justify-center gap-3 rounded-full border border-emerald-900/15 bg-[linear-gradient(135deg,#1C5B43_0%,#25D366_52%,#133529_100%)] px-6 py-4 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(29,107,76,0.22)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_rgba(29,107,76,0.28)] sm:w-auto"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/16">
          <WhatsappIcon className="h-5 w-5" />
        </span>
        Urun Hakkinda Soru Sor
        <ArrowUpRight className="h-4 w-4 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </motion.div>
  );
}
