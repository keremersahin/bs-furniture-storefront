import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { FloatingWhatsappButton } from "@/components/layout/floating-whatsapp-button";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["500", "600", "700", "800"]
});

const metadataBase = process.env.APP_URL
  ? new URL(process.env.APP_URL)
  : new URL("http://localhost:3000");

export const metadata: Metadata = {
  metadataBase,
  title: "BS Furniture | Modern Mobilya ve Yasam Alanlari",
  description:
    "BS Furniture, modern koltuk takimi, sandalye ve sehpa koleksiyonlarini guvenli odeme ve profesyonel hizmet anlayisiyla sunar."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body
        className={`${jakarta.variable} ${playfair.variable} min-h-screen bg-white font-sans text-slate-900 antialiased`}
      >
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingWhatsappButton />
      </body>
    </html>
  );
}
