type Item = { title: string; artist: string; hot?: boolean };

// שמות השירים והאמנים לקוחים מהדף המקורי ב-Tab4U
const sameArtist: Item[] = [
  { title: "אייכה", artist: "שולי רנד", hot: true },
  { title: "מוחין דקטנות", artist: "שולי רנד" },
  { title: "פרח", artist: "שולי רנד ועמיר בניון" },
  { title: "מתוך שינה", artist: "שולי רנד" },
  { title: "גם כי אלך", artist: "שולי רנד" },
  { title: "דממה דקה", artist: "שולי רנד" },
  { title: "עונג שבת", artist: "שולי רנד ושי הורוביץ (שרק)" },
  { title: "חיילים אלמונים", artist: "שולי רנד" },
  { title: "יהודי", artist: "שולי רנד" },
  { title: "לגלגל את זה הלאה", artist: "שולי רנד" },
  { title: "אחד כמוך", artist: "שולי רנד" },
  { title: "דוד מלכי", artist: "שולי רנד ועמיר בניון" },
];

const similar: Item[] = [
  { title: "כל כך הרבה אור", artist: "צביקה פיק" },
  { title: "צמרמורת", artist: "הראל סקעת" },
  { title: "עולה", artist: "אביב בכר" },
  { title: "אור", artist: "חיים איפרגן" },
  { title: "אני מסתובב", artist: "נדב חנציס" },
  { title: "אני מצדיע לך", artist: "אביאל גראוכר" },
];

function Row({ it, n }: { it: Item; n: number }) {
  return (
    <li>
      <a href="#" className="group flex items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-white">
        <span className="w-6 text-center font-mono text-xs text-muted">{String(n).padStart(2, "0")}</span>
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand transition group-hover:bg-brand group-hover:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M9 18V6l10-2v12" /><circle cx="7" cy="18" r="2.5" /><circle cx="17" cy="16" r="2.5" /></svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="truncate text-[15px] font-medium transition group-hover:text-brand">{it.title}</span>
            {it.hot && <span className="shrink-0 rounded-full bg-lime px-2 py-0.5 text-[10px] font-medium">פופולרי</span>}
          </span>
          <span className="block truncate text-xs text-muted">{it.artist}</span>
        </span>
        <span className="text-muted/50 transition group-hover:-translate-x-1 group-hover:text-brand" aria-hidden>‹</span>
      </a>
    </li>
  );
}

function List({ title, items, more }: { title: string; items: Item[]; more?: string }) {
  return (
    <section className="mt-12 print:hidden">
      <div className="mb-3 flex items-end justify-between px-1">
        <h2 className="font-display text-2xl tracking-tight">{title}</h2>
        {more && <a href="#" className="text-sm text-brand hover:underline">{more}</a>}
      </div>
      <ul className="glass grid gap-x-6 rounded-3xl p-3 md:grid-cols-2">
        {items.map((it, i) => <Row key={it.title} it={it} n={i + 1} />)}
      </ul>
    </section>
  );
}

export default function RelatedSongs() {
  return (
    <>
      <List title="עוד משירי שולי רנד" items={sameArtist} more="לכל השירים" />
      <List title="שירים דומים" items={similar} />
    </>
  );
}
