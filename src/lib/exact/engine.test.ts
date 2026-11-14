import { describe, expect, it } from "vitest";
import { binom, factorial, fromString } from "./rational";
import { approx, logExact, parseExact, rootRational, trigExact } from "./exact";
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

describe("rootRational", () => {
  it("finds exact integer roots", () => {
    expect(formatExactText(rootRational(fromString("16"), 4))).toBe("2");
    expect(formatExactText(rootRational(fromString("27"), 3))).toBe("3");
    expect(formatExactText(rootRational(fromString("1/4"), 2))).toBe("1/2");
    expect(formatExactText(rootRational(fromString("-8"), 3))).toBe("-2");
  });

  it("throws for irrational and invalid input", () => {
    expect(() => rootRational(fromString("2"), 2)).toThrow();
    expect(() => rootRational(fromString("-4"), 2)).toThrow();
    expect(() => rootRational(fromString("8"), 1)).toThrow();
  });
});

describe("parseExact periods", () => {
  it("parses repeating decimals", () => {
    expect(formatExactText(parseExact("0.(3)"))).toBe("1/3");
    expect(formatExactText(parseExact("0.(6)"))).toBe("2/3");
    expect(formatExactText(parseExact("1.2(34)"))).toBe("611/495");
    expect(formatExactText(parseExact("-0.(6)"))).toBe("-2/3");
    expect(formatExactText(parseExact("2.(0)"))).toBe("2");
  });

  it("rejects malformed periods", () => {
    expect(() => parseExact("0.()")).toThrow();
    expect(() => parseExact("0.(a)")).toThrow();
    expect(formatExactText(parseExact("(3)"))).toBe("1/3");
  });
});

describe("parseExact radicals", () => {
  it("parses √n and coefficient forms", () => {
    expect(formatExactText(parseExact("√3"))).toBe("√3");
    expect(formatExactText(parseExact("2√3"))).toBe("2√3");
    expect(formatExactText(parseExact("√3/2"))).toBe("(1/2·√3)");
    expect(formatExactText(parseExact("-3√2/4"))).toBe("(-3/4·√2)");
    expect(formatExactText(parseExact("sqrt(5)"))).toBe("√5");
    expect(formatExactText(parseExact("2sqrt(3)"))).toBe("2√3");
  });

  it("simplifies perfect squares and composite radicands", () => {
    expect(formatExactText(parseExact("√4"))).toBe("2");
    expect(formatExactText(parseExact("2√4"))).toBe("4");
    expect(formatExactText(parseExact("√12"))).toBe("2√3");
    expect(formatExactText(parseExact("√0"))).toBe("0");
  });

  it("rejects negative radicands", () => {
    expect(() => parseExact("√-4")).toThrow();
  });
});

describe("parseExact pi fractions", () => {
  it("parses π with coefficients and denominators", () => {
    expect(formatExactText(parseExact("π"))).toBe("π");
    expect(formatExactText(parseExact("2π"))).toBe("2π");
    expect(formatExactText(parseExact("π/6"))).toBe("(1/6·π)");
    expect(formatExactText(parseExact("2π/3"))).toBe("(2/3·π)");
    expect(formatExactText(parseExact("-π/4"))).toBe("(-1/4·π)");
    expect(formatExactText(parseExact("3π/2"))).toBe("(3/2·π)");
    expect(formatExactText(parseExact("25π"))).toBe("25π");
  });

  it("keeps approximate value close to Math.PI fractions", () => {
    expect(approx(parseExact("π/6"))).toBeCloseTo(Math.PI / 6, 10);
    expect(approx(parseExact("2π/3"))).toBeCloseTo((2 * Math.PI) / 3, 10);
    expect(approx(parseExact("-π/4"))).toBeCloseTo(-Math.PI / 4, 10);
  });
});
