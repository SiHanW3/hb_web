"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  speed?: number; // seconds per full cycle
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  className?: string;
}

export default function Marquee({
  children,
  speed = 30,
  direction = "left",
  pauseOnHover = false,
  className = "",
}: MarqueeProps) {
  const animName = direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className={`overflow-hidden ${pauseOnHover ? "group" : ""} ${className}`}
    >
      <div
        className={`flex w-max ${pauseOnHover ? "group-hover:[animation-play-state:paused]" : ""}`}
        style={{
          animation: `${animName} ${speed}s linear infinite`,
        }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
