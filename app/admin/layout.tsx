import Link from "next/link";
import { Package, ShoppingBag, Truck } from "lucide-react";
import { auth } from "@/auth";
import { signOutAdminAction } from "@/app/admin/login/actions";

const navigation = [
  {
    href: "/admin",
    label: "Genel Bakis",
    icon: ShoppingBag
  },
  {
    href: "/admin/products",
    label: "Urunler",
    icon: Package
  },
  {
    href: "/admin/orders",
    label: "Siparisler",
    icon: Truck
  }
];

export default async function AdminLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <section className="bg-slate-100">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[260px_1fr] lg:px-8">
        <aside className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-card">
          <div className="space-y-3 border-b border-white/10 pb-6">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-brand text-sm font-bold uppercase tracking-[0.18em] text-white">
                BS
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/60">Admin Panel</p>
                <h1 className="font-serif text-3xl">BS Furniture</h1>
              </div>
            </div>
            <p className="text-sm leading-6 text-white/70">
              BS Furniture koleksiyonlari, siparisleri ve vitrin iceriklerini yonetmek icin kontrol alani.
            </p>
          </div>

          <nav className="mt-6 grid gap-3">
            {navigation.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-2xl border border-white/10 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {session?.user?.email ? (
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Oturum</p>
              <p className="mt-2 text-sm text-white/80">{session.user.email}</p>
              <form action={signOutAdminAction} className="mt-4">
                <button
                  type="submit"
                  className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Cikis Yap
                </button>
              </form>
            </div>
          ) : null}
        </aside>

        <div className="space-y-6">{children}</div>
      </div>
    </section>
  );
}
