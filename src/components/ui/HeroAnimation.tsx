"use client";

import { useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

const smooth = [0.22, 1, 0.36, 1] as const;

const slides = [
  {
    src: "/images/hero-rigid-box.jpg",
    alt: "Premium rigid box packaging",
    label: "Rigid Box",
    x: "-5%",
    y: "5%",
    rotate: -6,
    rotateY: -8,
    delay: 0,
    floatDuration: 5,
    floatY: [-6, 6, -6],
    z: 0,
  },
  {
    src: "/images/hero-book.jpg",
    alt: "Printed book and manual",
    label: "Book & Manual",
    x: "35%",
    y: "0%",
    rotate: 3,
    rotateY: 5,
    delay: 0.15,
    floatDuration: 6,
    floatY: [5, -7, 5],
    z: 20,
  },
  {
    src: "/images/hero-label.jpg",
    alt: "Custom label design",
    label: "Label",
    x: "14%",
    y: "38%",
    rotate: -2,
    rotateY: -3,
    delay: 0.3,
    floatDuration: 5.5,
    floatY: [-4, 6, -4],
    z: 40,
  },
];


export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const px = (e.clientX - cx) / (rect.width / 2);
      const py = (e.clientY - cy) / (rect.height / 2);
      mouseX.set(px);
      mouseY.set(py);
      rotateY.set(px * 6);
      rotateX.set(-py * 6);
    },
    [mouseX, mouseY, rotateX, rotateY],
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={containerRef}
      className="w-full aspect-[4/3] relative"
      style={{ perspective: 800, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute w-[58%] aspect-[4/3]"
          style={{
            left: slide.x,
            top: slide.y,
            zIndex: (i + 1) * 10,
            transformStyle: "preserve-3d",
          }}
          initial={{
            opacity: 0,
            scale: 0.8,
            rotate: 0,
            rotateY: -20,
            x: "20%",
            y: "20%",
            z: -60,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: slide.rotate,
            rotateY: slide.rotateY,
            x: 0,
            y: 0,
            z: slide.z,
          }}
          transition={{
            duration: 1,
            delay: slide.delay,
            ease: smooth,
          }}
        >
          <motion.div
            className="w-full h-full"
            animate={{ y: slide.floatY }}
            transition={{
              duration: slide.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl border border-hairline shadow-xl">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 60vw, 30vw"
                priority={i === 0}
              />
              <div className="absolute bottom-2 left-2 bg-canvas/80 backdrop-blur-sm px-2 py-1 rounded-md">
                <span className="text-[11px] font-medium text-ink">
                  {slide.label}
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ))}

    </motion.div>
  );
}
