from backend.services.quality import QualityWeights, score_quality


def test_score_quality_perfect() -> None:
    assert score_quality(1, 1, 1, 1, 1) == 100.0


def test_score_quality_clamps_dimensions() -> None:
    # Out-of-range dimensions are clamped to [0, 1] before weighting.
    assert score_quality(2, 1, 1, 1, 1) == 100.0
    assert score_quality(-1, 0, 0, 0, 0) == 0.0


def test_score_quality_weighted_partial() -> None:
    # Only completeness at 1.0 → 25 points
    assert score_quality(1, 0, 0, 0, 0) == 25.0
    # Completeness + consistency → 50
    assert score_quality(1, 0, 1, 0, 0) == 50.0


def test_custom_weights() -> None:
    w = QualityWeights(
        completeness=1.0,
        freshness=0.0,
        consistency=0.0,
        coverage=0.0,
        lineage=0.0,
    )
    assert score_quality(0.5, 1, 1, 1, 1, weights=w) == 50.0
