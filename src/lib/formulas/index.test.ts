import { describe, expect, it } from "vitest";
import { FORMULAS, SUBJECTS, formulasBySubject, getFormula } from "./index";

describe("getFormula", () => {
  it("finds by subject and id", () => {
    const f = getFormula("matematyka", "pitagoras");
    expect(f?.name).toContain("Pitagorasa");
  });

  it("returns undefined for unknown keys", () => {
    expect(getFormula("matematyka", "nie-ma")).toBeUndefined();
    expect(getFormula("chemia", "pitagoras")).toBeUndefined();
  });

  it("covers every formula exactly once", () => {
    expect(FORMULAS.every((f) => getFormula(f.subject, f.id) === f)).toBe(true);
    expect(FORMULAS.every((f) => SUBJECTS.some((s) => s.id === f.subject))).toBe(true);
    expect(formulasBySubject("geografia").every((f) => f.subject === "geografia")).toBe(true);
  });
});
