"use client";
import { useState } from "react";
import { courses } from "@/lib/data";
import { useToast } from "@/components/Toast";

export default function Academy() {
  const [filter, setFilter] = useState<"All" | "Free" | "Premium">("All");
  const [open, setOpen] = useState<string | null>("trading-foundations");
  const { show, node } = useToast();
  const list = courses.filter((c) => filter === "All" || (filter === "Free" ? !c.price : c.price));
  const active = courses.find((c) => c.id === open);
  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-head">
        <h1 className="h1 display">Academy</h1>
        <p className="lead">Video lessons, PDFs and quizzes from traders who pass prop firm challenges. Free courses for everyone, premium courses with membership or a one-time purchase.</p>
      </div>

      {active && (
        <div className="panel player">
          <div className="video">
            <div className="video-inner">
              <button className="play" aria-label="Play lesson" onClick={() => show("Lesson playback is enabled once videos are uploaded in the admin panel.")}>▶</button>
              <div className="video-cap">
                <span className="dim" style={{ fontSize: 13 }}>Lesson 4 of {active.lessons}</span>
                <b>Order types: market, limit and stop</b>
              </div>
            </div>
          </div>
          <div className="lessons">
            <h2 className="h3">{active.title}</h2>
            <p className="dim" style={{ marginTop: 0, fontSize: 14 }}>{active.instructor} · {active.hours} hours</p>
            {["What moves the markets", "Reading a price chart", "Leverage and margin", "Order types: market, limit and stop", "Your first trading plan", "Workbook (PDF)"].map((l, i) => (
              <div key={l} className={`lesson ${i === 3 ? "on" : ""} ${i < 3 ? "done" : ""}`}>
                <span>{i < 3 ? "✓" : i + 1}</span>{l}
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "40px 0 20px", gap: 16, flexWrap: "wrap" }}>
        <h2 className="h2 display" style={{ margin: 0, fontSize: 28 }}>All courses</h2>
        <div className="tabs">
          {(["All", "Free", "Premium"] as const).map((f) => (
            <button key={f} className={filter === f ? "on" : ""} onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>
      <div className="grid-3">
        {list.map((c) => (
          <div key={c.id} className="panel panel-pad course-card">
            <div className="course-thumb"><span>{c.level}</span></div>
            <h3 className="h3">{c.title}</h3>
            <p className="muted" style={{ margin: "0 0 14px", fontSize: 14.5 }}>{c.blurb}</p>
            {c.progress ? (
              <div style={{ marginBottom: 14 }}>
                <div className="bar"><i style={{ width: `${c.progress}%` }} /></div>
                <div className="dim" style={{ fontSize: 12.5, marginTop: 6 }}>{c.progress}% complete</div>
              </div>
            ) : null}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="dim" style={{ fontSize: 13.5 }}>{c.lessons} lessons · {c.hours} h</span>
              {c.price ? (
                <button className="btn btn-pulse btn-sm" onClick={() => show(`${c.title} added to your cart ($${c.price}).`)}>Buy ${c.price}</button>
              ) : (
                <button className="btn btn-ghost btn-sm" onClick={() => { setOpen(c.id); window.scrollTo({ top: 0, behavior: "smooth" }); }}>{c.progress ? "Continue" : "Start free"}</button>
              )}
            </div>
          </div>
        ))}
      </div>
      {node}
    </div>
  );
}
