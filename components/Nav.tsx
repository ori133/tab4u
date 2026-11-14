"use client";
import { motion } from "framer-motion";

export default function Nav() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="glass flex items-center gap-2 rounded-full p-1.5" aria-label="ראשי">
        <a href="#top" aria-label="Tab4U" className="grid size-10 place-items-center rounded-full bg-lime font-display text-[11px] font-medium tracking-tight">
          T4U
        </a>
        <button aria-label="חיפוש" className="grid size-10 place-items-center rounded-full text-ink/70 transition hover:bg-black/5">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
        </button>
        <a href="#reader" className="hidden px-3 text-sm text-ink/70 transition hover:text-ink sm:block">אקורדים</a>
        <a href="#tools" className="hidden px-3 text-sm text-ink/70 transition hover:text-ink sm:block">כלים</a>
        <button className="rounded-full bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-[0_8px_20px_-6px_rgba(46,124,246,.7)] transition hover:brightness-110 active:scale-95">
          התחברות
        </button>
      </nav>
    </motion.header>
  );
}
