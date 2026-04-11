import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/login-form";

type AdminLoginPageProps = {
  searchParams?: Promise<{
    error?: string;
  }>;
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const session = await auth();
  const params = await searchParams;

  if (session?.user?.email) {
    redirect("/admin/products");
  }

  return (
    <section className="bg-slate-950 py-20">
      <div className="mx-auto max-w-md rounded-[2rem] bg-white p-8 shadow-card">
        <div className="mb-8 flex items-center gap-4">
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-base font-bold uppercase tracking-[0.18em] text-white">
            BS
          </span>
          <div>
            <p className="font-serif text-3xl text-slate-950">BS Furniture</p>
            <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Admin Access</p>
          </div>
        </div>
        <h1 className="font-serif text-4xl text-slate-950">Admin Girisi</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Sadece yetkili BS Furniture yoneticileri bu alana erisebilir.
        </p>
        <LoginForm initialError={params?.error} />
      </div>
    </section>
  );
}
