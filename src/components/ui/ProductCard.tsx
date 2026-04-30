"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  title: string;
  description: string;
  image?: string;
  categorySlug: string;
  index: number;
}

const smooth = [0.22, 1, 0.36, 1] as const;

export default function ProductCard({
  id,
  title,
  description,
  image,
  categorySlug,
  index,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const px = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const py = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
      rotateY.set(px * 8);
      rotateX.set(-py * 8);
    },
    [rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: smooth,
      }}
      style={{ perspective: 800 }}
      className="h-full"
    >
      <Link href={`/our-work/${categorySlug}/${id}`} className="h-full block">
        <motion.div
          ref={cardRef}
          className="h-full bg-surface-card rounded-xl overflow-hidden cursor-pointer flex flex-col"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          whileHover={{
            y: -6,
            boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)",
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ duration: 0.3, ease: smooth }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="aspect-[4/3] bg-gradient-to-br from-surface-card to-surface-cream-strong overflow-hidden">
            {image ? (
              <motion.img
                src={image}
                alt={title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4, ease: smooth }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-xl text-muted-soft">
                  {title}
                </span>
              </div>
            )}
          </div>
          <div className="p-6 flex-1">
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
