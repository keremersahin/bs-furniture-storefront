type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl space-y-3">
      <span className="inline-flex rounded-full border border-brand/10 bg-brand/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-brand">
        {eyebrow}
      </span>
      <h2 className="font-serif text-3xl text-slate-900 md:text-4xl">{title}</h2>
      <p className="text-base leading-7 text-slate-600">{description}</p>
    </div>
  );
}
