"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

export default function CtaBand({
  title = "Let's Create Together",
  description = "Ready to elevate your brand with premium packaging? Let's start a conversation.",
  buttonText = "Get In Touch",
  buttonHref = "/contact",
}: {
  title?: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}) {
  return (
    <section className="py-24 px-6 lg:px-10">
      <motion.div
        className="max-w-[1200px] mx-auto bg-primary rounded-2xl px-10 py-16 flex flex-col items-center text-center"
        initial={{ opacity: 0, scale: 0.9, rotate: -1, filter: "blur(8px)" }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
      >
        <motion.h2
          className="font-[family-name:var(--font-display)] text-3xl md:text-[40px] text-on-primary tracking-tight mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
        >
          {title}
        </motion.h2>
        <motion.p
          className="text-on-primary/90 text-base mb-8 max-w-lg"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35, ease }}
        >
          {description}
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
        >
          <Link
            href={buttonHref}
            className="inline-flex items-center justify-center h-12 px-8 bg-canvas text-ink text-sm font-medium rounded-lg hover:bg-surface-soft transition-colors"
          >
            {buttonText}
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
