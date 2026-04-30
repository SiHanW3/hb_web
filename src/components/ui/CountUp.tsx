"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, animate } from "framer-motion";

export default function CountUp({
  target,
  suffix = "",
  className,
}: {
  target: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const motionVal = useMotionValue(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionVal, target, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate(v) {
        if (ref.current) {
          ref.current.textContent = Math.round(v) + suffix;
        }
      },
      onComplete() {
        setDone(true);
      },
    });

    return controls.stop;
  }, [isInView, motionVal, target, suffix]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ filter: "blur(4px)" }}
      animate={
        isInView
          ? { filter: "blur(0px)" }
          : {}
      }
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.span
        animate={
          done
            ? { scale: [1, 1.15, 1] }
            : {}
        }
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="inline-block"
      >
        0{suffix}
      </motion.span>
    </motion.span>
  );
}
