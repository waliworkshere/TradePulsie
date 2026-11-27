import Link from "next/link";
import PulseCanvas from "@/components/PulseCanvas";
import Leaderboard from "@/components/Leaderboard";
import Countdown from "@/components/Countdown";
import { leaderboard, competitions, courses, tiers, products } from "@/lib/data";

export default function Home() {
  const live = competitions[0];
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-inner">
          <span className="pill live">December Futures Cup is live · 1,284 traders</span>
          <h1 className="h1 display hero-title">
            Trade free.<br />Climb the board.<br />Get funded.
          </h1>
          <p className="lead">
            Monthly trading competitions on real broker demo accounts, with no entry fee. Learn from traders who get paid by
            prop firms, and turn your results into a funded account.
          </p>
          <div className="hero-cta">
            <Link href="/register" className="btn btn-pulse">Join the next competition</Link>
            <Link href="/competitions/december-futures-cup" className="btn btn-ghost">See the live leaderboard</Link>
          </div>
        </div>
        <div className="hero-canvas"><PulseCanvas /></div>
      </section>

      {/* LIVE COMPETITION */}
      <section className="section-tight">
        <div className="wrap">
          <div className="panel live-card">
            <div className="live-left">
              <span className="pill live">Live now</span>
              <h2 className="h2 display" style={{ marginTop: 14 }}>{live.name}</h2>
              <p className="muted" style={{ margin: "0 0 22px" }}>{live.market} · {live.capital} account · Entry: {live.entry}</p>
              <div className="live-prize">
                <div>
                  <div className="dim" style={{ fontSize: 13 }}>Prize</div>
                  <div className="display" style={{ fontSize: 22, fontWeight: 600, color: "var(--pulse)" }}>{live.prize}</div>
                </div>
                <div>
                  <div className="dim" style={{ fontSize: 13, marginBottom: 4 }}>Ends in</div>
                  <Countdown to="2026-12-15T23:59:59Z" />
                </div>
              </div>
              <Link href={`/competitions/${live.id}`} className="btn btn-pulse" style={{ marginTop: 26 }}>View full leaderboard</Link>
            </div>
            <div className="live-right">
              <Leaderboard rows={leaderboard.slice(0, 5)} compact />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — a real sequence */}
      <section className="section">
        <div className="wrap">
          <h2 className="h2 display" style={{ maxWidth: 640 }}>From sign-up to funded in four steps</h2>
          <div className="steps">
            {[
              ["Create one account", "One login for competitions, courses, the store and the community."],
              ["Get your demo account", "We give you a broker demo account for the competition, ready to trade on MT5 or Match-Trader."],
              ["Trade and climb", "Every trade is tracked automatically. Return, win rate and drawdown update on the leaderboard."],
              ["Win a funded account", "Top traders win funded accounts, cash prizes and memberships at the end of each month."],
            ].map(([t, d], i) => (
              <div className="step" key={t}>
                <div className="step-n display">{i + 1}</div>
                <h3 className="h3">{t}</h3>
                <p className="muted" style={{ margin: 0 }}>{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ACADEMY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="split-head">
            <div>
              <h2 className="h2 display">Learn the way funded traders learn</h2>
              <p className="lead">Free foundations for every member, premium courses when you're ready. Video lessons, PDFs and progress tracking.</p>
            </div>
            <Link href="/academy" className="btn btn-ghost">Browse the Academy</Link>
          </div>
          <div className="grid-3" style={{ marginTop: 32 }}>
            {courses.slice(0, 3).map((c) => (
              <Link href="/academy" key={c.id} className="panel panel-pad course-card">
                <div className="course-thumb"><span>{c.level}</span></div>
                <h3 className="h3">{c.title}</h3>
                <p className="muted" style={{ margin: "0 0 14px", fontSize: 14.5 }}>{c.blurb}</p>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13.5 }}>
                  <span className="dim">{c.lessons} lessons · {c.hours} h</span>
                  <b className={c.price ? "" : "up"}>{c.price ? `$${c.price}` : "Free"}</b>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MEMBERSHIP */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="h2 display">Choose how far you want to go</h2>
          <p className="lead">Competitions stay free on every plan. Upgrade for premium courses, live sessions and mentorship.</p>
          <div className="grid-4" style={{ marginTop: 32 }}>
            {tiers.map((t) => (
              <div key={t.name} className={`panel panel-pad tier-card ${t.highlight ? "hl" : ""}`}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3 className="h3 display">{t.name}</h3>
                  {t.highlight && <span className="pill live" style={{ fontSize: 11 }}>Most popular</span>}
                </div>
                <div className="display" style={{ fontSize: 34, fontWeight: 600, margin: "10px 0 2px" }}>
                  {t.price ? `$${t.price}` : "$0"}
                  <span className="dim" style={{ fontSize: 14, fontFamily: "var(--font-body)", fontWeight: 400 }}> /month</span>
                </div>
                <ul className="checks">{t.perks.map((p) => <li key={p}>{p}</li>)}</ul>
                <Link href="/membership" className={`btn ${t.highlight ? "btn-pulse" : "btn-ghost"} btn-block`}>
                  {t.price ? `Get ${t.name}` : "Start free"}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STORE + COMMUNITY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap grid-2">
          <div className="panel panel-pad">
            <h2 className="h2 display" style={{ fontSize: 28 }}>Tools traders actually use</h2>
            <p className="muted">Journals, indicators, ebooks and merch, paid by card, bank transfer or crypto.</p>
            <div style={{ display: "grid", gap: 10, marginTop: 18 }}>
              {products.slice(0, 4).map((p) => (
                <div key={p.id} className="row-item">
                  <div><b style={{ fontWeight: 500 }}>{p.name}</b><div className="dim" style={{ fontSize: 13 }}>{p.type}</div></div>
                  <b>${p.price}</b>
                </div>
              ))}
            </div>
            <Link href="/store" className="btn btn-ghost" style={{ marginTop: 18 }}>Open the store</Link>
          </div>
          <div className="panel panel-pad">
            <h2 className="h2 display" style={{ fontSize: 28 }}>Live sessions and a real community</h2>
            <p className="muted">Trade alongside Joseph in live sessions, share your wins, and ask questions without leaving the site.</p>
            <div className="live-session">
              <span className="pill live">Live session · Thursday 15:30 GMT</span>
              <h3 className="h3" style={{ marginTop: 12 }}>New York open: trading NQ with a 1% risk rule</h3>
              <p className="dim" style={{ margin: 0, fontSize: 14 }}>Gold and VIP members · 312 reminders set</p>
            </div>
            <Link href="/community" className="btn btn-ghost" style={{ marginTop: 18 }}>Join the community</Link>
          </div>
        </div>
      </section>

      {/* FAIR PLAY */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="panel panel-pad fairplay">
            <div>
              <h2 className="h2 display" style={{ fontSize: 30 }}>Fair play, checked automatically</h2>
              <p className="muted" style={{ margin: 0 }}>
                Every result comes straight from the broker, not from screenshots. We flag shared IP addresses, mirrored trades and bot-like
                order timing, and our team reviews every flag before prizes are paid.
              </p>
            </div>
            <ul className="checks" style={{ margin: 0 }}>
              <li>Broker-verified results</li>
              <li>Shared IP and VPN detection</li>
              <li>Copy-trading detection</li>
              <li>Bot and EA detection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="wrap cta">
          <h2 className="h1 display" style={{ fontSize: "clamp(34px,5vw,64px)" }}>The January FX Sprint opens on 5 January.</h2>
          <p className="lead" style={{ margin: "18px auto 28px" }}>Create your free account now and you'll get your demo account the day it starts.</p>
          <Link href="/register" className="btn btn-pulse">Create my free account</Link>
        </div>
      </section>
    </>
  );
}
