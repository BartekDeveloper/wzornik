import { describe, expect, it } from "vitest";
import {
  inequalityBands,
  initialView,
  linearPlot,
  niceStep,
  panView,
  polyPlot,
  quadraticPlot,
  sampleY,
  trajectoryPlot,
  zoomView,
} from "./plot";

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

describe("polyPlot", () => {
  it("frames cubic zeros and evaluates by Horner", () => {
    const p = polyPlot([1, -6, 11, -6], [1, 2, 3]);
    if (!p) throw new Error("expected plot");
    expect(p.fn(2)).toBeCloseTo(0, 9);
    expect(p.fn(0)).toBeCloseTo(-6, 9);
    expect(p.xMin).toBeLessThan(1);
    expect(p.xMax).toBeGreaterThan(3);
    expect(p.points).toHaveLength(3);
  });

  it("returns null without roots or with zero leading coefficient", () => {
    expect(polyPlot([1, -6, 11, -6], [])).toBeNull();
    expect(polyPlot([0, 1, 2], [1])).toBeNull();
  });
});

describe("trajectoryPlot", () => {
  it("starts at (0,h) and lands at (Z,0)", () => {
    const p = trajectoryPlot(10, 20);
    if (!p) throw new Error("expected plot");
    expect(p.fn(0)).toBeCloseTo(20, 9);
    const Z = 10 * Math.sqrt(4);
    expect(p.xMax).toBeCloseTo(Z, 9);
    expect(p.fn(Z)).toBeCloseTo(0, 9);
    expect(p.points).toHaveLength(2);
  });

  it("rejects non-positive v0 and negative h", () => {
    expect(trajectoryPlot(0, 5)).toBeNull();
    expect(trajectoryPlot(10, -1)).toBeNull();
  });
});

describe("inequalityBands", () => {
  it("shades outside for a>0 with >", () => {
    const b = inequalityBands(1, ">", [2, 3]);
    expect(b).toHaveLength(2);
    expect(b![1]!.from).toBe(3);
  });

  it("shades inside for a>0 with <", () => {
    expect(inequalityBands(1, "<", [2, 3])).toEqual([{ from: 2, to: 3 }]);
  });

  it("flips sides for a<0", () => {
    expect(inequalityBands(-1, ">", [2, 3])).toEqual([{ from: 2, to: 3 }]);
    expect(inequalityBands(-1, "<", [2, 3])).toHaveLength(2);
  });

  it("handles double root and empty roots", () => {
    expect(inequalityBands(1, ">", [2])).toHaveLength(2);
    expect(inequalityBands(1, "<", [2])).toEqual([]);
    expect(inequalityBands(1, "≥", [2])).toHaveLength(1);
    expect(inequalityBands(1, ">", [])).toHaveLength(1);
    expect(inequalityBands(1, "<", [])).toEqual([]);
    expect(inequalityBands(-1, "<", [])).toHaveLength(1);
  });

  it("shades everything for ≠", () => {
    expect(inequalityBands(1, "≠", [2, 3])).toHaveLength(1);
  });

  it("rejects a=0", () => {
    expect(inequalityBands(0, ">", [2])).toBeNull();
  });
});

describe("view", () => {
  it("initialView centers on sampled bounds", () => {
    const p = quadraticPlot(1, -5, 6);
    if (!p) throw new Error("expected plot");
    const { view, bounds } = initialView(p);
    expect(view.cx).toBeCloseTo((bounds.xMin + bounds.xMax) / 2, 9);
    expect(view.halfW).toBeGreaterThan(0);
    expect(view.halfH).toBeGreaterThan(0);
  });

  it("zoomView shrinks and grows the window", () => {
    const p = quadraticPlot(1, -5, 6);
    if (!p) throw new Error("expected plot");
    const { view, bounds } = initialView(p);
    const zin = zoomView(view, bounds, 0.5);
    expect(zin.halfW).toBeCloseTo(view.halfW * 0.5, 9);
    const zout = zoomView(view, bounds, 2);
    expect(zout.halfW).toBeGreaterThan(view.halfW);
  });

  it("clampView keeps the window within 50% past the edges", () => {
    const p = quadraticPlot(1, -5, 6);
    if (!p) throw new Error("expected plot");
    const { view, bounds } = initialView(p);
    const xr = bounds.xMax - bounds.xMin;
    const far = panView(view, bounds, xr * 100, 0);
    expect(far.cx - far.halfW).toBeGreaterThanOrEqual(bounds.xMin - 0.5 * xr - 1e-9);
    expect(far.cx + far.halfW).toBeLessThanOrEqual(bounds.xMax + 0.5 * xr + 1e-9);
  });

  it("panView moves the center", () => {
    const p = linearPlot(2, -4);
    if (!p) throw new Error("expected plot");
    const { view, bounds } = initialView(p);
    const moved = panView(view, bounds, 1, 0);
    expect(moved.cx).toBeCloseTo(view.cx + 1, 9);
  });
});
