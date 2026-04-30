"use client";

import { motion } from "framer-motion";

const smooth = [0.22, 1, 0.36, 1] as const;

interface Step {
  num: string;
  title: string;
  desc: string;
}

export default function ProcessTimeline({ steps }: { steps: Step[] }) {
  return (
    <div className="max-w-[1200px] mx-auto mt-16 relative">
      {/* Connecting line - positioned to align with dot centers */}
      <motion.div
        className="hidden lg:block absolute top-[10px] left-[12.5%] right-[12.5%] h-px bg-primary/20"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: smooth }}
        style={{ transformOrigin: "left" }}
      />

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            className="flex flex-col items-center"
            initial={{
              opacity: 0,
              y: 40,
              filter: "blur(6px)",
            }}
            whileInView={{
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.6,
              delay: 0.3 + i * 0.15,
              ease: smooth,
            }}
          >
            {/* Step dot on the line */}
            <motion.div
              className="hidden lg:flex w-5 h-5 rounded-full bg-primary/20 items-center justify-center relative z-10 shrink-0"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.4,
                delay: 0.5 + i * 0.15,
                ease: smooth,
              }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-primary" />
            </motion.div>

            {/* Card - with gap from dot */}
            <div className="bg-canvas rounded-2xl p-8 h-full w-full lg:mt-8">
              <motion.span
                className="font-[family-name:var(--font-display)] text-5xl text-primary/20 block mb-4"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.5,
                  delay: 0.4 + i * 0.15,
                  ease: smooth,
                }}
              >
                {step.num}
              </motion.span>
              <h3 className="font-[family-name:var(--font-display)] text-xl text-ink tracking-tight mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-body leading-relaxed">
                {step.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
