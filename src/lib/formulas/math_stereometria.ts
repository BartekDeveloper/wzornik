import { add, cmp, div, mul, of, sub, ZERO } from "../exact/rational";
import { addExact, approx, approxOnly, exactOf, mulRat, sqrtRational } from "../exact/exact";
import type { Exact } from "../exact/exact";
import { formatDecimal, formatLatex, formatRatLatex } from "../exact/format";
import type { FormulaDef, FormulaSolution } from "./types";
import { asRational } from "./types";

const L = formatRatLatex;

const PI: Exact = { rat: ZERO, irr: { type: "pi", coef: { p: 1n, q: 1n } } };

const show = (e: Exact, places: number): string => {
  const lx = formatLatex(e);
  const dc = formatDecimal(e, places);
  return lx === dc ? lx : `${lx} \\approx ${dc}`;
};

const checkPositive = (r: { p: bigint; q: bigint }, label: string): void => {
  if (cmp(r, ZERO) <= 0) throw new Error(`${label} musi być dodatnia`);
};

const prostopadloscian: FormulaDef = {
  id: "pole-przekatna-prostopadloscianu",
  subject: "matematyka",
  topic: "Stereometria",
  name: "Prostopadłościan i sześcian: pole, przekątna, objętość",
  latex: "P_c = 2(ab+bc+ac), \\; d = \\sqrt{a^2+b^2+c^2}, \\; V = abc",
  vars: [
    { id: "a", label: "a" },
    { id: "b", label: "b" },
    { id: "c", label: "c" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "P_c, d, V",
  solve(_unknown, known, places): FormulaSolution {
    const a = asRational(known["a"], "a");
    const b = asRational(known["b"], "b");
    const c = asRational(known["c"], "c");
    checkPositive(a, "a");
    checkPositive(b, "b");
    checkPositive(c, "c");
    const ab = mul(a, b);
    const bc = mul(b, c);
    const ac = mul(a, c);
    const Pc = mul(of(2), add(add(ab, bc), ac));
    const d2 = add(add(mul(a, a), mul(b, b)), mul(c, c));
    const d = sqrtRational(d2);
    const V = mul(mul(a, b), c);
    const cube = cmp(a, b) === 0 && cmp(b, c) === 0;
    return {
      values: [exactOf(Pc), d, exactOf(V)],
      labels: ["P_c", "d", "V"],
      steps: [
        {
          title: "1. Pole całkowite",
          body: `P_c = 2(ab+bc+ac) = 2(${L(ab)}+${L(bc)}+${L(ac)}) = ${show(exactOf(Pc), places)}`,
        },
        {
          title: "2. Przekątna",
          body: `d = \\sqrt{a^2+b^2+c^2} = \\sqrt{${L(d2)}} = ${show(d, places)}`,
        },
        { title: "3. Objętość", body: `V = abc = ${show(exactOf(V), places)}` },
        {
          title: "4. Przypadek sześcianu",
          body: cube
            ? `a = b = c \\Rightarrow P_c = 6a^2 = ${show(exactOf(Pc), places)}, \\; d = a\\sqrt{3}, \\; V = a^3 = ${show(exactOf(V), places)}`
            : "a ≠ b ≠ c — bryła nie jest sześcianem",
        },
      ],
    };
  },
};

const graniastoslupOstrolup: FormulaDef = {
  id: "pole-graniastoslupa-ostroslupa",
  subject: "matematyka",
  topic: "Stereometria",
  name: "Graniastosłup prosty i ostrosłup prawidłowy",
  latex: "P_c = 2P_b + P_{bocz}, \\; P_c = P_b + P_{bocz}",
  vars: [
    {
      id: "typ",
      label: "bryła",
      kind: "select",
      options: ["graniastoslup trojkatny", "ostrolup czworokatny"],
    },
    { id: "a", label: "a (bok)" },
    { id: "b", label: "b (bok)" },
    { id: "c", label: "c (bok)" },
    { id: "h", label: "h (wysokość)" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "P_b, P_c, V",
  solve(_unknown, known, places, selects): FormulaSolution {
    const typ = selects?.["typ"] ?? "graniastoslup trojkatny";
    if (typ === "graniastoslup trojkatny") {
      const a = asRational(known["a"], "a");
      const b = asRational(known["b"], "b");
      const c = asRational(known["c"], "c");
      const h = asRational(known["h"], "h");
      checkPositive(a, "a");
      checkPositive(b, "b");
      checkPositive(c, "c");
      checkPositive(h, "h");
      const p = div(add(add(a, b), c), of(2));
      if (cmp(sub(p, a), ZERO) <= 0 || cmp(sub(p, b), ZERO) <= 0 || cmp(sub(p, c), ZERO) <= 0)
        throw new Error("boki podstawy nie spełniają nierówności trójkąta");
      const prod = mul(mul(mul(p, sub(p, a)), sub(p, b)), sub(p, c));
      const Pb = sqrtRational(prod);
      const obwod = add(add(a, b), c);
      const Pbocz = exactOf(mul(obwod, h));
      const Pc = addExact(mulRat(Pb, of(2)), Pbocz);
      const V = mulRat(Pb, h);
      return {
        values: [Pb, Pc, V],
        labels: ["P_b", "P_c", "V"],
        steps: [
          {
            title: "1. Pole podstawy (Heron)",
            body: `P_b = \\sqrt{p(p-a)(p-b)(p-c)} = \\sqrt{${L(prod)}} = ${show(Pb, places)}`,
          },
          {
            title: "2. Pole boczne",
            body: `P_{bocz} = (a+b+c)\\cdot h = ${L(obwod)} \\cdot ${L(h)} = ${show(Pbocz, places)}`,
          },
          { title: "3. Pole całkowite", body: `P_c = 2P_b + P_{bocz} = ${show(Pc, places)}` },
          { title: "4. Objętość", body: `V = P_b \\cdot h = ${show(V, places)}` },
        ],
      };
    }
    const a = asRational(known["a"], "a");
    const h = asRational(known["h"], "h");
    checkPositive(a, "a");
    checkPositive(h, "h");
    const Pb = mul(a, a);
    const trawers = sqrtRational(add(mul(h, h), mul(mul(a, a), { p: 1n, q: 4n })));
    const Pbocz = mulRat(trawers, mul(of(2), a));
    const Pc = addExact(exactOf(Pb), Pbocz);
    const V = exactOf(div(mul(mul(a, a), h), of(3)));
    return {
      values: [exactOf(Pb), Pc, V],
      labels: ["P_b", "P_c", "V"],
      steps: [
        { title: "1. Pole podstawy", body: `P_b = a^2 = ${show(exactOf(Pb), places)}` },
        {
          title: "2. Wysokość ściany bocznej",
          body: `h_s = \\sqrt{h^2 + \\frac{a^2}{4}} = ${show(trawers, places)}`,
        },
        {
          title: "3. Pole boczne i całkowite",
          body: `P_{bocz} = 4\\cdot\\frac{1}{2}a\\cdot h_s = 2a\\cdot h_s = ${show(Pbocz, places)}, \\; P_c = P_b + P_{bocz} = ${show(Pc, places)}`,
        },
        { title: "4. Objętość", body: `V = \\frac{1}{3}a^2 h = ${show(V, places)}` },
      ],
    };
  },
};

const walec: FormulaDef = {
  id: "pole-walca",
  subject: "matematyka",
  topic: "Stereometria",
  name: "Walec: pola i objętość",
  latex: "P_{bocz} = 2\\pi r h, \\; P_c = 2\\pi r(r+h), \\; V = \\pi r^2 h",
  vars: [
    { id: "r", label: "r" },
    { id: "h", label: "h" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "P_bocz, P_c, V",
  solve(_unknown, known, places): FormulaSolution {
    const r = asRational(known["r"], "r");
    const h = asRational(known["h"], "h");
    checkPositive(r, "r");
    checkPositive(h, "h");
    const Pbocz = mulRat(PI, mul(mul(of(2), r), h));
    const Pc = mulRat(PI, mul(mul(of(2), r), add(r, h)));
    const V = mulRat(PI, mul(mul(r, r), h));
    return {
      values: [Pbocz, Pc, V],
      labels: ["P_bocz", "P_c", "V"],
      steps: [
        {
          title: "1. Pole boczne",
          body: `P_{bocz} = 2\\pi r h = 2\\pi \\cdot ${L(r)} \\cdot ${L(h)} = ${show(Pbocz, places)}`,
        },
        { title: "2. Pole całkowite", body: `P_c = 2\\pi r(r+h) = ${show(Pc, places)}` },
        { title: "3. Objętość", body: `V = \\pi r^2 h = ${show(V, places)}` },
      ],
    };
  },
};

const stozek: FormulaDef = {
  id: "pole-tworzaca-stozka",
  subject: "matematyka",
  topic: "Stereometria",
  name: "Stożek: tworząca, pola i objętość",
  latex:
    "l = \\sqrt{r^2+h^2}, \\; P_{bocz} = \\pi r l, \\; P_c = \\pi r(l+r), \\; V = \\frac{1}{3}\\pi r^2 h",
  vars: [
    { id: "r", label: "r" },
    { id: "h", label: "h" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "l, P_bocz, P_c, V",
  solve(_unknown, known, places): FormulaSolution {
    const r = asRational(known["r"], "r");
    const h = asRational(known["h"], "h");
    checkPositive(r, "r");
    checkPositive(h, "h");
    const l = sqrtRational(add(mul(r, r), mul(h, h)));
    let Pbocz: Exact;
    if (l.irr === null) Pbocz = mulRat(PI, mul(r, l.rat));
    else Pbocz = approxOnly(Math.PI * approx(exactOf(r)) * approx(l));
    const PcFull = addExact(Pbocz, mulRat(PI, mul(r, r)));
    const V = mulRat(PI, div(mul(mul(r, r), h), of(3)));
    return {
      values: [l, Pbocz, PcFull, V],
      labels: ["l", "P_bocz", "P_c", "V"],
      steps: [
        {
          title: "1. Tworząca",
          body: `l = \\sqrt{r^2+h^2} = \\sqrt{${L(mul(r, r))}+${L(mul(h, h))}} = ${show(l, places)}`,
        },
        {
          title: "2. Pole boczne",
          body: `P_{bocz} = \\pi r l = \\pi \\cdot ${L(r)} \\cdot ${show(l, places)} = ${show(Pbocz, places)}`,
        },
        { title: "3. Pole całkowite", body: `P_c = \\pi r(l+r) = ${show(PcFull, places)}` },
        { title: "4. Objętość", body: `V = \\frac{1}{3}\\pi r^2 h = ${show(V, places)}` },
      ],
    };
  },
};

const brylySciete: FormulaDef = {
  id: "bryly-sciete",
  subject: "matematyka",
  topic: "Stereometria",
  name: "Bryły ścięte: stożek i ostrosłup",
  latex: "V = \\frac{\\pi h}{3}(R^2+Rr+r^2), \\; V = \\frac{h}{3}(P_1+\\sqrt{P_1P_2}+P_2)",
  vars: [
    { id: "typ", label: "bryła", kind: "select", options: ["stozek sciaty", "ostroslup sciaty"] },
    { id: "R", label: "R (większy promień / pole)" },
    { id: "r", label: "r (mniejszy promień / pole)" },
    { id: "h", label: "h" },
  ],
  mode: "fixed",
  outputId: "w",
  outputLabel: "l, P_bocz, V",
  solve(_unknown, known, places, selects): FormulaSolution {
    const typ = selects?.["typ"] ?? "stozek sciaty";
    const R = asRational(known["R"], "R");
    const r = asRational(known["r"], "r");
    const h = asRational(known["h"], "h");
    checkPositive(R, "R");
    checkPositive(r, "r");
    checkPositive(h, "h");
    if (typ === "stozek sciaty") {
      if (cmp(R, r) < 0) throw new Error("R ≥ r");
      const dRr = sub(R, r);
      const l = sqrtRational(add(mul(h, h), mul(dRr, dRr)));
      let Pbocz: Exact;
      if (l.irr === null) Pbocz = mulRat(PI, mul(add(R, r), l.rat));
      else Pbocz = approxOnly(Math.PI * approx(exactOf(add(R, r))) * approx(l));
      const inner = add(mul(R, R), add(mul(R, r), mul(r, r)));
      const V = mulRat(PI, div(mul(h, inner), of(3)));
      return {
        values: [l, Pbocz, V],
        labels: ["l", "P_bocz", "V"],
        steps: [
          {
            title: "1. Tworząca",
            body: `l = \\sqrt{h^2+(R-r)^2} = \\sqrt{${L(mul(h, h))}+${L(mul(dRr, dRr))}} = ${show(l, places)}`,
          },
          { title: "2. Pole boczne", body: `P_{bocz} = \\pi(R+r)l = ${show(Pbocz, places)}` },
          {
            title: "3. Objętość",
            body: `V = \\frac{\\pi h}{3}(R^2+Rr+r^2) = ${show(V, places)}`,
          },
        ],
      };
    }
    const Rr = mul(R, r);
    const s = sqrtRational(Rr);
    const V = mulRat(addExact(exactOf(add(R, r)), s), div(h, of(3)));
    return {
      values: [V],
      labels: ["V"],
      steps: [
        {
          title: "1. Średnia proporcjonalna",
          body: `\\sqrt{P_1 P_2} = \\sqrt{${L(Rr)}} = ${show(s, places)}`,
        },
        {
          title: "2. Objętość",
          body: `V = \\frac{h}{3}(P_1+\\sqrt{P_1P_2}+P_2) = ${show(V, places)}`,
        },
      ],
    };
  },
};

export const MATH_STEREOMETRIA: FormulaDef[] = [
  prostopadloscian,
  graniastoslupOstrolup,
  walec,
  stozek,
  brylySciete,
];
