import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PublicData Atlas BR",
  description:
    "Ingestão, qualidade e visualização de dados públicos brasileiros.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0, background: "#f8fafc", color: "#0b1f33" }}>
        {children}
      </body>
    </html>
  );
}
