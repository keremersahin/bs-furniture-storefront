type LoadingScreenProps = {
  title?: string;
  description?: string;
  tone?: "store" | "admin";
};

export function LoadingScreen({
  title = "Sayfa hazirlaniyor",
  description = "Veriler yuklenirken deneyimi hazirliyoruz.",
  tone = "store"
}: LoadingScreenProps) {
  const isAdmin = tone === "admin";

  return (
    <section className={isAdmin ? "bg-slate-100" : "bg-white"}>
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div
          className={`rounded-[2rem] border p-8 shadow-card ${
            isAdmin
              ? "border-slate-200 bg-white"
              : "border-slate-200 bg-slate-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <span className="h-3 w-3 animate-pulse rounded-full bg-brand" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-brand/70 [animation-delay:120ms]" />
            <span className="h-3 w-3 animate-pulse rounded-full bg-brand/40 [animation-delay:240ms]" />
          </div>

          <h1 className="mt-6 font-serif text-4xl text-slate-950">{title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{description}</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="h-40 animate-pulse rounded-[1.75rem] bg-slate-200/70" />
            <div className="h-40 animate-pulse rounded-[1.75rem] bg-slate-200/70 [animation-delay:120ms]" />
            <div className="h-40 animate-pulse rounded-[1.75rem] bg-slate-200/70 [animation-delay:240ms]" />
          </div>
        </div>
      </div>
    </section>
  );
}
