import AnimateIn from "./AnimateIn";

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <AnimateIn className="flex flex-col items-center text-center max-w-[600px] mx-auto">
      <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-4">
        {eyebrow}
      </span>
      <h2 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-ink tracking-tight mb-4">
        {title}
      </h2>
      <p className="text-base text-body leading-relaxed">{description}</p>
    </AnimateIn>
  );
}
