"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  categorySlug: string;
  index: number;
}

export default function ProductCard({
  id,
  title,
  description,
  image,
  categorySlug,
  index,
}: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Link href={`/our-work/${categorySlug}/${id}`}>
        <motion.div
          className="bg-surface-card rounded-xl overflow-hidden cursor-pointer"
          whileHover={{
            y: -6,
            rotate: 0.5,
            boxShadow: "0 20px 40px -12px rgba(0,0,0,0.12)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform" }}
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-surface-card to-surface-cream-strong overflow-hidden">
            {image ? (
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-xl text-muted-soft">
                  {title}
                </span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="font-[family-name:var(--font-display)] text-xl text-ink tracking-tight mb-2">
              {title}
            </h3>
            <p className="text-sm text-body leading-relaxed">{description}</p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
