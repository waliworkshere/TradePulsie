"use client";
import { useEffect, useState } from "react";
import { flags as seedFlags, payments, competitions, leaderboard, courses, products } from "@/lib/data";
import { LineChart } from "@/components/Charts";
import { useToast } from "@/components/Toast";

const sections = ["Overview", "Fair play", "Competitions", "Users", "Payments", "Content"] as const;

export default function Admin() {
  const [tab, setTab] = useState<(typeof sections)[number]>("Overview");
  const [flags, setFlags] = useState(seedFlags);
  const { show, node } = useToast();
  useEffect(() => {
    let last = "";
    const sync = () => {
      const q = window.location.search;
      if (q === last) return;
      last = q;
      if (new URLSearchParams(q).get("tab") === "fair") setTab("Fair play");
    };
    sync();
    const t = setInterval(sync, 400);
    return () => clearInterval(t);
  }, []);
  const resolve = (id: string, action: string) => { setFlags(flags.filter((f) => f.id !== id)); show(`${id}: ${action}`); };
  const signups = [40, 52, 48, 61, 75, 70, 88, 96, 110, 104, 131, 150, 162, 171];

  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-head split-head" style={{ paddingBottom: 20 }}>
        <div>
          <h1 className="h1 display" style={{ fontSize: "clamp(32px,4.4vw,52px)" }}>Admin</h1>
          <p className="lead">Run competitions, review fair-play flags, and manage users, payments and content.</p>
        </div>
        <span className="pill warn">{flags.length} flags need review</span>
      </div>
      <div className="admin">
        <nav className="admin-nav panel">
          {sections.map((s) => (
            <button key={s} className={tab === s ? "on" : ""} onClick={() => setTab(s)}>
              {s}{s === "Fair play" && flags.length ? <span className="count">{flags.length}</span> : null}
            </button>
          ))}
        </nav>
        <div>
          {tab === "Overview" && (
            <div style={{ display: "grid", gap: 20 }}>
              <div className="grid-4">
                <div className="panel panel-pad stat"><div className="label">Registered traders</div><div className="value">3,912</div><div className="delta up">+171 this week</div></div>
                <div className="panel panel-pad stat"><div className="label">Active demo accounts</div><div className="value">1,284</div><div className="delta dim">December Futures Cup</div></div>
                <div className="panel panel-pad stat"><div className="label">Revenue this month</div><div className="value">$8,420</div><div className="delta up">+32% vs October</div></div>
                <div className="panel panel-pad stat"><div className="label">Paying members</div><div className="value">486</div><div className="delta dim">Silver 210 · Gold 221 · VIP 55</div></div>
              </div>
              <div className="panel panel-pad">
                <h2 className="h3">New sign-ups per day</h2>
                <LineChart data={signups} height={200} />
              </div>
            </div>
          )}

          {tab === "Fair play" && (
            <div style={{ display: "grid", gap: 14 }}>
              <p className="muted" style={{ margin: 0 }}>Flags come from Cloudflare (IP, VPN, device) and our trade analysis (mirrored entries, bot timing). Nothing is removed automatically: you decide.</p>
              {flags.length === 0 && <div className="panel panel-pad muted">No open flags. New flags appear here as soon as they're detected.</div>}
              {flags.map((f) => (
                <div key={f.id} className="panel panel-pad flag">
                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <span className={`pill ${f.severity === "High" ? "bad" : "warn"}`}>{f.severity}</span>
                    <b>{f.type}</b>
                    <span className="dim" style={{ marginLeft: "auto", fontSize: 13 }}>{f.id} · {f.time}</span>
                  </div>
                  <p className="muted" style={{ margin: "10px 0" }}>{f.detail}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
                    {f.accounts.map((a) => <span key={a} className="pill">@{a}</span>)}
                    <span style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
                      <button className="btn btn-ghost btn-sm" onClick={() => resolve(f.id, "dismissed")}>Dismiss</button>
                      <button className="btn btn-sm" style={{ background: "var(--loss)", color: "#200" }} onClick={() => resolve(f.id, "accounts disqualified")}>Disqualify</button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {tab === "Competitions" && (
            <div className="panel">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--line)" }}>
                <h2 className="h3" style={{ margin: 0 }}>Competitions</h2>
                <button className="btn btn-pulse btn-sm" onClick={() => show("New competition drafted. Set the rules, dates and prize, then publish.")}>New competition</button>
              </div>
              <div className="table-wrap"><table className="table">
                <thead><tr><th>Name</th><th>Status</th><th>Dates</th><th className="num">Traders</th><th>Prize</th><th></th></tr></thead>
                <tbody>{competitions.map((c) => (
                  <tr key={c.id}><td>{c.name}</td><td><span className={`pill ${c.status === "Live" ? "live" : ""}`}>{c.status}</span></td><td className="dim">{c.starts} – {c.ends}</td><td className="num">{c.entrants.toLocaleString()}</td><td>{c.prize}</td><td className="num"><button className="btn btn-ghost btn-sm" onClick={() => show(`Editing ${c.name}`)}>Edit</button></td></tr>
                ))}</tbody>
              </table></div>
            </div>
          )}

          {tab === "Users" && (
            <div className="panel"><div className="table-wrap"><table className="table">
              <thead><tr><th>Trader</th><th>Plan</th><th>Country</th><th className="num">Demo account</th><th className="num">Status</th></tr></thead>
              <tbody>{leaderboard.map((t, i) => (
                <tr key={t.handle}><td>{t.name}<div className="dim" style={{ fontSize: 12.5 }}>@{t.handle}</div></td><td><span className={`tier tier-${t.tier}`}>{t.tier}</span></td><td>{t.country}</td><td className="num dim">#4812{(t.rank * 1371) % 10000}</td><td className="num">{i === 11 ? <span className="pill warn">Under review</span> : <span className="pill live">Active</span>}</td></tr>
              ))}</tbody>
            </table></div></div>
          )}

          {tab === "Payments" && (
            <div className="panel"><div className="table-wrap"><table className="table">
              <thead><tr><th>ID</th><th>Customer</th><th>Item</th><th>Method</th><th className="num">Amount</th><th className="num">Status</th></tr></thead>
              <tbody>{payments.map((p) => (
                <tr key={p.id}><td className="dim">{p.id}</td><td>{p.user}</td><td>{p.item}</td><td>{p.method}</td><td className="num">${p.amount}</td><td className="num"><span className={`pill ${p.status === "Paid" ? "live" : "warn"}`}>{p.status}</span></td></tr>
              ))}</tbody>
            </table></div></div>
          )}

          {tab === "Content" && (
            <div className="grid-2">
              <div className="panel panel-pad">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2 className="h3" style={{ margin: 0 }}>Courses</h2><button className="btn btn-pulse btn-sm" onClick={() => show("Upload videos and PDFs to create a new course.")}>New course</button></div>
                {courses.map((c) => <div key={c.id} className="row-item" style={{ marginTop: 10 }}><span>{c.title}</span><span className="dim">{c.price ? `$${c.price}` : "Free"}</span></div>)}
              </div>
              <div className="panel panel-pad">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><h2 className="h3" style={{ margin: 0 }}>Products</h2><button className="btn btn-pulse btn-sm" onClick={() => show("Add a product with price, images and files.")}>New product</button></div>
                {products.map((p) => <div key={p.id} className="row-item" style={{ marginTop: 10 }}><span>{p.name}</span><span className="dim">${p.price}</span></div>)}
              </div>
            </div>
          )}
        </div>
      </div>
      {node}
    </div>
  );
}
