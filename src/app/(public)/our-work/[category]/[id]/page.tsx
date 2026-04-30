import Link from "next/link";
import { notFound } from "next/navigation";
import AnimateIn from "@/components/ui/AnimateIn";
import ProductGallery from "@/components/ui/ProductGallery";
import { prisma } from "@/lib/prisma";

const categoryMap: Record<string, { dbKey: string; label: string }> = {
  "rigid-box": { dbKey: "RIGID_BOX", label: "Rigid Box" },
  "book-manual": { dbKey: "BOOK_MANUAL", label: "Book & Manual" },
  label: { dbKey: "LABEL", label: "Label" },
};

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ category: string; id: string }>;
}) {
  const { category, id } = await params;
  const catInfo = categoryMap[category];
  if (!catInfo) notFound();

  const product = await prisma.product.findUnique({ where: { id } });
  if (!product || product.category !== catInfo.dbKey) notFound();

  const images = JSON.parse((product.images as string) || "[]") as string[];
  const features = JSON.parse((product.features as string) || "[]") as string[];
  const materials = JSON.parse((product.materials as string) || "[]") as string[];

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
            <Link
              href={`/our-work/${category}`}
              className="hover:text-ink transition-colors"
            >
              {catInfo.label}
            </Link>
            <span>/</span>
            <span className="text-ink">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Detail */}
      <section className="py-16 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left – Gallery */}
          <AnimateIn className="lg:w-1/2 flex-shrink-0">
            <ProductGallery images={images} title={product.title} />
          </AnimateIn>

          {/* Right – Info */}
          <AnimateIn delay={0.15} className="lg:w-1/2">
            <div className="flex flex-col gap-8">
              <div>
                <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase">
                  {catInfo.label}
                </span>
                <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-[44px] text-ink tracking-[-1px] leading-[1.1] mt-3">
                  {product.title}
                </h1>
              </div>

              <p className="text-base text-body leading-relaxed">
                {product.description}
              </p>

              {features.length > 0 && (
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-ink mb-3">
                    Features
                  </h3>
                  <ul className="space-y-2">
                    {features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-body"
                      >
                        <svg
                          className="w-4 h-4 text-primary mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {materials.length > 0 && (
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-lg text-ink mb-3">
                    Materials
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {materials.map((m) => (
                      <span
                        key={m}
                        className="px-3 py-1.5 text-xs font-medium text-body bg-surface-card rounded-full border border-hairline"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center h-12 px-8 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors"
                >
                  Inquire Now &rarr;
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
