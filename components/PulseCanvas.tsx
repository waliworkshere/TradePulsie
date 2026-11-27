"use client";
import { useEffect, useRef } from "react";

/**
 * The hero's signature moment: a heartbeat line sweeps in from the left,
 * and as it crosses the screen the beats turn into rising candlesticks.
 * Pulse → price. Respects prefers-reduced-motion (draws the final frame).
 */
export default function PulseCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = 1, raf = 0, start = 0;

    // Pre-compute candles
    let seed = 11;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const candles: { o: number; c: number; hi: number; lo: number }[] = [];
    let price = 0.62;
    for (let i = 0; i < 46; i++) {
      const o = price;
      const c = o + (rnd() - 0.36) * 0.06;
      const hi = Math.max(o, c) + rnd() * 0.03;
      const lo = Math.min(o, c) - rnd() * 0.03;
      candles.push({ o, c, hi, lo });
      price = c;
    }

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const heartbeat = (x: number) => {
      // returns y offset (−1..1) for an ECG-style beat every 220px
      const period = 220;
      const p = ((x % period) + period) % period;
      if (p < 120) return 0;
      if (p < 130) return -0.12;
      if (p < 140) return 0.18;
      if (p < 150) return -1;
      if (p < 160) return 0.55;
      if (p < 172) return -0.1;
      return 0;
    };

    const draw = (t: number) => {
      if (!start) start = t;
      const elapsed = reduce ? 99999 : t - start;
      const head = Math.min(1, elapsed / 3200); // sweep progress
      const morphX = w * 0.42; // where pulse becomes price
      ctx.clearRect(0, 0, w, h);

      const mid = h * 0.62;
      const amp = Math.min(90, h * 0.22);
      const headX = head * w;

      // Pulse line (left part)
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#3ee05a";
      ctx.shadowColor = "rgba(62,224,90,.8)";
      ctx.shadowBlur = 14;
      ctx.beginPath();
      const endPulse = Math.min(headX, morphX);
      for (let x = 0; x <= endPulse; x += 2) {
        const y = mid + heartbeat(x + 60) * amp;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Candles (right part) appear as the head passes
      ctx.shadowBlur = 0;
      const area = w - morphX;
      const cw = area / candles.length;
      const top = h * 0.12, bottom = h * 0.9;
      const yOf = (v: number) => bottom - (v - 0.2) * (bottom - top) * 1.15;
      candles.forEach((c, i) => {
        const x = morphX + i * cw + cw / 2;
        if (x > headX) return;
        const fade = Math.min(1, (headX - x) / 120);
        const up = c.c >= c.o;
        ctx.globalAlpha = fade;
        ctx.strokeStyle = up ? "#3ee05a" : "#ff5468";
        ctx.fillStyle = up ? "#3ee05a" : "#ff5468";
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(x, yOf(c.hi));
        ctx.lineTo(x, yOf(c.lo));
        ctx.stroke();
        const y1 = yOf(Math.max(c.o, c.c)), y2 = yOf(Math.min(c.o, c.c));
        ctx.fillRect(x - cw * 0.3, y1, cw * 0.6, Math.max(2, y2 - y1));
      });
      ctx.globalAlpha = 1;

      // Connector from pulse into first candle
      if (headX > morphX) {
        ctx.strokeStyle = "rgba(62,224,90,.5)";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(morphX, mid);
        ctx.lineTo(morphX + cw / 2, yOf(candles[0].o));
        ctx.stroke();
      }

      // Glowing head dot
      if (head < 1) {
        const y = headX < morphX ? mid + heartbeat(headX + 60) * amp : yOf(candles[Math.min(candles.length - 1, Math.floor((headX - morphX) / cw))].c);
        ctx.fillStyle = "#c9ffd3";
        ctx.shadowColor = "#3ee05a";
        ctx.shadowBlur = 24;
        ctx.beginPath();
        ctx.arc(headX, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (head < 1) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => { start = 0; cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="pulse-canvas" aria-hidden />;
}
