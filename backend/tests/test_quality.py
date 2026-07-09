from backend.services.quality import score_quality


def test_score_quality_perfect() -> None:
    assert score_quality(1, 1, 1, 1, 1) == 100.0


def test_score_quality_clamps() -> None:
    assert score_quality(2, 1, 1, 1, 1) == 100.0
    assert score_quality(-1, 0, 0, 0, 0) == 0.0
