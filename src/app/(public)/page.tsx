import Link from "next/link";
import { Palette, Gem, Target } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import SectionHeader from "@/components/ui/SectionHeader";
import CtaBand from "@/components/ui/CtaBand";
import HeroAnimation from "@/components/ui/HeroAnimation";
import CountUp from "@/components/ui/CountUp";
import TextReveal from "@/components/ui/TextReveal";
import ScrollRevealSection from "@/components/ui/ScrollRevealSection";

import { prisma } from "@/lib/prisma";

const features = [
  {
    icon: Palette,
    title: "Design-Led Approach",
    description:
      "Every package starts with thoughtful design, ensuring your brand story shines through every detail.",
    direction: "left" as const,
  },
  {
    icon: Gem,
    title: "Premium Quality",
    description:
      "We source the finest materials and apply rigorous quality control to ensure every piece meets luxury standards.",
    direction: "up" as const,
  },
  {
    icon: Target,
    title: "Brand-Focused",
    description:
      "We immerse ourselves in your brand identity to create packaging that amplifies your market positioning.",
    direction: "right" as const,
  },
];

const categories = [
  {
    slug: "rigid-box",
    title: "Rigid Box",
    description: "Premium rigid boxes crafted with precision for luxury brands and special editions.",
  },
  {
    slug: "book-manual",
    title: "Book & Manual",
    description: "Beautifully bound books, manuals, and printed materials that elevate your content.",
  },
  {
    slug: "label",
    title: "Label",
    description: "Custom labels designed to stand out on shelf and communicate your brand essence.",
  },
];

const stats = [
  { target: 10, suffix: "+", label: "Years Experience" },
  { target: 500, suffix: "+", label: "Projects Delivered" },
  { target: 200, suffix: "+", label: "Brand Partners" },
  { target: 15, suffix: "+", label: "Countries Served" },
];


export default async function HomePage() {
  const featuredProducts = await prisma.product.findMany({
    where: { featured: true },
    orderBy: { order: "asc" },
    take: 6,
  });

  return (
    <>
      {/* Hero */}
      <section className="py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1">
            <AnimateIn direction="left" amount={16} blur>
              <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase">
                Packaging Solutions with Design DNA
              </span>
            </AnimateIn>
            <TextReveal
              text="Packaging That Tells Your Brand Story"
              as="h1"
              className="font-[family-name:var(--font-display)] text-5xl md:text-[56px] text-ink tracking-[-1.5px] leading-[1.08] mt-6 mb-6"
              delay={0.15}
              staggerDelay={0.05}
            />
            <AnimateIn delay={0.5} blur>
              <p className="text-lg text-body leading-relaxed mb-8 max-w-lg">
                We design and produce premium packaging for ambitious brands. From rigid boxes to
                labels, every detail is crafted to make your product unforgettable.
              </p>
            </AnimateIn>
            <AnimateIn delay={0.7} direction="up" amount={16}>
              <div className="flex gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-11 px-6 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors"
                >
                  Start a Project
                </Link>
                <Link
                  href="/our-work"
                  className="inline-flex items-center justify-center h-11 px-6 bg-canvas text-ink text-sm font-medium rounded-lg border border-hairline hover:bg-surface-soft transition-colors"
                >
                  View Our Work
                </Link>
              </div>
            </AnimateIn>
          </div>
          <AnimateIn delay={0.2} className="flex-1" blur>
            <HeroAnimation />
          </AnimateIn>
        </div>
      </section>

      {/* Value Props */}
      <ScrollRevealSection className="py-24 px-6 lg:px-10 bg-surface-soft">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Why HuiBao"
            title="Design Meets Craftsmanship"
            description="We combine creative design thinking with manufacturing precision to deliver packaging that truly represents your brand."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {features.map((feature, i) => (
              <AnimateIn
                key={feature.title}
                delay={i * 0.12}
                direction={feature.direction}
                amount={40}
                blur
              >
                <div className="bg-surface-card rounded-xl p-8 h-full">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mb-5">
                    <feature.icon className="w-6 h-6 text-on-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-ink mb-3">{feature.title}</h3>
                  <p className="text-base text-body leading-relaxed">{feature.description}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* Our Work Preview */}
      <ScrollRevealSection className="py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <SectionHeader
            eyebrow="Our Work"
            title="What We Create"
            description="From concept to delivery, we bring your packaging vision to life across multiple product categories."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {categories.map((cat, i) => (
              <AnimateIn key={cat.slug} delay={i * 0.12} rotate={i % 2 === 0 ? -2 : 2} blur>
                <Link href={`/our-work/${cat.slug}`} className="group block">
                  <div className="bg-canvas border border-hairline rounded-xl overflow-hidden">
                    <div className="aspect-[4/3] bg-surface-card group-hover:bg-surface-cream-strong transition-colors" />
                    <div className="p-6">
                      <h3 className="font-[family-name:var(--font-display)] text-2xl text-ink tracking-tight mb-2">
                        {cat.title}
                      </h3>
                      <p className="text-sm text-body leading-relaxed mb-3">{cat.description}</p>
                      <span className="text-sm font-medium text-primary">View Projects &rarr;</span>
                    </div>
                  </div>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </ScrollRevealSection>

      {/* Stats */}
      <section className="py-16 px-6 lg:px-10 bg-surface-dark">
        <div className="max-w-[1200px] mx-auto flex flex-wrap justify-around gap-8">
          {stats.map((stat, i) => (
            <AnimateIn key={stat.label} delay={i * 0.1} className="text-center" blur>
              <CountUp
                target={stat.target}
                suffix={stat.suffix}
                className="font-[family-name:var(--font-display)] text-5xl text-on-dark tracking-tight block"
              />
              <div className="text-sm text-on-dark-soft mt-2">{stat.label}</div>
            </AnimateIn>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
