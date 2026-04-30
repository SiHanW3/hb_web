"use client";

import { useRef, useCallback } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const py = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      rotateY.set(px * 4);
      rotateX.set(-py * 4);
    },
    [rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      className="sticky"
      style={{ top: stickyTop, zIndex: index + 1, perspective: 1000 }}
      initial={{ opacity: 0, y: 60, scale: 0.93, rotateY: imageFirst ? -8 : 8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateY: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: smooth,
      }}
    >
      <motion.div
        ref={cardRef}
        className={`bg-surface-card rounded-xl overflow-hidden shadow-md flex flex-col ${
          imageFirst ? "lg:flex-row" : "lg:flex-row-reverse"
        }`}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -6, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
        transition={{ duration: 0.3, ease: smooth }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image area */}
        <div className="lg:w-1/2 aspect-[4/3] lg:aspect-auto overflow-hidden min-h-[320px]">
          <motion.img
            src={cat.image}
            alt={cat.title}
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: smooth }}
          />
        </div>

        {/* Text area */}
        <div className="lg:w-1/2 p-10 lg:p-14 flex flex-col justify-center">
          <motion.span
            className="text-xs font-medium text-primary tracking-[1.5px] uppercase mb-4 block"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1, ease: smooth }}
          >
            {cat.eyebrow}
          </motion.span>
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
