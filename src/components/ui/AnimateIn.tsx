"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right";

function getOffset(direction: Direction, amount: number) {
  switch (direction) {
    case "up":
      return { x: 0, y: amount };
    case "down":
      return { x: 0, y: -amount };
    case "left":
      return { x: amount, y: 0 };
    case "right":
      return { x: -amount, y: 0 };
  }
}

const ease = [0.22, 1, 0.36, 1] as const;

export default function AnimateIn({
  children,
  className,
  delay = 0,
  direction = "up",
  amount = 24,
  scale = 1,
  spring = false,
  blur = false,
  rotate = 0,
  clipReveal = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: Direction;
  amount?: number;
  scale?: number;
  spring?: boolean;
  blur?: boolean;
  rotate?: number;
  clipReveal?: boolean;
}) {
  const offset = getOffset(direction, amount);

  const transition = spring
    ? { type: "spring" as const, stiffness: 260, damping: 20, delay }
    : { duration: 0.6, delay, ease };

  const initial = {
    opacity: clipReveal ? 1 : 0,
    x: offset.x,
    y: offset.y,
    scale,
    rotate,
    ...(blur ? { filter: "blur(8px)" } : {}),
    ...(clipReveal ? { clipPath: "inset(0 100% 0 0)" } : {}),
  };

  const target = {
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    rotate: 0,
    ...(blur ? { filter: "blur(0px)" } : {}),
    ...(clipReveal ? { clipPath: "inset(0 0% 0 0)" } : {}),
  };

  return (
    <motion.div
      initial={initial}
      whileInView={target}
      viewport={{ once: true, margin: "-60px" }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
