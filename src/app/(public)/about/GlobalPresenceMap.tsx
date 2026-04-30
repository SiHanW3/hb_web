"use client";

import { motion } from "framer-motion";
import { Building2, Factory } from "lucide-react";
import AnimateIn from "@/components/ui/AnimateIn";
import { countryPaths } from "@/data/asia-map-paths";

const smooth = [0.22, 1, 0.36, 1] as const;

const locations = [
  {
    name: "Dongguan",
    type: "Headquarters",
    icon: Building2,
    desc: "Main office and primary production facility",
  },
  {
    name: "Hong Kong",
    type: "Office",
    icon: Building2,
    desc: "Sales office and logistics hub",
  },
  {
    name: "Guangdong, China",
    type: "Supply Chain",
    icon: Factory,
    desc: "Mature supplier network for premium materials",
  },
  {
    name: "Vietnam",
    type: "Supply Chain",
    icon: Factory,
    desc: "Manufacturing partners for scalable production",
  },
];

// Highlighted countries (supply chain regions)
const highlightedCountries = ["china", "vietnam"];

// Background countries for geographic context
const contextCountries = [
  "japan",
  "south-korea",
  "thailand",
  "laos",
  "myanmar",
  "philippines",
  "cambodia",
  "malaysia",
  "indonesia",
];

// Marker positions mapped to the viewBox coordinate system
// Based on actual geographic positions in the projected paths
const markers = [
  { label: "Dongguan", x: 264, y: 218, primary: true },
  { label: "Hong Kong", x: 256, y: 228, primary: true },
  { label: "Vietnam", x: 152, y: 305, primary: false },
];

function Marker({
  x,
  y,
  label,
  primary,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  primary: boolean;
  delay: number;
}) {
  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={primary ? 5 : 4}
        fill={primary ? "var(--color-primary)" : "var(--color-muted)"}
        stroke="var(--color-canvas)"
        strokeWidth={2}
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay, ease: smooth }}
      />
      <motion.text
        x={x + (label === "Hong Kong" ? 14 : 0)}
        y={y + (label === "Hong Kong" ? 5 : -10)}
        textAnchor={label === "Hong Kong" ? "start" : "middle"}
        className="text-[8px] font-semibold"
        fill={primary ? "var(--color-ink)" : "var(--color-muted)"}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: delay + 0.15, ease: smooth }}
      >
        {label}
      </motion.text>
    </g>
  );
}

export default function GlobalPresenceMap() {
  return (
    <div className="max-w-[1200px] mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
      {/* SVG Map */}
      <AnimateIn blur delay={0.1}>
        <div className="relative p-6 lg:p-8">
          <svg
            viewBox="-160 -140 680 650"
            className="w-full h-auto"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Subtle dot grid */}
            <defs>
              <pattern
                id="mapgrid"
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="0.8" cy="0.8" r="0.4" fill="var(--color-hairline)" />
              </pattern>
            </defs>
            <rect x="-160" y="-140" width="680" height="650" fill="url(#mapgrid)" />

            {/* Context countries (outlined) */}
            {contextCountries.map((country) =>
              countryPaths[country]?.map((d, i) => (
                <motion.path
                  key={`${country}-${i}`}
                  d={d}
                  fill="var(--color-surface-soft)"
                  stroke="var(--color-muted-soft)"
                  strokeWidth={0.8}
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1, ease: smooth }}
                />
              ))
            )}

            {/* Highlighted countries — filled with primary */}
            {highlightedCountries.map((country, ci) =>
              countryPaths[country]?.map((d, i) => (
                <motion.path
                  key={`${country}-${i}`}
                  d={d}
                  fill="var(--color-primary)"
                  fillOpacity={0.18}
                  stroke="var(--color-primary)"
                  strokeWidth={1.2}
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + ci * 0.15,
                    ease: smooth,
                  }}
                />
              ))
            )}

            {/* Guangdong highlight region */}
            <motion.ellipse
              cx={264}
              cy={222}
              rx={24}
              ry={16}
              fill="var(--color-primary)"
              opacity={0.08}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: smooth }}
            />

            {/* Dashed connection line: Dongguan → Vietnam */}
            <motion.path
              d="M264,218 Q200,265 152,305"
              fill="none"
              stroke="var(--color-muted-soft)"
              strokeWidth={0.7}
              strokeDasharray="4 3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.7, ease: smooth }}
            />

            {/* Markers */}
            {markers.map((m, i) => (
              <Marker
                key={m.label}
                x={m.x}
                y={m.y}
                label={m.label}
                primary={m.primary}
                delay={0.5 + i * 0.12}
              />
            ))}
          </svg>
        </div>
      </AnimateIn>

      {/* Location list */}
      <div className="space-y-6">
        {locations.map((loc, i) => (
          <AnimateIn
            key={loc.name}
            delay={0.2 + i * 0.1}
            direction="right"
            amount={24}
            blur
          >
            <div className="flex gap-4 items-start">
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  loc.type === "Headquarters"
                    ? "bg-primary text-on-primary"
                    : "bg-primary/10 text-primary"
                }`}
              >
                <loc.icon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-[family-name:var(--font-display)] text-lg text-ink tracking-tight">
                    {loc.name}
                  </h4>
                  <span className="text-[10px] font-medium text-primary tracking-wide uppercase bg-primary/10 px-2 py-0.5 rounded-full">
                    {loc.type}
                  </span>
                </div>
                <p className="text-sm text-body leading-relaxed mt-1">
                  {loc.desc}
                </p>
              </div>
            </div>
          </AnimateIn>
        ))}
      </div>
    </div>
  );
}
