import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web3 Galaxy Explorer — Learn Blockchain Through Space",
  description:
    "An educational mini app that teaches blockchain fundamentals through an interactive planetary journey. Built on Base for the Farcaster ecosystem.",
  keywords: ["web3", "blockchain", "education", "base", "farcaster", "onchain"],
  openGraph: {
    title: "Web3 Galaxy Explorer",
    description: "Learn blockchain fundamentals through cosmic exploration",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased bg-black text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
