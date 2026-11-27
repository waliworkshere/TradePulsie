import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="cols">
          <div>
            <img src="/logo.png" alt="TradePulsie" style={{ height: 36, mixBlendMode: "lighten" }} />
            <p style={{ maxWidth: 360 }}>
              Free monthly trading competitions, an academy built by working traders, and a community that helps you get funded.
            </p>
            <div className="socials" aria-label="TradePulsie on social media">
              <a href="#" aria-label="Instagram" title="Instagram"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" className="dot" /></svg></a>
              <a href="#" aria-label="X (Twitter)" title="X (Twitter)"><svg viewBox="0 0 24 24"><path d="M4 4l16 16M20 4L4 20" /></svg></a>
              <a href="#" aria-label="YouTube" title="YouTube"><svg viewBox="0 0 24 24"><rect x="2.5" y="5.5" width="19" height="13" rx="4" /><path d="M10 9.5v5l4.5-2.5z" className="fill" /></svg></a>
              <a href="#" aria-label="TikTok" title="TikTok"><svg viewBox="0 0 24 24"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.5 2.8 2.4 4.6 5 5" /></svg></a>
              <a href="#" aria-label="Telegram" title="Telegram"><svg viewBox="0 0 24 24"><path d="M21 4L3 11l6 2 2 6 3-4 4 3z" /></svg></a>
            </div>
          </div>
          <div>
            <h4>Compete</h4>
            <Link href="/competitions">Competitions</Link>
            <Link href="/competitions/december-futures-cup">Leaderboard</Link>
            <Link href="/dashboard">My dashboard</Link>
          </div>
          <div>
            <h4>Learn</h4>
            <Link href="/academy">Academy</Link>
            <Link href="/store">Store</Link>
            <Link href="/membership">Membership</Link>
          </div>
          <div>
            <h4>Connect</h4>
            <Link href="/community">Community</Link>
            <Link href="/register">Create account</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
        <div className="base">
          <span>© 2026 TradePulsie. Trading involves risk. Competition accounts are demo accounts and no real funds are traded.</span>
          <span>Built by FullCircleWali</span>
        </div>
      </div>
    </footer>
  );
}
