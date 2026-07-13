import { describe, expect, it } from "vitest";
import {
  DEMO,
  averageSourceScore,
  colorForIdeb,
  idebExtent,
  missingEnrollmentUfs,
  missingIdebUfs,
  rankingByIdeb,
  scoreQuality,
} from "./demo-data";

describe("scoreQuality", () => {
  it("returns 100 for perfect dimensions", () => {
    expect(
      scoreQuality({
        completeness: 1,
        freshness: 1,
        consistency: 1,
        coverage: 1,
        lineage: 1,
      }),
    ).toBe(100);
  });

  it("clamps out-of-range dimensions", () => {
    expect(
      scoreQuality({
        completeness: 2,
        freshness: 1,
        consistency: 1,
        coverage: 1,
        lineage: 1,
      }),
    ).toBe(100);
    expect(
      scoreQuality({
        completeness: -1,
        freshness: 0,
        consistency: 0,
        coverage: 0,
        lineage: 0,
      }),
    ).toBe(0);
  });

  it("applies published weights", () => {
    expect(
      scoreQuality({
        completeness: 1,
        freshness: 0,
        consistency: 0,
        coverage: 0,
        lineage: 0,
      }),
    ).toBe(25);
  });
});

describe("ranking and extent", () => {
  it("ranks DEMO by IDEB descending and excludes nulls", () => {
    const ranked = rankingByIdeb(DEMO.indicators);
    expect(ranked[0]?.uf).toBe("SC");
    expect(ranked.every((r) => r.ideb != null)).toBe(true);
    expect(ranked.length).toBe(DEMO.indicators.filter((r) => r.ideb != null).length);
  });

  it("handles empty idebExtent safely", () => {
    expect(idebExtent([])).toEqual({ min: 0, max: 1 });
  });

  it("computes extent from DEMO", () => {
    const { min, max } = idebExtent(DEMO.indicators);
    expect(min).toBeLessThan(max);
    expect(min).toBeGreaterThan(0);
  });
});

describe("gaps and colors", () => {
  it("flags known missing UFs", () => {
    expect(missingIdebUfs(DEMO.indicators)).toContain("RR");
    expect(missingEnrollmentUfs(DEMO.indicators)).toEqual(
      expect.arrayContaining(["AP", "PI", "SE"]),
    );
  });

  it("returns gray for null IDEB", () => {
    expect(colorForIdeb(null, 4, 6)).toBe("#94a3b8");
  });

  it("averages source scores", () => {
    const avg = averageSourceScore(DEMO.sources);
    expect(avg).toBeGreaterThan(80);
    expect(avg).toBeLessThanOrEqual(100);
  });
});
