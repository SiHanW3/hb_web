"use client";

import { motion } from "framer-motion";
import { ElementType } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

interface TextRevealProps {
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export default function TextReveal({
  text,
  as: Tag = "h1",
  className,
  delay = 0,
  staggerDelay = 0.04,
  once = true,
}: TextRevealProps) {
  const words = text.split(" ");

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em]">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
              ease,
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Tag>
  );
}
