"""PublicData Atlas BR — FastAPI entrypoint (lab scaffold + demo meta)."""

from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.services.quality import score_quality

ROOT = Path(__file__).resolve().parents[1]
SEED_QUALITY = ROOT / "data" / "seed" / "sources_quality.json"

app = FastAPI(
    title="PublicData Atlas BR",
    description="Ingestão, qualidade e visualização de dados públicos brasileiros (lab).",
    version="0.2.0-lab",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "publicdata-atlas-br", "phase": "lab-demo"}


@app.get("/api/v1/meta")
def meta() -> dict[str, object]:
    return {
        "product": "PublicData Atlas BR",
        "mvp_domain": "education",
        "phase": "lab-demo",
        "differentiator": {
            "atlas": "map + territorial indicators + methodological report",
            "auditor": "CSV checks + dimensional score + issues register (public-data-quality-auditor-br)",
        },
        "features": [
            "synthetic_seed_ingestion",
            "quality_score",
            "uf_indicators",
            "schematic_map",
            "methodology_report",
        ],
    }


@app.get("/api/v1/demo/quality")
def demo_quality() -> dict[str, object]:
    if SEED_QUALITY.exists():
        return json.loads(SEED_QUALITY.read_text(encoding="utf-8"))
    # fallback mirrors frontend weights
    return {
        "product": "PublicData Atlas BR",
        "phase": "lab-demo",
        "sources": [
            {
                "id": "seed_ideb_uf_v1",
                "quality_score": score_quality(0.96, 0.88, 0.93, 1.0, 0.95),
            },
            {
                "id": "seed_matriculas_uf_v1",
                "quality_score": score_quality(0.78, 0.82, 0.74, 0.89, 0.9),
            },
        ],
    }
