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
