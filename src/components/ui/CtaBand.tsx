import Link from "next/link";
import AnimateIn from "./AnimateIn";

export default function CtaBand({
  title = "Let's Create Together",
  description = "Ready to elevate your brand with premium packaging? Let's start a conversation.",
  buttonText = "Get In Touch",
  buttonHref = "/contact",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="py-24 px-6 lg:px-10">
      <AnimateIn scale={0.95} className="max-w-[1200px] mx-auto bg-primary rounded-2xl px-10 py-16 flex flex-col items-center text-center">
        <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-[40px] text-on-primary tracking-tight mb-4">
          {title}
        </h2>
        <p className="text-on-primary/90 text-base mb-8 max-w-lg">{description}</p>
        <Link
          href={buttonHref}
          className="inline-flex items-center justify-center h-12 px-8 bg-canvas text-ink text-sm font-medium rounded-lg hover:bg-surface-soft transition-colors"
        >
          {buttonText}
        </Link>
      </AnimateIn>
    </section>
  );
}
