"use client";
import { useState } from "react";
import { products } from "@/lib/data";
import Checkout from "@/components/Checkout";
import { useToast } from "@/components/Toast";

export default function Store() {
  const [cart, setCart] = useState<string[]>([]);
  const [checkout, setCheckout] = useState(false);
  const { show, node } = useToast();
  const lines = cart.map((id) => products.find((p) => p.id === id)!).map((p) => ({ name: p.name, price: p.price }));
  const total = lines.reduce((s, l) => s + l.price, 0);
  return (
    <div className="wrap" style={{ paddingBottom: 40 }}>
      <div className="page-head split-head">
        <div>
          <h1 className="h1 display">Store</h1>
          <p className="lead">Ebooks, journals, indicators and merch. Digital products download instantly after payment.</p>
        </div>
        <button className="btn btn-ghost" disabled={!cart.length} onClick={() => setCheckout(true)}>
          Cart · {cart.length} {cart.length === 1 ? "item" : "items"}{cart.length ? ` · $${total}` : ""}
        </button>
      </div>
      <div className="grid-3">
        {products.map((p, i) => (
          <div key={p.id} className="panel panel-pad product">
            {p.img ? (
              <div className="product-art photo"><img src={p.img} alt="" loading="lazy" /></div>
            ) : (
              <div className={`product-art art-${i % 3}`}><img src="/mark.png" alt="" /></div>
            )}
            <span className="dim" style={{ fontSize: 13 }}>{p.type}</span>
            <h3 className="h3" style={{ marginTop: 4 }}>{p.name}</h3>
            <p className="muted" style={{ margin: "0 0 16px", fontSize: 14.5 }}>{p.note}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
              <b className="display" style={{ fontSize: 20 }}>${p.price}</b>
              <button className="btn btn-pulse btn-sm" onClick={() => { setCart([...cart, p.id]); show(`${p.name} added to cart`); }}>Add to cart</button>
            </div>
          </div>
        ))}
      </div>
      {checkout && (
        <Checkout lines={lines} onClose={() => setCheckout(false)} onPaid={() => { setCheckout(false); setCart([]); show("Payment confirmed. Your downloads are in your dashboard."); }} />
      )}
      {node}
    </div>
  );
}
