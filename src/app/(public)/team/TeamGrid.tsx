"use client";

import { motion } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as const;

// Deterministic "random" values per index for scattered effect
const scatterConfig = [
  { rotate: -3, offsetY: 0 },
  { rotate: 2, offsetY: 12 },
  { rotate: -1, offsetY: -8 },
  { rotate: 3, offsetY: 6 },
  { rotate: -2, offsetY: 16 },
  { rotate: 1, offsetY: -4 },
  { rotate: -3, offsetY: 10 },
  { rotate: 2, offsetY: -12 },
];

const enterDirections = [
  { x: -40, y: 20 },
  { x: 20, y: -30 },
  { x: 40, y: 10 },
  { x: -20, y: -20 },
  { x: 30, y: 30 },
  { x: -30, y: -10 },
  { x: 10, y: 40 },
  { x: -10, y: -40 },
];

interface TeamGridProps {
  members: { name: string; role: string }[];
}

export default function TeamGrid({ members }: TeamGridProps) {
  return (
    <div className="max-w-[1200px] mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {members.map((m, i) => {
        const scatter = scatterConfig[i % scatterConfig.length];
        const enter = enterDirections[i % enterDirections.length];

        return (
          <motion.div
            key={m.name}
            initial={{
              opacity: 0,
              x: enter.x,
              y: enter.y,
              rotate: scatter.rotate * 2,
              filter: "blur(6px)",
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              y: 0,
              rotate: scatter.rotate,
              filter: "blur(0px)",
            }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
              duration: 0.7,
              delay: i * 0.08,
              ease: smooth,
            }}
            whileHover={{
              rotate: 0,
              y: -8,
              boxShadow: "0 20px 40px -12px rgba(0,0,0,0.1)",
            }}
            className="lg:first:mt-0"
            style={{ marginTop: scatter.offsetY }}
          >
            <div className="bg-canvas rounded-2xl overflow-hidden">
              <div className="aspect-[3/4] bg-surface-card" />
              <div className="p-6">
                <h3 className="font-[family-name:var(--font-display)] text-lg text-ink tracking-tight">
                  {m.name}
                </h3>
                <p className="text-sm text-muted mt-1">{m.role}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
