"""PublicData Atlas BR — FastAPI entrypoint (scaffold)."""

from fastapi import FastAPI

app = FastAPI(
    title="PublicData Atlas BR",
    description="Ingestão, qualidade e visualização de dados públicos brasileiros.",
    version="0.1.0",
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "publicdata-atlas-br"}


@app.get("/api/v1/meta")
def meta() -> dict[str, object]:
    return {
        "product": "PublicData Atlas BR",
        "mvp_domain": "education",
        "phase": "scaffold",
        "features": [
            "ingestion",
            "quality_score",
            "indicators",
            "map",
            "methodology_report",
        ],
    }
