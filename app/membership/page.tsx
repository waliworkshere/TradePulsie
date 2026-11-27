"use client";
import { useState } from "react";
import { tiers } from "@/lib/data";
import Checkout from "@/components/Checkout";
import { useToast } from "@/components/Toast";

const matrix: [string, boolean[]][] = [
  ["Monthly competitions", [true, true, true, true]],
  ["Trader dashboard and stats", [true, true, true, true]],
  ["Free Academy courses", [true, true, true, true]],
  ["Community forum", [true, true, true, true]],
  ["Weekly market outlook", [false, true, true, true]],
  ["Premium courses", [false, false, true, true]],
  ["Live trading sessions", [false, false, true, true]],
  ["VIP-only competitions", [false, false, false, true]],
  ["Monthly 1-to-1 mentorship", [false, false, false, true]],
];

export default function Membership() {
  const [yearly, setYearly] = useState(false);
  const [buy, setBuy] = useState<string | null>(null);
  const { show, node } = useToast();
  const price = (p: number) => (yearly ? Math.round(p * 10) : p);
  const chosen = tiers.find((t) => t.name === buy);
  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-head" style={{ textAlign: "center" }}>
        <h1 className="h1 display">Membership</h1>
        <p className="lead" style={{ margin: "14px auto 22px" }}>Competitions are free on every plan. Pay yearly and get two months free.</p>
        <div className="tabs">
          <button className={!yearly ? "on" : ""} onClick={() => setYearly(false)}>Monthly</button>
          <button className={yearly ? "on" : ""} onClick={() => setYearly(true)}>Yearly</button>
        </div>
      </div>
      <div className="grid-4">
        {tiers.map((t) => (
          <div key={t.name} className={`panel panel-pad tier-card ${t.highlight ? "hl" : ""}`}>
            <h3 className="h3 display">{t.name}</h3>
            <div className="display" style={{ fontSize: 34, fontWeight: 600, margin: "10px 0 2px" }}>
              ${price(t.price)}<span className="dim" style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 400 }}> /{yearly ? "year" : "month"}</span>
            </div>
            <ul className="checks">{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
            <button className={`btn ${t.highlight ? "btn-pulse" : "btn-ghost"} btn-block`} onClick={() => (t.price ? setBuy(t.name) : show("You're on the Free plan."))}>
              {t.price ? `Get ${t.name}` : "Current plan"}
            </button>
          </div>
        ))}
      </div>
      <div className="panel" style={{ marginTop: 32 }}>
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>What you get</th>{tiers.map((t) => <th key={t.name} className="num">{t.name}</th>)}</tr></thead>
            <tbody>
              {matrix.map(([f, v]) => (
                <tr key={f}><td>{f}</td>{v.map((ok, i) => <td key={i} className={`num ${ok ? "up" : "dim"}`}>{ok ? "✓" : "–"}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {chosen && (
        <Checkout
          lines={[{ name: `${chosen.name} membership (${yearly ? "yearly" : "monthly"})`, price: price(chosen.price) }]}
          onClose={() => setBuy(null)}
          onPaid={() => { setBuy(null); show(`Welcome to ${chosen.name}. Your new benefits are active.`); }}
        />
      )}
      {node}
    </div>
  );
}
