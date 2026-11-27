type LineProps = { data: number[]; height?: number; stroke?: string; fill?: boolean; showAxis?: boolean };

export function LineChart({ data, height = 220, stroke = "#ffffff", fill = true, showAxis = true }: LineProps) {
  const w = 800;
  const h = height;
  const pad = { l: showAxis ? 56 : 4, r: 8, t: 10, b: showAxis ? 24 : 4 };
  const min = Math.min(...data);
  const max = Math.max(...data);
  const x = (i: number) => pad.l + (i / (data.length - 1)) * (w - pad.l - pad.r);
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min || 1)) * (h - pad.t - pad.b);
  const d = data.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const area = `${d} L${x(data.length - 1)},${h - pad.b} L${x(0)},${h - pad.b} Z`;
  const ticks = [min, min + (max - min) / 2, max];
  const gid = `g${stroke.replace("#", "")}${height}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height={h} preserveAspectRatio="none" role="img" aria-label="Equity chart">
      <defs>
        <linearGradient id={gid} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={stroke} stopOpacity=".28" />
          <stop offset="1" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      {showAxis &&
        ticks.map((t, i) => (
          <g key={i}>
            <line x1={pad.l} x2={w - pad.r} y1={y(t)} y2={y(t)} stroke="#262626" strokeDasharray="3 5" />
            <text x={pad.l - 8} y={y(t) + 4} textAnchor="end" fontSize="11" fill="#666666">
              ${Math.round(t).toLocaleString()}
            </text>
          </g>
        ))}
      {fill && <path d={area} fill={`url(#${gid})`} />}
      <path d={d} fill="none" stroke={stroke} strokeWidth="2" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

export function Sparkline({ data, up = true }: { data: number[]; up?: boolean }) {
  return <LineChart data={data} height={42} stroke={up ? "#ffffff" : "#ff5468"} fill={false} showAxis={false} />;
}

export function Donut({ value, label }: { value: number; label: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 110 110" width="110" height="110" role="img" aria-label={`${label} ${value}%`}>
      <circle cx="55" cy="55" r={r} fill="none" stroke="#262626" strokeWidth="10" />
      <circle cx="55" cy="55" r={r} fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round"
        strokeDasharray={`${(value / 100) * c} ${c}`} transform="rotate(-90 55 55)" />
      <text x="55" y="58" textAnchor="middle" fontSize="20" fontWeight="600" fill="#f2f2f2" fontFamily="var(--font-display)">{value}%</text>
      <text x="55" y="76" textAnchor="middle" fontSize="10" fill="#666666">{label}</text>
    </svg>
  );
}

export function Bars({ data, labels }: { data: number[]; labels: string[] }) {
  const max = Math.max(...data.map(Math.abs));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 150 }}>
      {data.map((v, i) => (
        <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <div style={{ width: "100%", height: `${(Math.abs(v) / max) * 120}px`, background: v >= 0 ? "#e6e6e6" : "#ff5468", borderRadius: 6, opacity: 0.9 }} title={`$${v}`} />
          <span style={{ fontSize: 11.5, color: "#5d6b61" }}>{labels[i]}</span>
        </div>
      ))}
    </div>
  );
}
