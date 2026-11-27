"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const reg = mode === "register";
  return (
    <div className="wrap auth">
      <div className="panel panel-pad auth-card">
        <img src="/mark.png" alt="" style={{ height: 44, mixBlendMode: "lighten" }} />
        <h1 className="display" style={{ fontSize: 28, margin: "14px 0 6px" }}>{reg ? "Create your free account" : "Log in to TradePulsie"}</h1>
        <p className="muted" style={{ marginTop: 0 }}>{reg ? "One account for competitions, the Academy, the store and the community." : "Welcome back. Your dashboard is waiting."}</p>
        <form onSubmit={(e) => { e.preventDefault(); setBusy(true); setTimeout(() => router.push("/dashboard"), 700); }}>
          {reg && (
            <div className="field"><label htmlFor="name">Full name</label><input id="name" className="input" required placeholder="Joseph Jaden" /></div>
          )}
          <div className="field"><label htmlFor="email">Email</label><input id="email" type="email" className="input" required placeholder="you@example.com" /></div>
          <div className="field"><label htmlFor="pw">Password</label><input id="pw" type="password" className="input" required minLength={8} placeholder="At least 8 characters" /></div>
          {reg && (
            <div className="field">
              <label htmlFor="exp">Trading experience</label>
              <select id="exp" className="input" defaultValue="Under 1 year">
                <option>Under 1 year</option><option>1–3 years</option><option>3+ years</option>
              </select>
            </div>
          )}
          <button className="btn btn-pulse btn-block" disabled={busy} style={{ marginTop: 6 }}>{busy ? (reg ? "Creating account…" : "Logging in…") : reg ? "Create account" : "Log in"}</button>
        </form>
        <div className="divider"><span>or</span></div>
        <button className="btn btn-ghost btn-block" onClick={() => router.push("/dashboard")}>Continue with Google</button>
        <p className="dim" style={{ fontSize: 14, textAlign: "center", marginBottom: 0 }}>
          {reg ? <>Already have an account? <Link href="/login" className="up">Log in</Link></> : <>New to TradePulsie? <Link href="/register" className="up">Create a free account</Link></>}
        </p>
      </div>
    </div>
  );
}
