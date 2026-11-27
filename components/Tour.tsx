"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

type Step = { route: string; title: string; body: string; img: string; points: string[] };

const steps: Step[] = [
  {
    route: "/",
    title: "Welcome to TradePulsie",
    body: "This quick tour walks you through every part of your platform. It takes about a minute, and you can skip it at any time.",
    img: "/photos/trader.jpg",
    points: ["Free monthly competitions", "Academy, store and memberships", "Community and admin tools"],
  },
  {
    route: "/competitions/december-futures-cup",
    title: "Competitions and leaderboards",
    body: "Traders join for free, get a broker demo account, and climb a leaderboard that updates automatically from the broker.",
    img: "/photos/competition.jpg",
    points: ["Prize, rules and countdown", "Podium for the top 3", "Return, win rate and drawdown for every trader"],
  },
  {
    route: "/dashboard",
    title: "Trader dashboard",
    body: "Every trader gets their own dashboard with live account stats, an equity curve, trade history and achievements.",
    img: "/photos/course-futures.jpg",
    points: ["Balance, equity and open P&L", "Win rate and profit factor", "Competition rankings and course progress"],
  },
  {
    route: "/academy",
    title: "Trading Academy",
    body: "Sell and teach courses with video lessons and PDFs. Free courses for everyone, premium courses for paying members.",
    img: "/photos/academy-video.jpg",
    points: ["Video player and lesson list", "Progress tracking", "Free and premium filters"],
  },
  {
    route: "/store",
    title: "Online store",
    body: "Sell ebooks, indicators, journals and merch. Try adding something to the cart and opening the checkout.",
    img: "/photos/product-journal.jpg",
    points: ["Cart and checkout", "Card, bank transfer and crypto", "Digital downloads after payment"],
  },
  {
    route: "/membership",
    title: "Memberships",
    body: "Free, Silver, Gold and VIP plans, each unlocking different benefits. Competitions stay free on every plan.",
    img: "/photos/coins.jpg",
    points: ["Monthly or yearly billing", "Comparison of what each plan includes", "Upgrade in one click"],
  },
  {
    route: "/community",
    title: "Community and live sessions",
    body: "Traders post, ask questions and celebrate wins. Live trading sessions happen right here instead of on Discord.",
    img: "/photos/community.jpg",
    points: ["Discussions and announcements", "Live session reminders", "Achievements and badges"],
  },
  {
    route: "/admin?tab=fair",
    title: "Admin and fair play",
    body: "You run everything from the admin dashboard. Suspicious activity like shared IPs, copy trading and bots is flagged for you to review.",
    img: "/photos/product-indicator.jpg",
    points: ["Users, competitions and payments", "Courses and products", "Fair-play flags with dismiss or disqualify"],
  },
  {
    route: "/",
    title: "That's your platform",
    body: "Everything you've seen runs on sample data for now. Next, we connect the database, payments and your broker so it all goes live.",
    img: "/photos/live-session.jpg",
    points: ["Click around freely", "Restart this tour from the banner at the top", "Send us any changes you'd like"],
  },
];

const KEY = "tp-tour-done";

export default function Tour() {
  const [i, setI] = useState<number | null>(null);
  const router = useRouter();
  const path = usePathname();

  useEffect(() => {
    let done = false;
    try { done = localStorage.getItem(KEY) === "1"; } catch {}
    let introSeen = false;
    try { introSeen = sessionStorage.getItem("tp-intro") === "1"; } catch {}
    const onIntro = () => { if (!done) setTimeout(() => setI(0), 4800); };
    if (!done) {
      if (window.location.pathname === "/" && !introSeen) window.addEventListener("tp-intro-done", onIntro, { once: true });
      else setI(0);
    }
    const open = () => { setI(0); router.push("/"); };
    window.addEventListener("tp-open-tour", open);
    return () => { window.removeEventListener("tp-open-tour", open); window.removeEventListener("tp-intro-done", onIntro); };
  }, [router]);

  useEffect(() => {
    if (i === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") finish();
      if (e.key === "ArrowRight") go(i + 1);
      if (e.key === "ArrowLeft") go(i - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const finish = () => {
    try { localStorage.setItem(KEY, "1"); } catch {}
    setI(null);
  };
  const go = (n: number) => {
    if (n < 0) return;
    if (n >= steps.length) return finish();
    setI(n);
    const r = steps[n].route;
    if (r !== path + (typeof window !== "undefined" ? window.location.search : "")) router.push(r);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (i === null) return null;
  const s = steps[i];
  const centered = i === 0 || i === steps.length - 1;

  return (
    <>
      {centered && <div className="tour-dim" onClick={finish} />}
      <div className={`tour ${centered ? "tour-center" : "tour-dock"}`} role="dialog" aria-modal={centered} aria-label="Platform tour">
        <div className="tour-img" style={{ backgroundImage: `url(${s.img})` }}>
          <span className="tour-count">{i + 1} of {steps.length}</span>
        </div>
        <div className="tour-body">
          <h2 className="display">{s.title}</h2>
          <p>{s.body}</p>
          <ul className="checks" style={{ margin: "0 0 18px" }}>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
          <div className="tour-dots" aria-hidden>
            {steps.map((_, n) => <button key={n} className={n === i ? "on" : ""} onClick={() => go(n)} tabIndex={-1} />)}
          </div>
          <div className="tour-actions">
            <button className="tour-skip" onClick={finish}>{i === steps.length - 1 ? "Close" : "Skip tour"}</button>
            <div style={{ display: "flex", gap: 8 }}>
              {i > 0 && <button className="btn btn-ghost btn-sm" onClick={() => go(i - 1)}>Back</button>}
              <button className="btn btn-pulse btn-sm" onClick={() => go(i + 1)} autoFocus>
                {i === 0 ? "Start the tour" : i === steps.length - 1 ? "Explore on my own" : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
