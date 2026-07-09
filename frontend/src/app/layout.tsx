import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PublicData Atlas BR — Lab Demo",
  description:
    "Brazilian open-data atlas lab: quality scores, UF indicators, schematic map and methodological report.",
  openGraph: {
    title: "PublicData Atlas BR",
    description:
      "Civic atlas lab for Brazilian open data — map, indicators and explicit quality.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
