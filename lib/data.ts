// Demo data for the TradePulsie proof of concept.
// In production this comes from Supabase and the broker API (Match-Trader / MT5).

export type Trader = {
  rank: number;
  name: string;
  handle: string;
  country: string;
  pnlPct: number;
  pnl: number;
  winRate: number;
  drawdown: number;
  trades: number;
  tier: "Free" | "Silver" | "Gold" | "VIP";
};

export const leaderboard: Trader[] = [
  { rank: 1, name: "Kwame Mensah", handle: "kmensah", country: "GH", pnlPct: 18.42, pnl: 1842, winRate: 68, drawdown: 3.1, trades: 54, tier: "Gold" },
  { rank: 2, name: "Ama Owusu", handle: "ama.fx", country: "GH", pnlPct: 15.9, pnl: 1590, winRate: 61, drawdown: 4.4, trades: 71, tier: "VIP" },
  { rank: 3, name: "Daniel Okafor", handle: "dokafor", country: "NG", pnlPct: 13.37, pnl: 1337, winRate: 57, drawdown: 2.8, trades: 39, tier: "Silver" },
  { rank: 4, name: "Sarah Mitchell", handle: "smitch", country: "GB", pnlPct: 11.05, pnl: 1105, winRate: 64, drawdown: 5.2, trades: 88, tier: "Gold" },
  { rank: 5, name: "Yaw Boateng", handle: "yawtrades", country: "GH", pnlPct: 9.81, pnl: 981, winRate: 55, drawdown: 3.9, trades: 47, tier: "Free" },
  { rank: 6, name: "Fatima Al Balushi", handle: "fatima.b", country: "OM", pnlPct: 8.64, pnl: 864, winRate: 59, drawdown: 2.2, trades: 31, tier: "Silver" },
  { rank: 7, name: "Lucas Ferreira", handle: "lferreira", country: "BR", pnlPct: 7.12, pnl: 712, winRate: 52, drawdown: 6.0, trades: 102, tier: "Free" },
  { rank: 8, name: "Esi Asante", handle: "esi.a", country: "GH", pnlPct: 6.3, pnl: 630, winRate: 50, drawdown: 4.7, trades: 66, tier: "Free" },
  { rank: 9, name: "Ravi Menon", handle: "ravim", country: "IN", pnlPct: 5.48, pnl: 548, winRate: 58, drawdown: 3.3, trades: 29, tier: "Silver" },
  { rank: 10, name: "Joseph Jaden", handle: "jaden", country: "GH", pnlPct: 4.97, pnl: 497, winRate: 63, drawdown: 1.9, trades: 22, tier: "VIP" },
  { rank: 11, name: "Chloe Martin", handle: "chloe.m", country: "FR", pnlPct: 3.6, pnl: 360, winRate: 49, drawdown: 5.8, trades: 75, tier: "Free" },
  { rank: 12, name: "Kofi Annan Jr", handle: "kofi.jr", country: "GH", pnlPct: 2.14, pnl: 214, winRate: 47, drawdown: 7.1, trades: 93, tier: "Free" },
];

export type Competition = {
  id: string;
  name: string;
  status: "Live" | "Registration open" | "Finished";
  market: string;
  starts: string;
  ends: string;
  prize: string;
  entrants: number;
  capital: string;
  entry: string;
  rules: string[];
};

export const competitions: Competition[] = [
  {
    id: "december-futures-cup",
    name: "December Futures Cup",
    status: "Live",
    market: "Futures · ES, NQ, CL, GC",
    starts: "16 Nov 2026",
    ends: "15 Dec 2026",
    prize: "$5,000 funded account",
    entrants: 1284,
    capital: "$10,000 demo",
    entry: "Free",
    rules: ["Max daily loss 5%", "Max overall drawdown 10%", "Minimum 10 trading days", "No copy trading or shared accounts", "News trading allowed"],
  },
  {
    id: "january-fx-sprint",
    name: "January FX Sprint",
    status: "Registration open",
    market: "Forex & CFDs · majors and gold",
    starts: "5 Jan 2027",
    ends: "30 Jan 2027",
    prize: "$2,500 + Gold membership",
    entrants: 412,
    capital: "$25,000 demo",
    entry: "Free",
    rules: ["Max daily loss 4%", "Max overall drawdown 8%", "Minimum 5 trading days", "One account per person", "EAs and bots not allowed"],
  },
  {
    id: "beginner-challenge-feb",
    name: "Beginner Challenge",
    status: "Registration open",
    market: "Forex · EURUSD, GBPUSD, XAUUSD",
    starts: "2 Feb 2027",
    ends: "27 Feb 2027",
    prize: "Free Academy course bundle",
    entrants: 238,
    capital: "$5,000 demo",
    entry: "Free",
    rules: ["For traders with under 1 year of experience", "Max overall drawdown 10%", "Minimum 8 trading days"],
  },
  {
    id: "october-open",
    name: "October Open",
    status: "Finished",
    market: "Forex & Futures",
    starts: "1 Oct 2026",
    ends: "31 Oct 2026",
    prize: "$3,000 funded account",
    entrants: 1037,
    capital: "$10,000 demo",
    entry: "Free",
    rules: ["Max daily loss 5%", "Max overall drawdown 10%"],
  },
];

