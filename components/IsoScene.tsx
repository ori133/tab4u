"use client";
import { motion } from "framer-motion";
import { uniqueChords } from "@/lib/song";

const cards = [
  { x: -150, y: 40, z: 10, w: 150, h: 190 },
  { x: -10, y: -30, z: 70, w: 160, h: 240 },
  { x: 150, y: 20, z: 30, w: 170, h: 150 },
  { x: 40, y: 150, z: 0, w: 190, h: 120 },
];

/** סצנה איזומטרית: כרטיסי אקורדים צפים בשכבות */
export default function IsoScene() {
  const chords = uniqueChords(0);
  return (
    <div className="relative mx-auto h-[360px] w-full max-w-[640px] select-none sm:h-[420px]" aria-hidden>
      <svg className="absolute inset-0 size-full" viewBox="0 0 640 420" fill="none">
        <ellipse cx="320" cy="250" rx="270" ry="120" stroke="#9cc4ff" strokeOpacity=".5" />
        <path d="M120 300 C200 360 260 330 320 300 S470 250 540 290" stroke="#8a93a8" strokeOpacity=".5" strokeDasharray="5 6" />
        <path d="M150 220 C230 170 300 200 360 170" stroke="#8a93a8" strokeOpacity=".35" strokeDasharray="5 6" />
      </svg>
      <div className="absolute inset-0 grid place-items-center [perspective:1400px]">
        <motion.div
          initial={{ opacity: 0, rotateZ: -50, scale: 0.85 }}
          animate={{ opacity: 1, rotateZ: -38, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformStyle: "preserve-3d", rotateX: 58 }}
          className="relative size-0"
        >
          {cards.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, z: 0 }}
              animate={{ opacity: 1, z: c.z }}
              transition={{ duration: 0.9, delay: 0.25 + i * 0.12 }}
              style={{ left: c.x, top: c.y, width: c.w, height: c.h, transformStyle: "preserve-3d" }}
              className="absolute rounded-2xl border border-white bg-white/90 p-4 shadow-[0_30px_40px_-18px_rgba(40,60,120,.35)]"
            >
              <div className="mb-3 h-1.5 w-12 rounded-full bg-brand/80" />
              <div className="flex flex-wrap gap-1.5">
                {chords.slice(i, i + 3 + (i % 2)).map((ch) => (
                  <span key={ch} dir="ltr" className="rounded-md bg-brand-soft px-2 py-0.5 font-mono text-[11px] text-brand">
                    {ch}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="h-1.5 w-full rounded-full bg-black/8" />
                <div className="h-1.5 w-4/5 rounded-full bg-black/8" />
                <div className="h-1.5 w-3/5 rounded-full bg-black/8" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {[
        ["12%", "62%", "0s"],
        ["84%", "30%", "1.2s"],
        ["68%", "82%", "2.4s"],
      ].map(([l, t, d], i) => (
        <span key={i} style={{ left: l, top: t, animationDelay: d }} className="float-slow absolute size-4 rotate-45 rounded-[3px] bg-brand/40" />
      ))}
    </div>
  );
}
