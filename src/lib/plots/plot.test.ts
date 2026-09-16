import { describe, expect, it } from "vitest";
import { linearPlot, niceStep, quadraticPlot, sampleY } from "./plot";

describe("quadraticPlot", () => {
  it("finds zeros and vertex for x²-5x+6", () => {
    const p = quadraticPlot(1, -5, 6);
    if (!p) throw new Error("expected plot");
    const zeros = p.points.filter((pt) => pt.kind === "zero").map((pt) => pt.x);
    expect(zeros).toHaveLength(2);
    expect(Math.min(...zeros)).toBeCloseTo(2, 9);
    expect(Math.max(...zeros)).toBeCloseTo(3, 9);
    const v = p.points.find((pt) => pt.kind === "vertex");
    expect(v?.x).toBeCloseTo(2.5, 9);
    expect(v?.y).toBeCloseTo(-0.25, 9);
    expect(p.xMin).toBeLessThan(2);
    expect(p.xMax).toBeGreaterThan(3);
  });

  it("has no zeros for Δ<0", () => {
    const p = quadraticPlot(1, 0, 1);
    if (!p) throw new Error("expected plot");
    expect(p.points.some((pt) => pt.kind === "zero")).toBe(false);
    expect(p.points.some((pt) => pt.kind === "vertex")).toBe(true);
  });

  it("returns null when a=0", () => {
    expect(quadraticPlot(0, 2, 1)).toBeNull();
  });
});

describe("linearPlot", () => {
  it("finds zero of 2x-4", () => {
    const p = linearPlot(2, -4);
    if (!p) throw new Error("expected plot");
    expect(p.points.find((pt) => pt.kind === "zero")?.x).toBeCloseTo(2, 9);
  });

  it("returns null when a=0", () => {
    expect(linearPlot(0, 1)).toBeNull();
  });
});

describe("sampleY", () => {
  it("frames the curve with padding", () => {
    const p = quadraticPlot(1, -5, 6);
    if (!p) throw new Error("expected plot");
    const s = sampleY(p);
    expect(s.yMin).toBeLessThan(-0.25);
    expect(s.yMax).toBeGreaterThan(6);
  });
});

describe("niceStep", () => {
  it("picks readable grid steps", () => {
    expect(niceStep(10)).toBe(2);
    expect(niceStep(3)).toBe(0.5);
  });
});
