"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, animate } from "framer-motion";

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
    });

    return controls.stop;
  }, [isInView, motionVal, target, suffix]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
