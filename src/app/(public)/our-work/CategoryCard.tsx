"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CategoryCardProps {
  cat: {
    slug: string;
    title: string;
    eyebrow: string;
    description: string;
    href: string;
    image: string;
  };
  index: number;
}

const smooth = [0.22, 1, 0.36, 1] as const;

export default function CategoryCard({ cat, index }: CategoryCardProps) {
  const imageFirst = index % 2 === 0;
  const stickyTop = 80 + index * 40;

  return (
    <motion.div
      className="sticky"
      style={{ top: stickyTop, zIndex: index + 1 }}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: smooth,
      }}
    >
      <motion.div
        className={`bg-surface-card rounded-xl overflow-hidden shadow-md flex flex-col ${
          imageFirst ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: smooth }}
      >
        {/* Image area */}
        <div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden min-h-[320px]">
          <motion.img
            src={cat.image}
            alt={cat.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.5, ease: smooth }}
          />
        </div>

        {/* Text area */}
        <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
          <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-4">
            {cat.eyebrow}
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-4xl text-ink tracking-tight mb-4">
            {cat.title}
          </h2>
          <p className="text-base text-body leading-relaxed mb-8">
            {cat.description}
          </p>
          <div>
            <Link
              href={cat.href}
              className="inline-flex items-center justify-center h-11 px-6 bg-primary text-on-primary text-sm font-medium rounded-lg hover:bg-primary-active transition-colors"
            >
              View Projects &rarr;
            </Link>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
