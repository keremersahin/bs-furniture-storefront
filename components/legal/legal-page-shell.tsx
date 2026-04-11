import { siteConfig } from "@/lib/config";

type LegalSection = {
  title: string;
  paragraphs?: string[];
  items?: string[];
};

type LegalPageShellProps = {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
};

const companyLines = [
  `Satici Unvani: ${siteConfig.companyName}`,
  `Adres: ${siteConfig.address}`,
  `E-posta: ${siteConfig.email}`
];

export function LegalPageShell({
  eyebrow,
  title,
  intro,
  sections
}: LegalPageShellProps) {
  return (
    <section className="bg-[linear-gradient(180deg,#f7f4ee_0%,#ffffff_34%)] py-16 lg:py-20">
      <div className="mx-auto max-w-5xl space-y-8 px-6 lg:px-8">
        <div className="rounded-[2rem] border border-[#d6b07a]/20 bg-white/95 p-8 shadow-[0_28px_80px_rgba(15,23,42,0.08)] backdrop-blur">
          <span className="inline-flex rounded-full border border-[#d6b07a]/25 bg-[#d6b07a]/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#8d6a3a]">
            {eyebrow}
          </span>

          <div className="mt-5 space-y-4">
            <h1 className="max-w-3xl font-serif text-4xl text-slate-950 md:text-5xl">
              {title}
            </h1>
            <p className="max-w-3xl text-base leading-8 text-slate-600 md:text-lg">
              {intro}
            </p>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
          <aside className="h-fit rounded-[2rem] border border-slate-200 bg-slate-950 p-6 text-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.16)]">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#d6b07a]">
              Sirket Bilgileri
            </p>
            <div className="mt-5 space-y-3 text-sm leading-7 text-slate-300">
              {companyLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-300">
              Bu metinler, BS Furniture e-ticaret operasyonunun siparis ve odeme
              sureclerinde kullanilmak uzere hazirlanmistir.
            </div>
          </aside>

          <div className="space-y-5">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_18px_50px_rgba(15,23,42,0.05)]"
              >
                <h2 className="font-serif text-2xl text-slate-950">{section.title}</h2>

                {section.paragraphs?.length ? (
                  <div className="mt-4 space-y-4 text-sm leading-8 text-slate-600 md:text-[15px]">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                ) : null}

                {section.items?.length ? (
                  <ul className="mt-4 space-y-3 text-sm leading-8 text-slate-600 md:text-[15px]">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-[#d6b07a]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
