"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MessageCircleMore } from "lucide-react";
import { buildWhatsappUrl } from "@/lib/whatsapp";
import { WhatsappIcon } from "@/components/ui/whatsapp-icon";

const floatingUrl = buildWhatsappUrl();

export function FloatingWhatsappButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.92 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1
      }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed bottom-6 right-6 z-[70]"
    >
      <motion.div
        animate={{ y: [0, -7, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link
          href={floatingUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="WhatsApp ile bize yazin"
          className="group flex items-center justify-end"
        >
          <span className="mr-3 hidden translate-x-3 rounded-full border border-emerald-200/30 bg-slate-950/88 px-4 py-2 text-sm font-semibold text-white opacity-0 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur-md transition duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:inline-flex">
            Bize Yazin
          </span>

          <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-[linear-gradient(145deg,#1d6b4c_0%,#25D366_48%,#123127_100%)] text-white shadow-[0_22px_60px_rgba(20,103,73,0.38)] transition duration-300 group-hover:scale-[1.03] group-hover:shadow-[0_26px_70px_rgba(20,103,73,0.45)]">
            <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.24),transparent_42%)]" />
            <span className="absolute -inset-1 rounded-full border border-emerald-300/20 opacity-0 blur-sm transition group-hover:opacity-100" />
            <WhatsappIcon className="relative h-7 w-7" />
            <MessageCircleMore className="absolute -right-1 -top-1 h-5 w-5 rounded-full bg-white p-1 text-[#1d6b4c] shadow-sm" />
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
