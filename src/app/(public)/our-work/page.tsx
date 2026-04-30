import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBand from "@/components/ui/CtaBand";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    slug: "rigid-box",
    title: "Rigid Box",
    eyebrow: "CATEGORY",
    description:
      "Premium rigid boxes engineered for luxury brands—magnetic closures, custom inserts, and flawless finishes that make every unboxing a moment worth remembering.",
    href: "/our-work/rigid-box",
    image: "/images/generated-1777523602773.png",
  },
  {
    slug: "book-manual",
    title: "Book & Manual",
    eyebrow: "CATEGORY",
    description:
      "Beautifully bound books, instruction manuals, and printed collateral that elevate your content with tactile paper stocks and expert finishing.",
    href: "/our-work/book-manual",
    image: "/images/generated-1777523614496.png",
  },
  {
    slug: "label",
    title: "Label",
    eyebrow: "CATEGORY",
    description:
      "Custom labels designed for shelf impact—foil stamping, embossing, and specialty substrates that communicate your brand essence at first glance.",
    href: "/our-work/label",
    image: "/images/generated-1777523622383.png",
  },
];

export default async function OurWorkPage() {
  return (
    <>
      {/* Hero */}
      <section className="py-28 px-6 lg:px-10">
        <AnimateIn className="max-w-[800px] mx-auto text-center">
          <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase">
            Our Work
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-[56px] text-ink tracking-[-1.5px] leading-[1.08] mt-6 mb-6">
            Packaging That Performs
          </h1>
          <p className="text-lg text-body leading-relaxed max-w-lg mx-auto">
            Explore our range of premium packaging solutions, each crafted with
            meticulous attention to detail and a deep understanding of brand
            storytelling.
          </p>
        </AnimateIn>
      </section>

      {/* Category Cards – Zigzag */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.slug} cat={cat} index={i} />
          ))}
        </div>
      </section>

      <CtaBand
        title="Have a Project in Mind?"
        description="Tell us about your packaging vision and let's bring it to life together."
        buttonText="Start a Conversation"
        buttonHref="/contact"
      />
    </>
  );
}
