import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Web Multiverse",
  description: "Visit generative webpages in the style of the 1990s internet.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
