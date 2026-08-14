export default function Marquee({
  items,
  dark = false,
}: {
  items: string[];
  dark?: boolean;
}) {
  const row = [...items, ...items];
  return (
    <div
      className={`overflow-hidden border-b py-3 ${
        dark ? "border-lined bg-ink text-paper/70" : "border-line bg-paper text-ink/60"
      }`}
    >
      <div className="gp-marquee-track flex w-max items-center whitespace-nowrap font-mono text-[11px] tracking-[0.24em] uppercase">
        {row.map((t, i) => (
          <span key={i} className="flex items-center">
            <span className="px-6">{t}</span>
            <span className={dark ? "text-gfp" : "text-gfp-deep"}>+</span>
          </span>
        ))}
      </div>
    </div>
  );
}
