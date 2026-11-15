import { describe, expect, it } from "vitest";
import { FORMULAS, getFormula } from "./index";
import { exactToInput, getRelations, transferQuery } from "./relations";
import type { FormulaDef } from "./types";
import { exactOf } from "../exact/exact";
import { ZERO, of } from "../exact/rational";
import { approxOnly } from "../exact/exact";

const MATH_IDS = new Set(FORMULAS.filter((f) => f.subject === "matematyka").map((f) => f.id));

describe("relations", () => {
  it("każde ID relacji istnieje w FORMULAS (matematyka)", () => {
    for (const f of FORMULAS) {
      if (f.subject !== "matematyka") continue;
      const rel = getRelations(f.id);
      for (const d of [...rel.simpler, ...rel.harder]) {
        expect(MATH_IDS.has(d.id), `${f.id} → ${d.id}`).toBe(true);
      }
    }
  });

  it("relacja jest symetryczna i bez cykli własnych", () => {
    for (const id of MATH_IDS) {
      const rel = getRelations(id);
      expect(rel.simpler.map((d) => d.id)).not.toContain(id);
      expect(rel.harder.map((d) => d.id)).not.toContain(id);
      const simplerIds = rel.simpler.map((d) => d.id);
      const harderIds = rel.harder.map((d) => d.id);
      expect(simplerIds.filter((s) => harderIds.includes(s))).toEqual([]);
      for (const s of simplerIds) {
        expect(getRelations(s).harder.map((d) => d.id)).toContain(id);
      }
      for (const h of harderIds) {
        expect(getRelations(h).simpler.map((d) => d.id)).toContain(id);
      }
    }
  });

  it("przykład: delta widzi miejsca-zerowe-kwadratowej jako trudniejszy", () => {
    const rel = getRelations("delta");
    expect(rel.harder.map((d) => d.id)).toContain("miejsca-zerowe-kwadratowej");
    const back = getRelations("miejsca-zerowe-kwadratowej");
    expect(back.simpler.map((d) => d.id)).toContain("delta");
  });

  it("nieznany wzór zwraca puste listy", () => {
    const rel = getRelations("nie-ma-takiego");
    expect(rel.simpler).toEqual([]);
    expect(rel.harder).toEqual([]);
  });
});

describe("exactToInput", () => {
  it("rational → ułamek tekstowy", () => {
    expect(exactToInput(exactOf(of(2n, 3n)))).toBe("2/3");
  });

  it("π → forma parsowalna przez parseExact", () => {
    expect(exactToInput({ rat: ZERO, irr: { type: "pi", coef: of(2n, 3n) } })).toBe("2π/3");
  });

  it("√ → forma parsowalna przez parseExact", () => {
    expect(
      exactToInput({ rat: ZERO, irr: { type: "sqrt", coef: of(-3n, 4n), radicand: 2n } }),
    ).toBe("-3√2/4");
  });

  it("approx → null (nie przenosimy)", () => {
    expect(exactToInput(approxOnly(1.5))).toBeNull();
  });
});

describe("transferQuery", () => {
  const from = getFormula("matematyka", "delta")!;
  const to = getFormula("matematyka", "miejsca-zerowe-kwadratowej")!;

  it("przenosi wpisane wartości pasujące do input-vars celu", () => {
    const q = transferQuery(from, to, { inputs: { a: "1", b: "-5", c: "6" } });
    expect(q.v_a).toBe("1");
    expect(q.v_b).toBe("-5");
    expect(q.v_c).toBe("6");
  });

  it("pomija zmienne select/list celu", () => {
    const poc = getFormula("matematyka", "pochodna-ilorazu-iloczynu")!;
    const q = transferQuery(from, poc, { inputs: { typ: "iloczyn", a: "1" } });
    expect(Object.keys(q)).not.toContain("v_typ");
  });

  it("uzupełnia z wyliczonych wyników po labelach", () => {
    const q = transferQuery(from, to, {
      inputs: { a: "1", b: "-5" },
      values: [exactOf(of(6n))],
      labels: ["c"],
    });
    expect(q.v_c).toBe("6");
  });

  it("puste wyniki approx nie trafiają do query", () => {
    const q = transferQuery(from, to, {
      inputs: {},
      values: [approxOnly(1.5)],
      labels: ["a"],
    });
    expect(q.v_a).toBeUndefined();
  });

  it("def jako cel: query tylko z pasujących input-vars", () => {
    const def: FormulaDef = to;
    const q = transferQuery(def, from, { inputs: { b: "2" } });
    expect(q.v_b).toBe("2");
    expect(q.v_c).toBeUndefined();
  });
});
