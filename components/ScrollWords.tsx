"use client";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = i / n;
  const end = Math.min(1, start + 1.6 / n);
  const color = useTransform(p, [start, end], ["#a9a9b3", "#0b0b0f"]);
  return (
    <motion.span style={{ color }} className="inline-block">
      {w}&nbsp;
    </motion.span>
  );
}

/** כותרת שהמילים בה מתכהות בהדרגה בגלילה, כמו בשוט */
export default function ScrollWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.92", "start 0.45"] });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />
      ))}
    </h2>
  );
}
