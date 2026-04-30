import Link from "next/link";
import AnimateIn from "@/components/ui/AnimateIn";
import CtaBand from "@/components/ui/CtaBand";
import ProductCard from "@/components/ui/ProductCard";
import { prisma } from "@/lib/prisma";

export default async function BookManualPage() {
  const products = await prisma.product.findMany({
    where: { category: "BOOK_MANUAL" },
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
            <span className="text-ink">Book &amp; Manual</span>
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
            Book &amp; Manual
          </h1>
          <p className="text-lg text-body leading-relaxed max-w-lg mx-auto">
            Beautifully bound books, instruction manuals, and printed collateral
            that elevate your content with tactile paper stocks and expert
            finishing.
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
              categorySlug="book-manual"
              index={i}
            />
          ))}
        </div>
      </section>

      <CtaBand
        title="Need Custom Books or Manuals?"
        description="From brand guidelines to luxury catalogs, we'll produce print materials that reflect your quality standards."
        buttonText="Get a Quote"
        buttonHref="/contact"
      />
    </>
  );
}
