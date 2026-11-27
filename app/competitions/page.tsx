import Link from "next/link";
import { competitions } from "@/lib/data";

export const metadata = { title: "Competitions · TradePulsie" };

export default function Competitions() {
  return (
    <div className="wrap">
      <div className="page-head">
        <h1 className="h1 display">Competitions</h1>
        <p className="lead">Every competition is free to enter. You trade a broker demo account, and your results are tracked automatically.</p>
      </div>
      <div className="grid-2" style={{ paddingBottom: 40 }}>
        {competitions.map((c) => (
          <Link key={c.id} href={`/competitions/${c.id}`} className="panel panel-pad comp-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className={`pill ${c.status === "Live" ? "live" : c.status === "Finished" ? "" : "warn"}`}>{c.status}</span>
              <span className="dim" style={{ fontSize: 13.5 }}>{c.starts} – {c.ends}</span>
            </div>
            <h2 className="h2 display" style={{ fontSize: 26, marginTop: 18 }}>{c.name}</h2>
            <p className="muted" style={{ margin: "0 0 20px" }}>{c.market}</p>
            <div className="comp-meta">
              <div><span className="dim">Prize</span><b className="up">{c.prize}</b></div>
              <div><span className="dim">Account</span><b>{c.capital}</b></div>
              <div><span className="dim">Traders</span><b>{c.entrants.toLocaleString()}</b></div>
              <div><span className="dim">Entry</span><b>{c.entry}</b></div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
