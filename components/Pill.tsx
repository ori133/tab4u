export default function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-brand/50 bg-white/40 px-3.5 py-1 text-xs font-medium text-brand">
      {children}
    </span>
  );
}
