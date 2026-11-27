"use client";
import { useEffect, useState } from "react";

export default function Countdown({ to }: { to: string }) {
  const target = new Date(to).getTime();
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => {
    setNow(Date.now());
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, target - (now ?? target));
  const d = Math.floor(diff / 864e5), hh = Math.floor((diff / 36e5) % 24), mm = Math.floor((diff / 6e4) % 60), ss = Math.floor((diff / 1e3) % 60);
  const cell = (v: number, l: string) => (
    <div style={{ textAlign: "center" }}>
      <div className="display" style={{ fontSize: 30, fontWeight: 600 }}>{now === null ? "--" : String(v).padStart(2, "0")}</div>
      <div className="dim" style={{ fontSize: 12 }}>{l}</div>
    </div>
  );
  return (
    <div style={{ display: "flex", gap: 22 }} aria-live="off">
      {cell(d, "days")}{cell(hh, "hours")}{cell(mm, "min")}{cell(ss, "sec")}
    </div>
  );
}
