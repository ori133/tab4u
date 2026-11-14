"use client";
import { createContext, useContext, useState } from "react";

/** הגדרות שמשותפות לכרטיס השיר ולקורא האקורדים */
type Settings = { tone: number; setTone: (t: number) => void; simple: boolean; setSimple: (v: boolean) => void };
const Ctx = createContext<Settings | null>(null);

// סולם Am מתקבל מ-Cm בירידה של שלוש חצאי טון, כלומר מינוס 1.5 טונים
export const EASY_TONE = -1.5;

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [tone, setTone] = useState(0);
  const [simple, setSimple] = useState(false);
  return <Ctx.Provider value={{ tone, setTone, simple, setSimple }}>{children}</Ctx.Provider>;
}

export function useSettings() {
  const c = useContext(Ctx);
  if (!c) throw new Error("useSettings must be used inside SettingsProvider");
  return c;
}
