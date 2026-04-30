"use client";

import { motion } from "framer-motion";
import TextReveal from "./TextReveal";

const ease = [0.22, 1, 0.36, 1] as const;

export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center text-center max-w-[600px] mx-auto">
      {/* Eyebrow - slide in from left with line */}
      <motion.div
        className="flex items-center gap-3 mb-4"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease }}
      >
        <motion.div
          className="h-px bg-primary"
          initial={{ width: 0 }}
          whileInView={{ width: 24 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        />
        <span className="text-xs font-medium text-primary tracking-[1.5px] uppercase">
          {eyebrow}
        </span>
      </motion.div>

      {/* Title - word-by-word reveal */}
      <TextReveal
        text={title}
        as="h2"
        className="font-[family-name:var(--font-display)] text-4xl md:text-5xl text-ink tracking-tight mb-4"
        delay={0.15}
        staggerDelay={0.05}
      />

      {/* Description - delayed fade in */}
      <motion.p
        className="text-base text-body leading-relaxed"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, delay: 0.45, ease }}
      >
        {description}
      </motion.p>
    </div>
  );
}
