import { describe, expect, it } from "vitest";
import { FORMULAS } from "./formulas/index";
import { getDescription } from "./descriptions";

describe("descriptions", () => {
  it("every formula has a non-empty description", () => {
    for (const f of FORMULAS) {
      const d = getDescription(f.id);
      expect(d, f.id).toBeTruthy();
      expect(d!.length).toBeGreaterThan(10);
    }
  });
});
