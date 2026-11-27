import Link from "next/link";
import { LineChart, Donut, Bars } from "@/components/Charts";
import { equityCurve, myTrades, competitions, achievements, courses } from "@/lib/data";

export const metadata = { title: "Dashboard · TradePulsie" };

export default function Dashboard() {
  const curve = equityCurve(60, 10000, 7);
  const equity = curve[curve.length - 1];
  const pnl = equity - 10000;
  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-head dash-head">
        <div className="who">
          <span className="avatar" style={{ width: 52, height: 52, fontSize: 17 }}>JJ</span>
          <div>
            <h1 className="display" style={{ fontSize: 30, margin: 0 }}>Welcome back, Joseph</h1>
            <span className="muted">VIP member · Rank #10 in the December Futures Cup</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span className="pill live">Broker account connected · Demo #48120931</span>
        </div>
      </div>

      <div className="grid-4">
        <div className="panel panel-pad stat"><div className="label">Balance</div><div className="value">$10,497.00</div><div className="delta up">+$497.00 this competition</div></div>
        <div className="panel panel-pad stat"><div className="label">Equity</div><div className="value">${equity.toLocaleString()}.00</div><div className={`delta ${pnl >= 0 ? "up" : "down"}`}>{pnl >= 0 ? "+" : ""}{(pnl / 100).toFixed(2)}% all time</div></div>
        <div className="panel panel-pad stat"><div className="label">Open profit and loss</div><div className="value up">+$56.50</div><div className="delta dim">1 open position</div></div>
        <div className="panel panel-pad stat"><div className="label">Max drawdown</div><div className="value">1.9%</div><div className="delta dim">Limit 10% · Daily limit 5%</div></div>
      </div>

      <div className="dash-grid">
        <div className="panel panel-pad">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <h2 className="h3" style={{ margin: 0 }}>Equity curve</h2>
            <span className="dim" style={{ fontSize: 13 }}>Last 60 trading sessions</span>
          </div>
          <LineChart data={curve} height={240} />
        </div>
        <div className="panel panel-pad" style={{ display: "grid", gap: 18, alignContent: "start" }}>
          <h2 className="h3" style={{ margin: 0 }}>Trading stats</h2>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <Donut value={63} label="Win rate" />
            <div style={{ display: "grid", gap: 8, fontSize: 14 }}>
              <div><span className="dim">Trades</span> <b>22</b></div>
              <div><span className="dim">Avg win</span> <b className="up">$118.40</b></div>
              <div><span className="dim">Avg loss</span> <b className="down">−$61.20</b></div>
              <div><span className="dim">Profit factor</span> <b>1.93</b></div>
            </div>
          </div>
          <div>
            <div className="dim" style={{ fontSize: 13, marginBottom: 8 }}>Profit by weekday</div>
            <Bars data={[132, -95, 291, 56, 113]} labels={["Mon", "Tue", "Wed", "Thu", "Fri"]} />
          </div>
        </div>
      </div>

      <div className="dash-grid" style={{ gridTemplateColumns: "1.6fr 1fr" }}>
        <div className="panel">
          <div style={{ padding: "18px 20px", borderBottom: "1px solid var(--line)" }}><h2 className="h3" style={{ margin: 0 }}>Trade history</h2></div>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>Time</th><th>Symbol</th><th>Side</th><th>Size</th><th className="num">Open</th><th className="num">Close</th><th className="num">Profit</th></tr></thead>
              <tbody>
                {myTrades.map((t) => (
                  <tr key={t.id}>
                    <td className="dim">{t.time}</td><td><b style={{ fontWeight: 500 }}>{t.symbol}</b></td>
                    <td className={t.side === "Buy" ? "up" : "down"}>{t.side}</td><td>{t.size}</td>
                    <td className="num">{t.open}</td><td className="num">{t.close}</td>
                    <td className={`num ${t.pnl >= 0 ? "up" : "down"}`}>{t.pnl >= 0 ? "+" : "−"}${Math.abs(t.pnl).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div style={{ display: "grid", gap: 20, alignContent: "start" }}>
          <div className="panel panel-pad">
            <h2 className="h3">My competitions</h2>
            {competitions.slice(0, 3).map((c, i) => (
              <Link key={c.id} href={`/competitions/${c.id}`} className="row-item" style={{ marginTop: 10 }}>
                <div><b style={{ fontWeight: 500 }}>{c.name}</b><div className="dim" style={{ fontSize: 13 }}>{c.status}</div></div>
                <b className={i === 0 ? "up" : "dim"}>{i === 0 ? "#10" : "Registered"}</b>
              </Link>
            ))}
            <div className="row-item" style={{ marginTop: 10 }}>
              <div><b style={{ fontWeight: 500 }}>October Open</b><div className="dim" style={{ fontSize: 13 }}>Finished</div></div>
              <b>#24 of 1,037</b>
            </div>
          </div>
          <div className="panel panel-pad">
            <h2 className="h3">Course progress</h2>
            {courses.filter((c) => c.progress).map((c) => (
              <div key={c.id} style={{ marginTop: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 6 }}><span>{c.title}</span><span className="dim">{c.progress}%</span></div>
                <div className="bar"><i style={{ width: `${c.progress}%` }} /></div>
              </div>
            ))}
          </div>
          <div className="panel panel-pad">
            <h2 className="h3">Achievements</h2>
            <div className="badges">
              {achievements.map((a) => <span key={a.name} className={`badge ${a.got ? "got" : ""}`}>{a.name}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