export type Course = {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  lessons: number;
  hours: number;
  price: number; // 0 = free
  progress?: number;
  instructor: string;
  blurb: string;
};

export const courses: Course[] = [
  { id: "trading-foundations", title: "Trading foundations", level: "Beginner", lessons: 18, hours: 4.5, price: 0, progress: 72, instructor: "Joseph Jaden", blurb: "Markets, order types, leverage and your first trading plan." },
  { id: "risk-management", title: "Risk management that keeps you funded", level: "Beginner", lessons: 12, hours: 3, price: 0, progress: 30, instructor: "Joseph Jaden", blurb: "Position sizing, daily loss limits and surviving a drawdown." },
  { id: "futures-playbook", title: "The futures playbook", level: "Intermediate", lessons: 24, hours: 7, price: 79, instructor: "Joseph Jaden", blurb: "ES, NQ and CL: sessions, contract specs and setups that work." },
  { id: "prop-firm-pass", title: "Passing prop firm challenges", level: "Intermediate", lessons: 16, hours: 5, price: 99, instructor: "Joseph Jaden", blurb: "The exact rules, routines and mindset behind real prop payouts." },
  { id: "price-action-mastery", title: "Price action mastery", level: "Advanced", lessons: 30, hours: 9, price: 149, instructor: "Guest mentor", blurb: "Market structure, liquidity and entries without indicators." },
  { id: "trading-psychology", title: "Trading psychology", level: "Intermediate", lessons: 10, hours: 2.5, price: 49, instructor: "Guest mentor", blurb: "Discipline, journaling and handling losing streaks." },
];

export type Product = {
  id: string;
  name: string;
  type: string;
  price: number;
  note: string;
};

export const products: Product[] = [
  { id: "journal-pro", name: "TradePulsie Journal Pro", type: "Digital tool", price: 19, note: "Spreadsheet + Notion journal with auto stats" },
  { id: "session-indicator", name: "Session Pulse indicator", type: "Indicator · MT5 / TradingView", price: 39, note: "Marks London, New York and Asia sessions" },
  { id: "risk-calculator", name: "Position size calculator", type: "Digital tool", price: 9, note: "Lot size from account, risk % and stop" },
  { id: "ebook-futures", name: "Futures for beginners", type: "Ebook · PDF", price: 15, note: "120 pages, written for first-time futures traders" },
  { id: "printed-journal", name: "Printed trading journal", type: "Merchandise", price: 25, note: "A5 hardcover, 180 trade pages" },
  { id: "hoodie", name: "TradePulsie hoodie", type: "Merchandise", price: 45, note: "Black heavyweight cotton, green chest logo" },
];

export type Tier = {
  name: "Free" | "Silver" | "Gold" | "VIP";
  price: number;
  perks: string[];
  highlight?: boolean;
};

export const tiers: Tier[] = [
  { name: "Free", price: 0, perks: ["Enter all monthly competitions", "Trader dashboard and stats", "Free Academy courses", "Community access"] },
  { name: "Silver", price: 15, perks: ["Everything in Free", "1 premium course per quarter", "Weekly market outlook", "10% off the store"] },
  { name: "Gold", price: 39, highlight: true, perks: ["Everything in Silver", "All premium courses", "Live trading sessions", "Gold badge and priority support", "20% off the store"] },
  { name: "VIP", price: 99, perks: ["Everything in Gold", "Monthly 1-to-1 mentorship call", "VIP-only competitions", "Early access to new tools"] },
];

