import { notFound } from "next/navigation";
import { competitions, leaderboard } from "@/lib/data";
import Leaderboard from "@/components/Leaderboard";
import Countdown from "@/components/Countdown";
import JoinButton from "./JoinButton";

export function generateStaticParams() {
  return competitions.map((c) => ({ id: c.id }));
}

export default async function CompetitionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const c = competitions.find((x) => x.id === id);
  if (!c) notFound();
  const top = leaderboard.slice(0, 3);
  return (
    <div className="wrap">
      <div className="page-head">
        <span className={`pill ${c.status === "Live" ? "live" : c.status === "Finished" ? "" : "warn"}`}>{c.status}</span>
        <h1 className="h1 display" style={{ marginTop: 16 }}>{c.name}</h1>
        <p className="lead">{c.market} · {c.capital} broker demo account · {c.starts} – {c.ends}</p>
      </div>

      <div className="comp-top">
        <div className="panel panel-pad">
          <div className="dim" style={{ fontSize: 13 }}>Prize</div>
          <div className="display up" style={{ fontSize: 24, fontWeight: 600 }}>{c.prize}</div>
          <div style={{ marginTop: 18 }} className="dim">{c.status === "Live" ? "Ends in" : c.status === "Finished" ? "Finished" : "Starts in"}</div>
          {c.status !== "Finished" && <Countdown to={c.status === "Live" ? "2026-12-15T23:59:59Z" : "2027-01-05T00:00:00Z"} />}
          <div style={{ marginTop: 22 }}><JoinButton status={c.status} name={c.name} /></div>
        </div>
        <div className="panel panel-pad">
          <h3 className="h3">Rules</h3>
          <ul className="checks" style={{ marginBottom: 0 }}>{c.rules.map((r) => <li key={r}>{r}</li>)}</ul>
        </div>
        <div className="panel panel-pad podium">
          {top.map((t) => (
            <div key={t.handle} className={`pod pod-${t.rank}`}>
              <span className="avatar">{t.name.split(" ").map((p) => p[0]).join("").slice(0, 2)}</span>
              <b>{t.name.split(" ")[0]}</b>
              <span className="up">+{t.pnlPct}%</span>
              <div className="pod-bar"><span className={`rank-badge rank-${t.rank}`}>{t.rank}</span></div>
            </div>
          ))}
        </div>
      </div>

      <div className="panel" style={{ marginTop: 20, marginBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 20px", borderBottom: "1px solid var(--line)", flexWrap: "wrap", gap: 10 }}>
          <h2 className="h3" style={{ margin: 0 }}>Leaderboard</h2>
          <span className="dim" style={{ fontSize: 13 }}>Synced from the broker every 60 seconds · {c.entrants.toLocaleString()} traders</span>
        </div>
        <Leaderboard rows={leaderboard} highlight="jaden" />
      </div>
    </div>
  );
}
