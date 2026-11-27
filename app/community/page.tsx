"use client";
import { useState } from "react";
import { posts as seed, achievements } from "@/lib/data";

export default function Community() {
  const [posts, setPosts] = useState(seed);
  const [text, setText] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [tag, setTag] = useState("All");
  const tags = ["All", "Announcement", "Strategy", "Question", "Wins"];
  const list = posts.filter((p) => tag === "All" || p.tag === tag);
  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-head photo-head">
        <div>
          <h1 className="h1 display">Community</h1>
          <p className="lead">Ask questions, share trades and celebrate green weeks with traders on the same path as you.</p>
        </div>
        <img src="/photos/community.jpg" alt="Traders reviewing charts together" />
      </div>
      <div className="comm">
        <div>
          <form
            className="panel panel-pad"
            onSubmit={(e) => {
              e.preventDefault();
              if (!text.trim()) return;
              setPosts([{ id: Date.now(), author: "Joseph Jaden", handle: "jaden", tier: "VIP", time: "Just now", title: text.slice(0, 70), body: text, replies: 0, likes: 0, tag: "Question" }, ...posts]);
              setText("");
            }}
          >
            <label htmlFor="post" className="dim" style={{ fontSize: 13.5 }}>Start a discussion</label>
            <textarea id="post" className="input" rows={3} style={{ marginTop: 8, resize: "vertical" }} placeholder="Share a trade idea or ask the community…" value={text} onChange={(e) => setText(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 10 }}><button className="btn btn-pulse btn-sm" type="submit">Post</button></div>
          </form>
          <div className="tabs" style={{ margin: "20px 0" }}>
            {tags.map((t) => <button key={t} className={tag === t ? "on" : ""} onClick={() => setTag(t)}>{t}</button>)}
          </div>
          <div style={{ display: "grid", gap: 14 }}>
            {list.map((p) => (
              <article key={p.id} className="panel panel-pad">
                <div className="who" style={{ marginBottom: 12 }}>
                  <span className="avatar">{p.author.split(" ").map((x) => x[0]).join("").slice(0, 2)}</span>
                  <div>{p.author} <span className={`tier tier-${p.tier}`}>{p.tier}</span><small>@{p.handle} · {p.time}</small></div>
                  <span className={`pill ${p.tag === "Announcement" ? "live" : ""}`} style={{ marginLeft: "auto" }}>{p.tag}</span>
                </div>
                <h3 className="h3">{p.title}</h3>
                <p className="muted" style={{ margin: "0 0 14px" }}>{p.body}</p>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className={`btn btn-ghost btn-sm ${liked.includes(p.id) ? "liked" : ""}`} onClick={() => setLiked(liked.includes(p.id) ? liked.filter((x) => x !== p.id) : [...liked, p.id])}>
                    ♥ {p.likes + (liked.includes(p.id) ? 1 : 0)}
                  </button>
                  <button className="btn btn-ghost btn-sm">{p.replies} replies</button>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <div className="panel panel-pad">
            <img src="/photos/live-session.jpg" alt="Live trading session" className="aside-photo" loading="lazy" />
            <span className="pill live">Live Thursday 15:30 GMT</span>
            <h3 className="h3" style={{ marginTop: 12 }}>New York open with Joseph</h3>
            <p className="muted" style={{ margin: "0 0 14px", fontSize: 14 }}>Live NQ trading with a 1% risk rule. Gold and VIP members.</p>
            <button className="btn btn-pulse btn-sm btn-block">Set a reminder</button>
          </div>
          <div className="panel panel-pad">
            <h3 className="h3">Your achievements</h3>
            <div className="badges">{achievements.map((a) => <span key={a.name} className={`badge ${a.got ? "got" : ""}`}>{a.name}</span>)}</div>
          </div>
          <div className="panel panel-pad">
            <h3 className="h3">Community guidelines</h3>
            <ul className="checks" style={{ margin: 0, fontSize: 14 }}>
              <li>No signal selling or paid groups</li>
              <li>Share results honestly</li>
              <li>Be kind to beginners</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
