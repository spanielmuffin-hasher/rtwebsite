import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-clash",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://rotaractcbecrystals.in"
  ),
  title: {
    default: "Rotaract Club of Coimbatore Crystals",
    template: "%s | Rotaract Crystals",
  },
  description:
    "Rotaract Club of Coimbatore Crystals — a youth-led service organisation under Rotary International District 3206. Join us in creating lasting community impact.",
  keywords: [
    "Rotaract",
    "Coimbatore",
    "Crystals",
    "RID 3206",
    "youth service",
    "community service",
    "Rotary",
  ],
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Rotaract Club of Coimbatore Crystals",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-white text-neutral-900 overflow-x-hidden" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
