import { ZERO, cmp, div, mul } from "../exact/rational";
import { exactOf, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational, resultLatex } from "./types";

const L = formatRatLatex;

const twDwusiecznej: FormulaDef = {
  id: "tw-dwusiecznej",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Twierdzenie o dwusiecznej kąta",
  latex: "\\frac{|AD|}{|DB|} = \\frac{|AC|}{|BC|}",
  vars: [
    { id: "AD", label: "AD" },
    { id: "DB", label: "DB" },
    { id: "AC", label: "AC" },
    { id: "BC", label: "BC" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): ReturnType<typeof asRational> => asRational(known[id], id);
    let value: Exact;
    let transform: string;
    let subst: string;
    let num: string;
    if (unknown === "AD") {
      const DB = g("DB");
      const AC = g("AC");
      const BC = g("BC");
      const prod = mul(DB, AC);
      value = exactOf(div(prod, BC));
      transform = "AD = \\frac{DB \\cdot AC}{BC}";
      subst = `AD = \\frac{${L(DB)} \\cdot ${L(AC)}}{${L(BC)}}`;
      num = `DB \\cdot AC = ${L(prod)}`;
    } else if (unknown === "DB") {
      const AD = g("AD");
      const AC = g("AC");
      const BC = g("BC");
      const prod = mul(AD, BC);
      value = exactOf(div(prod, AC));
      transform = "DB = \\frac{AD \\cdot BC}{AC}";
      subst = `DB = \\frac{${L(AD)} \\cdot ${L(BC)}}{${L(AC)}}`;
      num = `AD \\cdot BC = ${L(prod)}`;
    } else if (unknown === "AC") {
      const AD = g("AD");
      const DB = g("DB");
      const BC = g("BC");
      const prod = mul(AD, BC);
      value = exactOf(div(prod, DB));
      transform = "AC = \\frac{AD \\cdot BC}{DB}";
      subst = `AC = \\frac{${L(AD)} \\cdot ${L(BC)}}{${L(DB)}}`;
      num = `AD \\cdot BC = ${L(prod)}`;
    } else {
      const AD = g("AD");
      const DB = g("DB");
      const AC = g("AC");
      const prod = mul(DB, AC);
      value = exactOf(div(prod, AD));
      transform = "BC = \\frac{DB \\cdot AC}{AD}";
      subst = `BC = \\frac{${L(DB)} \\cdot ${L(AC)}}{${L(AD)}}`;
      num = `DB \\cdot AC = ${L(prod)}`;
    }
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: transform },
        { title: "2. Podstawienie danych", body: subst },
        { title: "3. Licznik", body: num },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

const siecznaStyczna: FormulaDef = {
  id: "sieczna-styczna",
  subject: "matematyka",
  topic: "Planimetria",
  name: "Twierdzenie o siecznej i stycznej",
  latex: "|PA| \\cdot |PB| = |PC|^2",
  vars: [
    { id: "PA", label: "PA" },
    { id: "PB", label: "PB" },
    { id: "PC", label: "PC" },
  ],
  mode: "nvar",
  outputId: "",
  outputLabel: "",
  solve(unknown, known, places): FormulaSolution {
    if (unknown === "PC") {
      const PA = asRational(known["PA"], "PA");
      const PB = asRational(known["PB"], "PB");
      if (cmp(PA, ZERO) <= 0 || cmp(PB, ZERO) <= 0) throw new Error("odcinki muszą być dodatnie");
      const prod = mul(PA, PB);
      const value = sqrtRational(prod);
      return {
        values: [value],
        steps: [
          { title: "1. Przekształcenie wzoru", body: "PC = \\sqrt{PA \\cdot PB}" },
          { title: "2. Podstawienie danych", body: `PC = \\sqrt{${L(PA)} \\cdot ${L(PB)}}` },
          { title: "3. Iloczyn", body: `PA \\cdot PB = ${L(prod)}` },
          { title: "4. Wynik", body: resultLatex("PC", value, places) },
        ],
      };
    }
    const PC = asRational(known["PC"], "PC");
    const other = unknown === "PA" ? "PB" : "PA";
    const o = asRational(known[other], other);
    if (cmp(PC, ZERO) <= 0 || cmp(o, ZERO) <= 0) throw new Error("odcinki muszą być dodatnie");
    const value = exactOf(div(mul(PC, PC), o));
    return {
      values: [value],
      steps: [
        { title: "1. Przekształcenie wzoru", body: `${unknown} = \\frac{PC^2}{${other}}` },
        { title: "2. Podstawienie danych", body: `${unknown} = \\frac{${L(PC)}^2}{${L(o)}}` },
        { title: "3. Kwadrat", body: `PC^2 = ${L(mul(PC, PC))}` },
        { title: "4. Wynik", body: resultLatex(unknown, value, places) },
      ],
    };
  },
};

export const MATH_TWIERDZENIA: FormulaDef[] = [twDwusiecznej, siecznaStyczna];
