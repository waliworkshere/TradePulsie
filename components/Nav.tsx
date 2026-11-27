"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/competitions", label: "Competitions" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/academy", label: "Academy" },
  { href: "/store", label: "Store" },
  { href: "/membership", label: "Membership" },
  { href: "/community", label: "Community" },
  { href: "/admin", label: "Admin" },
];

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="demo-banner">
        <b>Preview build</b> for TradePulsie, built by FullCircleWali. Data shown is sample data.{" "}
        <button className="banner-tour" onClick={() => window.dispatchEvent(new Event("tp-open-tour"))}>Take the tour</button>
      </div>
      <header className="nav">
        <div className="wrap">
          <Link href="/" className="brand" aria-label="TradePulsie home">
            <img src="/logo.png" alt="TradePulsie" />
          </Link>
          <nav className={`links ${open ? "open" : ""}`} onClick={() => setOpen(false)}>
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={path.startsWith(l.href) ? "active" : ""}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="right">
            <Link href="/login" className="btn btn-ghost btn-sm hide-sm">Log in</Link>
            <Link href="/register" className="btn btn-pulse btn-sm">Join free</Link>
            <button className="menu-btn" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button>
          </div>
        </div>
      </header>
    </>
  );
}
