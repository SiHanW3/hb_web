import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBand from "@/components/ui/CtaBand";
import ProductCard from "@/components/ui/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function RigidBoxPage() {
  const products = await prisma.product.findMany({
    where: { category: "RIGID_BOX" },
    orderBy: { order: "asc" },
  });

  const items = products.map((p) => ({
    id: p.id,
    title: p.title,
    description: p.description,
    images: JSON.parse(p.images as string) as string[],
  }));

  return (
    <>
      {/* Breadcrumb */}
      <section className="pt-10 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <nav className="flex items-center gap-2 text-sm text-muted">
            <Link href="/our-work" className="hover:text-ink transition-colors">
              Our Work
            </Link>
            <span>/</span>
            <span className="text-ink">Rigid Box</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-20 px-6 lg:px-10">
        <AnimateIn className="max-w-[800px] mx-auto text-center">
          <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase">
            Category
          </span>
          <h1 className="font-[family-name:var(--font-display)] text-5xl md:text-[56px] text-ink tracking-[-1.5px] leading-[1.08] mt-6 mb-6">
            Rigid Box
          </h1>
          <p className="text-lg text-body leading-relaxed max-w-lg mx-auto">
            Premium rigid boxes engineered for luxury brands—magnetic closures,
            custom inserts, and flawless finishes that turn every unboxing into
            an experience.
          </p>
        </AnimateIn>
      </section>

      {/* Product Grid */}
      <section className="pb-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item, i) => (
            <ProductCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              image={item.images[0]}
              categorySlug="rigid-box"
              index={i}
            />
          ))}
        </div>
      </section>

      <CtaBand
        title="Need a Custom Rigid Box?"
        description="Share your specifications and we'll craft the perfect packaging solution for your brand."
        buttonText="Get a Quote"
        buttonHref="/contact"
      />
    </>
  );
}
