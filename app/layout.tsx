import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LIFE//RPG — Turn Your Life Into a Game",
  description:
    "Your real-life actions shape your character. Complete quests, build attributes, unlock traits, and level up.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="cyber-bg">
          <div className="scan-beam" />
          <main className="relative z-[1]">{children}</main>
        </div>
      </body>
    </html>
  );
}