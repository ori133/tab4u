import Reveal from "./Reveal";
import Pill from "./Pill";
import ScrollWords from "./ScrollWords";

const icons = {
  key: <path d="M12 3v18M7 8l5-5 5 5M7 16l5 5 5-5" />,
  scroll: <><rect x="6" y="3" width="12" height="18" rx="6" /><path d="M12 7v4" /></>,
  easy: <><path d="M4 7h16M4 12h10M4 17h6" /></>,
};

const tools = [
  { icon: icons.key, t: "שינוי טון מיידי", d: "העלו או הורידו חצי טון, וכל האקורדים מתעדכנים בזמן אמת." },
  { icon: icons.scroll, t: "גלילה אוטומטית", d: "בחרו מהירות והשיר יזרום מולכם, כדי שהידיים יישארו על הגיטרה." },
  { icon: icons.easy, t: "גרסה קלה", d: "אקורדים פשוטים בלחיצה אחת, לנגינה נוחה למתחילים." },
];

export default function ToolCards() {
  return (
    <section id="tools" className="mx-auto max-w-5xl px-5 py-20">
      <div className="mb-12 text-center">
        <Reveal><Pill>כלים</Pill></Reveal>
        <ScrollWords text="כלים חכמים לכל נגן" className="mt-5 font-display text-4xl leading-tight tracking-tight sm:text-5xl" />
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {tools.map((t, i) => (
          <Reveal key={t.t} delay={i * 0.12}>
            <div tabIndex={0} className="glass group relative h-72 overflow-hidden rounded-3xl outline-none transition focus-visible:ring-2 focus-visible:ring-brand">
              <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center transition duration-500 group-hover:-translate-y-8 group-focus:-translate-y-8">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2e7cf6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden>{t.icon}</svg>
                <h3 className="font-display text-xl leading-snug">{t.t}</h3>
              </div>
              <div className="absolute inset-x-3 bottom-3 grid h-40 translate-y-[115%] place-items-center rounded-[50%_50%_1.25rem_1.25rem/90%_90%_1.25rem_1.25rem] bg-lime px-8 text-center text-sm leading-relaxed transition duration-500 ease-out group-hover:translate-y-0 group-focus:translate-y-0">
                {t.d}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
