"use client";
import { useEffect, useRef } from "react";

/**
 * Cinematic black-and-white hero background:
 * the camera glides forward over a perspective grid floor while
 * candlestick "towers" rise out of the ground like a market skyline.
 * Respects prefers-reduced-motion (renders a single still frame).
 */
export default function HeroScene() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0, t0 = 0;

    // Candles placed on a 3D grid (x across, z depth)
    let seed = 42;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    type Candle = { x: number; z: number; body: number; wick: number; up: boolean; base: number };
    const candles: Candle[] = [];
    const DEPTH = 60;
    for (let i = 0; i < 150; i++) {
      const lane = Math.floor(rnd() * 14) - 7;
      if (lane >= -2 && lane <= 1) continue; // keep a clear runway in the middle
      candles.push({
        x: lane * 2.2 + (rnd() - 0.5) * 0.6,
        z: rnd() * DEPTH + 2,
        body: 0.6 + rnd() * 3.4,
        wick: 0.3 + rnd() * 1.2,
        up: rnd() > 0.38,
        base: rnd() * 0.8,
      });
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (now: number) => {
      if (!t0) t0 = now;
      const t = reduce ? 4 : (now - t0) / 1000;
      const speed = 2.2; // units per second
      const travel = t * speed;
      const horizon = h * 0.46;
      const f = Math.min(w, h * 1.6) * 0.9; // focal length
      const camH = 2.4 + Math.sin(t * 0.35) * 0.25; // gentle bob
      const camX = Math.sin(t * 0.18) * 1.2; // gentle sway
      const cx = w / 2;

      ctx.clearRect(0, 0, w, h);

      // Horizon glow
      const g = ctx.createRadialGradient(cx, horizon, 0, cx, horizon, w * 0.6);
      g.addColorStop(0, "rgba(255,255,255,0.16)");
      g.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const proj = (x: number, y: number, z: number) => ({
        sx: cx + ((x - camX) / z) * f,
        sy: horizon + ((camH - y) / z) * f,
      });

      // Floor grid: depth lines
      ctx.lineWidth = 1;
      const spacing = 2;
      const off = travel % spacing;
      for (let z = spacing - off; z < DEPTH; z += spacing) {
        const a = Math.max(0, 1 - z / DEPTH) * 0.35;
        const p1 = proj(-40, 0, z), p2 = proj(40, 0, z);
        ctx.strokeStyle = `rgba(255,255,255,${a})`;
        ctx.beginPath(); ctx.moveTo(p1.sx, p1.sy); ctx.lineTo(p2.sx, p2.sy); ctx.stroke();
      }
      // Floor grid: lanes converging to the vanishing point
      for (let x = -40; x <= 40; x += spacing) {
        const near = proj(x, 0, 0.6), far = proj(x, 0, DEPTH);
        const lg = ctx.createLinearGradient(near.sx, near.sy, far.sx, far.sy);
        lg.addColorStop(0, "rgba(255,255,255,0.22)");
        lg.addColorStop(1, "rgba(255,255,255,0)");
        ctx.strokeStyle = lg;
        ctx.beginPath(); ctx.moveTo(near.sx, near.sy); ctx.lineTo(far.sx, far.sy); ctx.stroke();
      }

      // Candles, far to near
      const items = candles
        .map((c) => {
          let z = c.z - (travel % DEPTH);
          if (z < 0.8) z += DEPTH;
          return { c, z };
        })
        .sort((a, b) => b.z - a.z);

      for (const { c, z } of items) {
        const fade = Math.min(1, (DEPTH - z) / 14) * Math.max(0, Math.min(1, (z - 4) / 6));
        if (fade <= 0) continue;
        // rise out of the ground as they approach
        const rise = Math.min(1, Math.max(0, (DEPTH - z) / 22));
        const bottom = c.base * rise;
        const top = bottom + c.body * rise;
        const half = 0.32;
        const pb = proj(c.x, bottom, z), pt = proj(c.x, top, z);
        const wt = proj(c.x, top + c.wick * rise, z), wb = proj(c.x, Math.max(0, bottom - c.wick * 0.4 * rise), z);
        const bw = (half / z) * f;
        // wick
        ctx.strokeStyle = `rgba(255,255,255,${0.55 * fade})`;
        ctx.lineWidth = Math.max(1, (0.05 / z) * f);
        ctx.beginPath(); ctx.moveTo(pt.sx, wt.sy); ctx.lineTo(pt.sx, wb.sy); ctx.stroke();
        // body
        const bh = Math.max(1, pb.sy - pt.sy);
        if (c.up) {
          const bg = ctx.createLinearGradient(0, pt.sy, 0, pb.sy);
          bg.addColorStop(0, `rgba(255,255,255,${0.95 * fade})`);
          bg.addColorStop(1, `rgba(150,150,150,${0.55 * fade})`);
          ctx.fillStyle = bg;
          ctx.fillRect(pt.sx - bw, pt.sy, bw * 2, bh);
        } else {
          ctx.fillStyle = `rgba(0,0,0,${0.9 * fade})`;
          ctx.fillRect(pt.sx - bw, pt.sy, bw * 2, bh);
          ctx.strokeStyle = `rgba(255,255,255,${0.6 * fade})`;
          ctx.lineWidth = Math.max(1, (0.035 / z) * f);
          ctx.strokeRect(pt.sx - bw, pt.sy, bw * 2, bh);
        }
        // reflection on the floor
        ctx.fillStyle = `rgba(255,255,255,${0.06 * fade})`;
        ctx.fillRect(pb.sx - bw, pb.sy, bw * 2, Math.min(bh * 0.6, (2.5 / z) * f));
      }

      // Pulse line racing along the horizon
      const px = ((t * 0.18) % 1.4 - 0.2) * w;
      const pg = ctx.createLinearGradient(px - 260, 0, px, 0);
      pg.addColorStop(0, "rgba(255,255,255,0)");
      pg.addColorStop(1, "rgba(255,255,255,0.9)");
      ctx.strokeStyle = pg;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = px - 260; x <= px; x += 3) {
        const k = ((x - px + 260) % 90);
        const y = horizon - (k > 60 && k < 66 ? -14 : k >= 66 && k < 72 ? 26 : 0);
        x === px - 260 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.stroke();

      if (!reduce) raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    // pause when hidden to save battery
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduce) { t0 = 0; raf = requestAnimationFrame(draw); }
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return <canvas ref={ref} className="hero-scene" aria-hidden />;
}
