"""Quality score helpers (scaffold)."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class QualityWeights:
    completeness: float = 0.25
    freshness: float = 0.20
    consistency: float = 0.25
    coverage: float = 0.15
    lineage: float = 0.15


def score_quality(
    completeness: float,
    freshness: float,
    consistency: float,
    coverage: float,
    lineage: float,
    weights: QualityWeights | None = None,
) -> float:
    """Return a 0–100 quality score from normalized 0–1 dimensions."""
    w = weights or QualityWeights()
    total = (
        completeness * w.completeness
        + freshness * w.freshness
        + consistency * w.consistency
        + coverage * w.coverage
        + lineage * w.lineage
    )
    return round(max(0.0, min(100.0, total * 100.0)), 1)
