"""Quality score helpers — keep weights aligned with frontend QUALITY_WEIGHTS."""

from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class QualityWeights:
    completeness: float = 0.25
    freshness: float = 0.20
    consistency: float = 0.25
    coverage: float = 0.15
    lineage: float = 0.15


def _clamp01(value: float) -> float:
    if value != value:  # NaN
        return 0.0
    return max(0.0, min(1.0, value))


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
    dims = (
        _clamp01(completeness),
        _clamp01(freshness),
        _clamp01(consistency),
        _clamp01(coverage),
        _clamp01(lineage),
    )
    total = (
        dims[0] * w.completeness
        + dims[1] * w.freshness
        + dims[2] * w.consistency
        + dims[3] * w.coverage
        + dims[4] * w.lineage
    )
    return round(max(0.0, min(100.0, total * 100.0)), 1)
