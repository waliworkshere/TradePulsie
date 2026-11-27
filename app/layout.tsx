import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Tour from "@/components/Tour";

const display = Inter({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-body" });

export const metadata: Metadata = {
  title: "TradePulsie: free trading competitions, academy and community",
  description:
    "Compete in free monthly trading competitions with broker demo accounts, learn from working traders, and grow with the TradePulsie community.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <div className="backdrop" aria-hidden />
        <Nav />
        <main>{children}</main>
        <Footer />
        <Tour />
      </body>
    </html>
  );
}
