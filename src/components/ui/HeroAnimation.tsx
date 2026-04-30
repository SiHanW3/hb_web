"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const smooth = [0.22, 1, 0.36, 1] as const;

const slides = [
  {
    src: "/images/hero-rigid-box.jpg",
    alt: "Premium rigid box packaging",
    label: "Rigid Box",
    // final position & rotation
    x: "0%",
    y: "0%",
    rotate: -3,
    delay: 0,
    floatDuration: 5,
    floatY: [-4, 4, -4],
  },
  {
    src: "/images/hero-book.jpg",
    alt: "Printed book and manual",
    label: "Book & Manual",
    x: "38%",
    y: "10%",
    rotate: 2,
    delay: 0.15,
    floatDuration: 6,
    floatY: [3, -5, 3],
  },
  {
    src: "/images/hero-label.jpg",
    alt: "Custom label design",
    label: "Label",
    x: "16%",
    y: "42%",
    rotate: -1,
    delay: 0.3,
    floatDuration: 5.5,
    floatY: [-3, 5, -3],
  },
];

export default function HeroAnimation() {
  return (
    <div className="w-full aspect-[4/3] relative">
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute w-[58%] aspect-[4/3]"
          style={{ left: slide.x, top: slide.y, zIndex: (i + 1) * 10 }}
          // Fan-out from stacked center
          initial={{
            opacity: 0,
            scale: 0.88,
            rotate: 0,
            x: "20%",
            y: "15%",
          }}
          animate={{
            opacity: 1,
            scale: 1,
            rotate: slide.rotate,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 0.9,
            delay: slide.delay,
            ease: smooth,
          }}
        >
          {/* Breathing float */}
          <motion.div
            className="w-full h-full"
            animate={{ y: slide.floatY }}
            transition={{
              duration: slide.floatDuration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="relative w-full h-full overflow-hidden rounded-xl border border-hairline shadow-lg">
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
    </div>
  );
}