export const posts = [
  { id: 1, author: "Ama Owusu", handle: "ama.fx", tier: "VIP", time: "12 min ago", title: "How I stayed under 4% drawdown in the Futures Cup", body: "Cut my size in half after two losses in a row. Boring, but I'm still in the top 3.", replies: 23, likes: 112, tag: "Strategy" },
  { id: 2, author: "TradePulsie", handle: "team", tier: "VIP", time: "1 h ago", title: "January FX Sprint registration is open", body: "25k demo accounts, $2,500 prize pool, and Gold membership for the top 3. Register from your dashboard.", replies: 41, likes: 260, tag: "Announcement" },
  { id: 3, author: "Yaw Boateng", handle: "yawtrades", tier: "Free", time: "3 h ago", title: "First green week ever 🎉", body: "Finished the Risk Management course last month. Journaling every trade has changed everything.", replies: 17, likes: 89, tag: "Wins" },
  { id: 4, author: "Daniel Okafor", handle: "dokafor", tier: "Silver", time: "5 h ago", title: "NQ or ES for a $10k account?", body: "Micro contracts on both. Which one do you find cleaner during the New York open?", replies: 34, likes: 46, tag: "Question" },
];

export const achievements = [
  { name: "First trade", got: true },
  { name: "Green week", got: true },
  { name: "Top 100", got: true },
  { name: "Risk master", got: true },
  { name: "Top 10", got: false },
  { name: "Champion", got: false },
];

export const myTrades = [
  { id: "T-1042", symbol: "NQZ6", side: "Buy", size: "1 MNQ", open: "21,184.25", close: "21,212.50", pnl: 56.5, time: "Today 16:42" },
  { id: "T-1041", symbol: "ESZ6", side: "Sell", size: "2 MES", open: "6,098.75", close: "6,091.00", pnl: 77.5, time: "Today 15:10" },
  { id: "T-1040", symbol: "CLF7", side: "Buy", size: "1 MCL", open: "71.42", close: "71.18", pnl: -24.0, time: "Yesterday 17:05" },
  { id: "T-1039", symbol: "XAUUSD", side: "Buy", size: "0.30 lot", open: "2,642.10", close: "2,651.80", pnl: 291.0, time: "Yesterday 11:22" },
  { id: "T-1038", symbol: "EURUSD", side: "Sell", size: "0.50 lot", open: "1.0612", close: "1.0631", pnl: -95.0, time: "24 Nov 09:48" },
  { id: "T-1037", symbol: "ESZ6", side: "Buy", size: "2 MES", open: "6,071.25", close: "6,084.50", pnl: 132.5, time: "24 Nov 16:01" },
];

export const flags = [
  { id: "F-311", severity: "High", type: "Shared IP address", detail: "3 accounts trading from 102.176.x.x in the Futures Cup", accounts: ["kofi.jr", "esi.a", "newtrader88"], time: "18 min ago" },
  { id: "F-310", severity: "High", type: "Mirrored trades", detail: "Same entries within 2 seconds on 14 trades (possible copy trading)", accounts: ["lferreira", "lucasf2"], time: "2 h ago" },
  { id: "F-309", severity: "Medium", type: "Bot-like timing", detail: "Orders placed at fixed 500 ms intervals for 40 minutes", accounts: ["fxalgo_77"], time: "6 h ago" },
  { id: "F-308", severity: "Low", type: "VPN detected", detail: "Login country changed GH → NL → GH within 1 hour", accounts: ["chloe.m"], time: "Yesterday" },
];

export const payments = [
  { id: "P-9021", user: "Ama Owusu", item: "VIP membership", amount: 99, method: "USDT (TRC-20)", status: "Paid", time: "Today 14:02" },
  { id: "P-9020", user: "Daniel Okafor", item: "The futures playbook", amount: 79, method: "Card", status: "Paid", time: "Today 11:47" },
  { id: "P-9019", user: "Yaw Boateng", item: "Session Pulse indicator", amount: 39, method: "Bank transfer", status: "Pending", time: "Today 09:15" },
  { id: "P-9018", user: "Sarah Mitchell", item: "Gold membership", amount: 39, method: "Card", status: "Paid", time: "Yesterday" },
  { id: "P-9017", user: "Ravi Menon", item: "Printed trading journal", amount: 25, method: "USDC (Polygon)", status: "Paid", time: "Yesterday" },
];

// Deterministic pseudo-random equity curve so server and client render the same thing.
export function equityCurve(points = 60, start = 10000, seed = 7) {
  let s = seed;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
  const out: number[] = [start];
  for (let i = 1; i < points; i++) {
    const drift = 9;
    const shock = (rnd() - 0.45) * 160;
    out.push(Math.round(out[i - 1] + drift + shock));
  }
  return out;
}

export const flagEmoji = (cc: string) =>
  cc.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
