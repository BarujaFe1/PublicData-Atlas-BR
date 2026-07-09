export default function HomePage() {
  return (
    <main style={{ fontFamily: "Georgia, serif", padding: "3rem", maxWidth: 720 }}>
      <p style={{ letterSpacing: "0.08em", textTransform: "uppercase", color: "#0f766e" }}>
        PublicData Atlas BR
      </p>
      <h1 style={{ fontSize: "2.4rem", lineHeight: 1.15 }}>
        Atlas cívico de dados públicos brasileiros
      </h1>
      <p style={{ fontSize: "1.1rem", color: "#334155" }}>
        Scaffold do produto: ingestão, qualidade, indicadores, mapa e relatório
        metodológico. Domínio MVP proposto: educação.
      </p>
      <p style={{ color: "#64748b" }}>
        API health: configure <code>NEXT_PUBLIC_API_BASE</code> e inicie o backend.
      </p>
    </main>
  );
}
