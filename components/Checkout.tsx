"use client";
import { useState } from "react";

type Line = { name: string; price: number };
const methods = [
  { id: "card", label: "Debit or credit card", note: "Visa, Mastercard" },
  { id: "crypto", label: "Crypto", note: "USDT, USDC, BTC" },
  { id: "bank", label: "Bank transfer", note: "Local bank or mobile money" },
] as const;

export default function Checkout({ lines, onClose, onPaid }: { lines: Line[]; onClose: () => void; onPaid: () => void }) {
  const [method, setMethod] = useState<(typeof methods)[number]["id"]>("crypto");
  const [paying, setPaying] = useState(false);
  const total = lines.reduce((s, l) => s + l.price, 0);
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal panel" role="dialog" aria-modal="true" aria-label="Checkout" onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="h3 display" style={{ margin: 0 }}>Checkout</h2>
          <button className="btn btn-ghost btn-sm" onClick={onClose}>Close</button>
        </div>
        <div style={{ margin: "18px 0", display: "grid", gap: 8 }}>
          {lines.map((l, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 14.5 }}><span>{l.name}</span><b>${l.price}</b></div>
          ))}
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--line)", paddingTop: 10, marginTop: 4 }}>
            <span className="muted">Total</span><b className="display" style={{ fontSize: 20 }}>${total}</b>
          </div>
        </div>
        <div className="dim" style={{ fontSize: 13, marginBottom: 8 }}>Pay with</div>
        <div style={{ display: "grid", gap: 8 }}>
          {methods.map((m) => (
            <label key={m.id} className={`pay-opt ${method === m.id ? "on" : ""}`}>
              <input type="radio" name="pay" checked={method === m.id} onChange={() => setMethod(m.id)} />
              <span><b style={{ fontWeight: 500 }}>{m.label}</b><small className="dim" style={{ display: "block" }}>{m.note}</small></span>
            </label>
          ))}
        </div>
        {method === "crypto" && (
          <div className="crypto-box">
            <div className="qr" aria-hidden />
            <div style={{ fontSize: 13.5 }}>
              <div className="dim">Send exactly</div>
              <b className="display" style={{ fontSize: 18 }}>{total}.00 USDT</b>
              <div className="dim" style={{ marginTop: 6 }}>Network: TRC-20</div>
              <code style={{ fontSize: 12, wordBreak: "break-all", color: "var(--silver)" }}>TQ7f…demo…wallet</code>
            </div>
          </div>
        )}
        <button
          className="btn btn-pulse btn-block"
          style={{ marginTop: 18 }}
          disabled={paying}
          onClick={() => { setPaying(true); setTimeout(() => { setPaying(false); onPaid(); }, 1200); }}
        >
          {paying ? "Confirming payment…" : method === "crypto" ? "I've sent the payment" : `Pay $${total}`}
        </button>
        <p className="dim" style={{ fontSize: 12, margin: "10px 0 0", textAlign: "center" }}>Demo checkout. No real payment is taken.</p>
      </div>
    </div>
  );
}
