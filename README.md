# TradePulsie

All-in-one trading platform: free monthly trading competitions on broker demo accounts, automated leaderboards, trader dashboards, a trading academy, an online store, Free/Silver/Gold/VIP memberships, a community, and an admin dashboard with fair-play (anti-cheat) flags.

Built by **FullCircleWali** for TradePulsie. The source code, database and domain belong to the client.

## Status
This is the **preview build** (phase 1: design and user journeys). Data is sample data.

| Phase | Scope |
|---|---|
| 1. Design & preview | All pages and flows, responsive dark fintech UI (this build) |
| 2. Accounts & database | Supabase auth (one login for everything), profiles, roles |
| 3. Competitions engine | Competitions, demo account assignment, automatic leaderboards |
| 4. Academy, store, memberships | Course access control, products, orders, tiered access |
| 5. Payments | Cards, bank transfer / local methods, crypto (USDT/USDC) |
| 6. Fair play & admin | Cloudflare IP/VPN signals, mirrored-trade and bot detection, admin review |
| 7. Broker integration | Match-Trader / MT5 API once broker access and regulatory checks are complete |

## Stack
Next.js (App Router) · Node.js · Supabase · Vercel · Cloudflare

## Run locally
```bash
npm install
npm run dev
```
