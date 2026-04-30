"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
}

export default function ScrollRevealSection({
  children,
  className = "",
}: ScrollRevealSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.3"],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.5], [6, 0]);
  const filterBlur = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, scale, filter: filterBlur }}
    >
      {children}
    </motion.div>
  );
}
