import { describe, expect, it } from "vitest";
import { add, div, fromString, mul, of, sub } from "./rational";

describe("rational", () => {
  it("adds 0.1 + 0.2 exactly", () => {
    expect(add(fromString("0.1"), fromString("0.2"))).toEqual({ p: 3n, q: 10n });
  });

  it("adds 1/3 + 1/6 = 1/2", () => {
    expect(add(fromString("1/3"), fromString("1/6"))).toEqual({ p: 1n, q: 2n });
  });

  it("normalizes 2/4 to 1/2", () => {
    expect(of(2, 4)).toEqual({ p: 1n, q: 2n });
  });

  it("multiplies and subtracts", () => {
    expect(mul(fromString("2.5"), fromString("4"))).toEqual({ p: 10n, q: 1n });
    expect(sub(fromString("1"), fromString("1/3"))).toEqual({ p: 2n, q: 3n });
  });

  it("parses comma decimals", () => {
    expect(fromString("2,5")).toEqual({ p: 5n, q: 2n });
  });

  it("throws on division by zero", () => {
    expect(() => div(of(1), of(0))).toThrow();
  });
});
