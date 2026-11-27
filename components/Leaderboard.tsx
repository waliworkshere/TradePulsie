import { Trader, flagEmoji } from "@/lib/data";

export default function Leaderboard({ rows, compact = false, highlight }: { rows: Trader[]; compact?: boolean; highlight?: string }) {
  return (
    <div className="table-wrap">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: 56 }}>Rank</th>
            <th>Trader</th>
            <th className="num">Return</th>
            <th className="num">Profit</th>
            {!compact && <th className="num">Win rate</th>}
            {!compact && <th className="num">Max drawdown</th>}
            {!compact && <th className="num">Trades</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((t) => (
            <tr key={t.handle} style={t.handle === highlight ? { background: "rgba(62,224,90,.07)" } : undefined}>
              <td><span className={`rank-badge rank-${t.rank}`}>{t.rank}</span></td>
              <td>
                <div className="who">
                  <span className="avatar">{t.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}</span>
                  <div>
                    {t.name} <span aria-label={t.country}>{flagEmoji(t.country)}</span>{" "}
                    <span className={`tier tier-${t.tier}`}>{t.tier}</span>
                    <small>@{t.handle}</small>
                  </div>
                </div>
              </td>
              <td className="num up">+{t.pnlPct.toFixed(2)}%</td>
              <td className="num">${t.pnl.toLocaleString()}</td>
              {!compact && <td className="num">{t.winRate}%</td>}
              {!compact && <td className={`num ${t.drawdown > 6 ? "down" : ""}`}>{t.drawdown.toFixed(1)}%</td>}
              {!compact && <td className="num">{t.trades}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
