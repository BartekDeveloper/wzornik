import { describe, expect, it } from "vitest";
import { looksLikeEquation, parseEquation } from "./parse-formula";

describe("parseEquation", () => {
  it("parses the user example", () => {
    expect(parseEquation("4x^2 + -2x + 10 = 0")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "4", b: "-2", c: "10" },
    });
  });

  it("handles implicit coefficients and no spaces", () => {
    expect(parseEquation("x^2-5x+6=0")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "1", b: "-5", c: "6" },
    });
  });

  it("handles leading minus and superscript", () => {
    expect(parseEquation("-x²+x+1=0")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "-1", b: "1", c: "1" },
    });
  });

  it("falls through to linear", () => {
    expect(parseEquation("2x-4=0")).toEqual({
      subject: "matematyka",
      id: "funkcja-liniowa",
      values: { a: "2", b: "-4" },
    });
  });

  it("moves nonzero right side over", () => {
    expect(parseEquation("x^2-5x+6=1")).toEqual({
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: "1", b: "-5", c: "5" },
    });
  });

  it("rejects other letters and garbage", () => {
    expect(parseEquation("2y+3=0")).toBeNull();
    expect(parseEquation("delta")).toBeNull();
    expect(parseEquation("2x+3=0=0")).toBeNull();
    expect(parseEquation("5=5")).toBeNull();
  });
});

describe("looksLikeEquation", () => {
  it("detects equation-shaped input", () => {
    expect(looksLikeEquation("4x^2-2x+10=0")).toBe(true);
    expect(looksLikeEquation("delta")).toBe(false);
    expect(looksLikeEquation("koło")).toBe(false);
  });
});
