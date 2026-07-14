import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Agents Tech Lab",
  description: "Front-end for the Capgemini AI-Agents lab. Renders each project's output.",
};

const NAV = [
  { href: "/", label: "Home" },
  { href: "/flow", label: "Agent Flow" },
  { href: "/radar", label: "Radar" },
  { href: "/deck", label: "Deck" },
];

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link href="/" className="brand">
            <span className="brand-plate">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/capgemini-logo.webp" alt="Capgemini" className="brand-logo" />
            </span>
            <span className="brand-text">
              AI Agents Tech <span className="brand-sub">· Lab</span>
            </span>
          </Link>
          <nav className="site-nav">
            {NAV.map((n) => (
              <Link key={n.href} href={n.href}>
                {n.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="site-main">{children}</main>
        <footer className="site-footer">
          Built in Claude Code · upgrade this UI live with the <code>showcase</code> skill
        </footer>
      </body>
    </html>
  );
}
