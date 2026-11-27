"use client";
import { useEffect, useState } from "react";

const LINES = ["Trade free.", "Climb the board.", "Get funded."];
const TOTAL = LINES.join("").length;

/**
 * The opening moment on the homepage:
 * 1. Logo reveal with a light sweep (once per browser session, click to skip)
 * 2. Headline types itself out with a blinking cursor
 * 3. Stat cards and buttons fade in
 */
export function IntroOverlay() {
  const [phase, setPhase] = useState<"show" | "leave" | "gone">("gone");
  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("tp-intro") === "1"; } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) { window.dispatchEvent(new Event("tp-intro-done")); return; }
    setPhase("show");
    const a = setTimeout(() => setPhase("leave"), 2300);
    const b = setTimeout(() => {
      setPhase("gone");
      try { sessionStorage.setItem("tp-intro", "1"); } catch {}
      window.dispatchEvent(new Event("tp-intro-done"));
    }, 3000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);
  if (phase === "gone") return null;
  const skip = () => {
    setPhase("gone");
    try { sessionStorage.setItem("tp-intro", "1"); } catch {}
    window.dispatchEvent(new Event("tp-intro-done"));
  };
  return (
    <div className={`intro ${phase === "leave" ? "leave" : ""}`} onClick={skip} role="presentation">
      <div className="intro-logo">
        <img src="/logo.png" alt="TradePulsie" />
        <span className="intro-shine" />
      </div>
      <div className="intro-line" />
    </div>
  );
}

export function TypedHeadline() {
  const [n, setN] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { setN(TOTAL); setStarted(true); return; }
    const start = () => setStarted(true);
    window.addEventListener("tp-intro-done", start);
    let seen = false;
    try { seen = sessionStorage.getItem("tp-intro") === "1"; } catch {}
    const fallback = setTimeout(start, seen ? 150 : 3200);
    return () => { window.removeEventListener("tp-intro-done", start); clearTimeout(fallback); };
  }, []);
  useEffect(() => {
    if (!started || n >= TOTAL) return;
    const id = setTimeout(() => setN((v) => v + 1), 55);
    return () => clearTimeout(id);
  }, [started, n]);

  let left = n;
  const done = n >= TOTAL;
  return (
    <h1 className="h1 display hero-title" aria-label={LINES.join(" ")}>
      {LINES.map((line, i) => {
        const shown = line.slice(0, Math.max(0, Math.min(line.length, left)));
        const isCursorLine = !done && left >= 0 && left <= line.length;
        left -= line.length;
        return (
          <span key={i} className="type-line" aria-hidden>
            {shown}
            {isCursorLine && <span className="caret" />}
            {done && i === LINES.length - 1 && <span className="caret blink" />}
            <span className="ghost">{line.slice(shown.length)}</span>
          </span>
        );
      })}
      <span className={`hero-reveal-flag ${done ? "on" : ""}`} />
    </h1>
  );
}
