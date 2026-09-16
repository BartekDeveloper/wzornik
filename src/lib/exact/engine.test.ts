import { describe, expect, it } from "vitest";
import { binom, factorial, fromString } from "./rational";
import { approx, logExact, trigExact } from "./exact";
import { formatExactText } from "./format";

describe("factorial/binom", () => {
  it("computes 5! and C(5,2)", () => {
    expect(factorial(5n)).toBe(120n);
    expect(binom(5n, 2n)).toBe(10n);
    expect(binom(49n, 6n)).toBe(13983816n);
  });

  it("rejects invalid input", () => {
    expect(() => binom(5n, 6n)).toThrow();
    expect(() => factorial(-1n)).toThrow();
  });
});

describe("trigExact", () => {
  it("returns exact school values", () => {
    expect(formatExactText(trigExact("sin", 30))).toBe("1/2");
    expect(formatExactText(trigExact("cos", 30))).toBe("(1/2·√3)");
    expect(formatExactText(trigExact("tan", 45))).toBe("1");
    expect(formatExactText(trigExact("sin", 90))).toBe("1");
    expect(formatExactText(trigExact("cos", 90))).toBe("0");
    expect(formatExactText(trigExact("sin", 150))).toBe("1/2");
    expect(formatExactText(trigExact("cos", 180))).toBe("-1");
  });

  it("falls back to approx for odd angles", () => {
    expect(approx(trigExact("sin", 37))).toBeCloseTo(Math.sin((37 * Math.PI) / 180), 10);
  });

  it("rejects tan 90", () => {
    expect(() => trigExact("tan", 90)).toThrow();
  });
});

describe("logExact", () => {
  it("returns exact integer logs", () => {
    expect(formatExactText(logExact(fromString("2"), fromString("8")))).toBe("3");
    expect(formatExactText(logExact(fromString("10"), fromString("1")))).toBe("0");
  });

  it("falls back to approx otherwise", () => {
    expect(approx(logExact(fromString("2"), fromString("3")))).toBeCloseTo(Math.log2(3), 10);
  });
});
