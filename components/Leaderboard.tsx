import { Trader } from "@/lib/data";

export default function Leaderboard({ rows, compact = false, highlight }: { rows: Trader[]; compact?: boolean; highlight?: string }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 56 }}>Rank</th>
            <th>Trader</th>
            <th className="num">Return</th>
            <th className="num m-hide">Profit</th>
            {!compact && <th className="num m-hide">Win rate</th>}
            {!compact && <th className="num m-hide">Max drawdown</th>}
            {!compact && <th className="num m-hide">Trades</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.handle} style={t.handle === highlight ? { background: "rgba(255,255,255,.06)" } : undefined}>
              <td><span className={`rank-badge rank-${t.rank}`}>{t.rank}</span></td>
              <td>
                <div className="who">
                  <span className="avatar m-hide">{t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</span>
                  <div>
                    <span className="lb-name">{t.name}</span> <span className="cc m-hide">{t.country}</span>{" "}
                    <span className={`tier tier-${t.tier} m-hide`}>{t.tier}</span>
                    <small>@{t.handle}</small>
                    <small className="m-only">${t.pnl.toLocaleString()} profit{compact ? "" : ` · ${t.winRate}% win · ${t.drawdown.toFixed(1)}% DD`}</small>
                  </div>
                </div>
              </td>
              <td className="num up">+{t.pnlPct.toFixed(2)}%</td>
              <td className="num m-hide">${t.pnl.toLocaleString()}</td>
              {!compact && <td className="num m-hide">{t.winRate}%</td>}
              {!compact && <td className={`num m-hide ${t.drawdown > 6 ? "down" : ""}`}>{t.drawdown.toFixed(1)}%</td>}
              {!compact && <td className="num m-hide">{t.trades}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
