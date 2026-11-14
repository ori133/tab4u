"use client";
import { motion } from "framer-motion";
import IsoScene from "./IsoScene";
import Pill from "./Pill";
import { song } from "@/lib/song";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden px-5 pb-24 pt-28 text-center">
      <div className="pointer-events-none absolute -start-24 top-1/2 size-72 rounded-full bg-gradient-to-br from-white to-transparent opacity-80 blur-sm" />
      <div className="pointer-events-none absolute -end-28 top-24 size-96 rounded-full bg-gradient-to-bl from-white to-transparent opacity-80 blur-sm" />
      <IsoScene />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto mt-6 max-w-3xl"
      >
        <div className="mb-5 flex justify-center gap-2">
          {song.tags.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
        <h1 className="font-display text-4xl font-normal leading-[1.15] tracking-tight sm:text-6xl">
          אקורדים לשיר <span className="text-brand">{song.title}</span>
          <br />
          של {song.artist}
        </h1>
        <p className="mx-auto mt-5 max-w-md text-balance text-base text-muted">
          ערוך על ידי הצוות, כולל גרסה קלה. דורג {song.rating} כאחד השירים האהובים.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="#reader" className="rounded-full bg-brand px-7 py-3 text-sm font-medium text-white shadow-[0_12px_24px_-8px_rgba(46,124,246,.7)] transition hover:brightness-110 active:scale-95">
            לנגן עכשיו
          </a>
          <button className="glass rounded-full px-7 py-3 text-sm font-medium transition hover:bg-white active:scale-95">
            הוספה לשירים שלי
          </button>
        </div>
      </motion.div>
    </section>
  );
}
