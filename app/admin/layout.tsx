import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rotaract Crystals — CMS",
  description: "Content management for Rotaract Club Coimbatore Crystals.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
