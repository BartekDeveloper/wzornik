import { describe, expect, it } from "vitest";
import { computeVirtualRange } from "./virtual";

describe("computeVirtualRange", () => {
  const H = 100;
  const GAP = 16;
  const uniform = () => H;
  const offsets = (i: number): number => i * (H + GAP);

  it("shows the whole range when list fits in viewport", () => {
    const r = computeVirtualRange(6, 0, 2000, uniform, GAP, 5);
    expect(r).toEqual({ start: 0, end: 6, padTop: 0, padBottom: 0, total: 6 * H + 5 * GAP });
  });

  it("renders only the visible window mid-list with pads", () => {
    const scrollTop = offsets(20);
    const r = computeVirtualRange(100, scrollTop, H, uniform, GAP, 0);
    expect(r.start).toBe(20);
    expect(r.end).toBe(21);
    expect(r.padTop).toBe(offsets(20));
    expect(r.padBottom).toBe((100 - 21) * H + (99 - 21) * GAP);
    expect(r.total).toBe(100 * H + 99 * GAP);
  });

  it("overscan extends the window on both sides", () => {
    const scrollTop = offsets(30);
    const r = computeVirtualRange(100, scrollTop, H, uniform, GAP, 5);
    expect(r.start).toBe(25);
    expect(r.end).toBe(36);
  });

  it("clamps at list edges", () => {
    const head = computeVirtualRange(50, 0, H, uniform, GAP, 5);
    expect(head.start).toBe(0);
    expect(head.end).toBe(6);
    const tail = computeVirtualRange(50, offsets(49), H, uniform, GAP, 5);
    expect(tail.end).toBe(50);
    expect(tail.padBottom).toBe(0);
  });

  it("handles variable heights via heightAt", () => {
    const heights = [200, 50, 100, 100, 300];
    const r = computeVirtualRange(5, 0, 150, (i) => heights[i]!, 0, 0);
    expect(r.start).toBe(0);
    expect(r.end).toBe(1);
    expect(r.padTop).toBe(0);
    expect(r.padBottom).toBe(50 + 100 + 100 + 300);
    expect(r.total).toBe(750);
  });

  it("returns zeros for an empty list", () => {
    expect(computeVirtualRange(0, 100, 500, uniform, GAP)).toEqual({
      start: 0,
      end: 0,
      padTop: 0,
      padBottom: 0,
      total: 0,
    });
  });

  it("handles a single tall item", () => {
    const r = computeVirtualRange(1, 0, 100, () => 400, GAP, 5);
    expect(r).toEqual({ start: 0, end: 1, padTop: 0, padBottom: 0, total: 400 });
  });
});
