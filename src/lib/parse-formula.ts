export interface ParsedEquation {
  subject: "matematyka" | "chemia" | "geografia";
  id: string;
  values: Record<string, string>;
  selects?: Record<string, string>;
  label: string;
}

export const PARSE_LABELS: Record<string, string> = {
  "rownanie-kwadratowe": "równanie kwadratowe",
  "funkcja-liniowa": "funkcja liniowa",
  "uklad-rownan": "układ dwóch równań",
  "nierownosc-kwadratowa": "nierówność kwadratowa",
  "rownanie-wykladnicze": "równanie wykładnicze",
  "rownanie-logarytmiczne": "równanie logarytmiczne",
  procent: "procent z liczby",
  potega: "potęga",
  pierwiastek: "pierwiastek",
  "ciag-arytmetyczny": "ciąg arytmetyczny",
  "ciag-geometryczny": "ciąg geometryczny",
  tales: "proporcja (Tales)",
  "skala-mapy": "skala mapy",
  "stezenie-procentowe": "stężenie procentowe",
  "rozklad-wielomianu": "rozkład wielomianu",
  "wartosc-bezwzgledna": "wartość bezwzględna",
  "postacie-kwadratowej": "postacie funkcji kwadratowej",
  "rownanie-trygonometryczne": "równanie trygonometryczne",
};

export function parseLabel(id: string): string {
  return PARSE_LABELS[id] ?? id;
}

const NUM = String.raw`[+-]?(?:\d+(?:\.\d+)?|\.\d+)`;

function clean(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\*/g, "")
    .replace(/·/g, "")
    .replace(/,(?=[a-z]+[0-9]?=)/g, ";")
    .replace(/,/g, ".")
    .replace(/x²/g, "x^2")
    .replace(/x³/g, "x^3")
    .replace(/x⁴/g, "x^4")
    .replace(/−/g, "-")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/≠/g, "!=");
}

function fmtNum(v: number): string {
  const t = Number(v.toFixed(9));
  return String(t);
}

function splitTerms(lhs: string): string[] {
  const normalized = lhs.startsWith("-") ? lhs : "+" + lhs;
  return normalized.split(/(?=[+-])/).filter((t) => t !== "" && t !== "+" && t !== "-");
}

function parseCoeff(raw: string): number | null {
  if (raw === "" || raw === "+") return 1;
  if (raw === "-") return -1;
  if (!/^[+-]?(\d+(\.\d+)?|\.\d+)$/.test(raw)) return null;
  const v = Number(raw);
  return Number.isFinite(v) ? v : null;
}

function parseSide(expr: string): { a: number; b: number; c: number } | null {
  let a = 0;
  let b = 0;
  let c = 0;
  for (const t of splitTerms(expr)) {
    if (t.includes("x^2")) {
      const coef = parseCoeff(t.replace("x^2", ""));
      if (coef === null) return null;
      a += coef;
    } else if (t.includes("x")) {
      const rest = t.replace("x", "");
      if (/[a-z]/.test(rest)) return null;
      const coef = parseCoeff(rest);
      if (coef === null) return null;
      b += coef;
    } else {
      if (/[a-z]/.test(t)) return null;
      const coef = parseCoeff(t);
      if (coef === null) return null;
      c += coef;
    }
  }
  return { a, b, c };
}

function parseLinXY(expr: string): { x: number; y: number; k: number } | null {
  let x = 0;
  let y = 0;
  let k = 0;
  for (const t of splitTerms(expr)) {
    if (t.includes("x")) {
      const rest = t.replace("x", "");
      if (/[a-z]/.test(rest)) return null;
      const coef = parseCoeff(rest);
      if (coef === null) return null;
      x += coef;
    } else if (t.includes("y")) {
      const rest = t.replace("y", "");
      if (/[a-z]/.test(rest)) return null;
      const coef = parseCoeff(rest);
      if (coef === null) return null;
      y += coef;
    } else {
      if (/[a-z]/.test(t)) return null;
      const coef = parseCoeff(t);
      if (coef === null) return null;
      k += coef;
    }
  }
  return { x, y, k };
}

function parseEqLinXY(eq: string): { x: number; y: number; k: number } | null {
  const parts = eq.split("=");
  if (parts.length !== 2) return null;
  const l = parseLinXY(parts[0]!);
  const r = parseLinXY(parts[1]!);
  if (!l || !r) return null;
  return { x: l.x - r.x, y: l.y - r.y, k: r.k - l.k };
}

function parsePolySide(expr: string): Record<number, number> | null {
  const coefs: Record<number, number> = {};
  for (const t of splitTerms(expr)) {
    const m = /^(.*?)x(?:\^(\d+))?$/.exec(t);
    if (m && t.includes("x")) {
      if (/[a-z]/.test(m[1]!)) return null;
      const coef = parseCoeff(m[1]!);
      if (coef === null) return null;
      const pw = m[2] === undefined ? 1 : Number(m[2]);
      if (pw > 6) return null;
      coefs[pw] = (coefs[pw] ?? 0) + coef;
    } else {
      if (/[a-z]/.test(t)) return null;
      const coef = parseCoeff(t);
      if (coef === null) return null;
      coefs[0] = (coefs[0] ?? 0) + coef;
    }
  }
  return coefs;
}

function tryPoly(s: string): ParsedEquation | null {
  if (!s.includes("x")) return null;
  const parts = s.split("=");
  if (parts.length > 2) return null;
  const l = parsePolySide(parts[0]!);
  const r = parts.length === 2 ? parsePolySide(parts[1]!) : {};
  if (!l || !r) return null;
  const deg = Math.max(0, ...Object.keys({ ...l, ...r }).map(Number));
  if (deg < 3 || deg > 4) return null;
  const get = (p: number): number => (l[p] ?? 0) - (r[p] ?? 0);
  if (get(deg) === 0) return null;
  const ids = ["a6", "a5", "a4", "a3", "a2", "a1", "a0"];
  const values: Record<string, string> = {};
  for (let p = 6; p >= 0; p--) {
    values[ids[6 - p]!] = p <= deg ? String(get(p)) : "0";
  }
  return {
    subject: "matematyka",
    id: "rozklad-wielomianu",
    values,
    selects: { deg: String(deg) },
    label: parseLabel("rozklad-wielomianu"),
  };
}

function num(s: string): number | null {
  if (!new RegExp(`^${NUM}$`).test(s)) return null;
  const v = Number(s);
  return Number.isFinite(v) ? v : null;
}

function kvPairs(s: string): Record<string, number> | null {
  const out: Record<string, number> = {};
  for (const part of s.split(";")) {
    const m = new RegExp(`^([a-z]+[0-9]?)=(${NUM})$`).exec(part);
    if (!m) return null;
    out[m[1]!] = Number(m[2]!);
  }
  return out;
}

export function looksLikeEquation(q: string): boolean {
  const s = clean(q);
  return (
    s.includes("x") ||
    s.includes("=") ||
    s.includes("^") ||
    s.includes("%") ||
    s.includes("√") ||
    s.includes("∛") ||
    s.includes("sqrt") ||
    s.includes("log") ||
    s.includes(";") ||
    s.includes(":") ||
    s.includes(">") ||
    s.includes("<") ||
    s.includes("!") ||
    s.includes("(")
  );
}

function finishQuad(a: number, b: number, c: number): ParsedEquation | null {
  if (a !== 0) {
    return {
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: String(a), b: String(b), c: String(c) },
      label: parseLabel("rownanie-kwadratowe"),
    };
  }
  if (b !== 0) {
    return {
      subject: "matematyka",
      id: "funkcja-liniowa",
      values: { a: String(b), b: String(c) },
      label: parseLabel("funkcja-liniowa"),
    };
  }
  return null;
}

function quadFromProduct(a: number, r1: number, r2: number): ParsedEquation {
  const b = -a * (r1 + r2);
  const c = a * r1 * r2;
  return {
    subject: "matematyka",
    id: "postacie-kwadratowej",
    values: { a: fmtNum(a), b: fmtNum(b), c: fmtNum(c) },
    label: parseLabel("postacie-kwadratowej"),
  };
}

function tryProduct(s: string): ParsedEquation | null {
  const P = String.raw`(?:\d+(?:\.\d+)?|\.\d+)`;
  let m = new RegExp(`^([+-]?(?:${P})?)\\(x([+-]${P})\\)\\(x([+-]${P})\\)(?:=0)?$`).exec(s);
  if (m) {
    const a = m[1] === undefined || m[1] === "" ? 1 : Number(m[1]);
    if (a !== 0) return quadFromProduct(a, -Number(m[2]!), -Number(m[3]!));
    return null;
  }
  m = new RegExp(`^x\\(x([+-]${P})\\)(?:=0)?$`).exec(s);
  if (m) {
    return quadFromProduct(1, 0, -Number(m[1]!));
  }
  return null;
}

export function parseEquation(input: string): ParsedEquation | null {
  const raw = input.trim();
  let s = clean(raw);
  if (s === "") return null;

  const fnPrefix = /^(?:[a-z]\(x\)|y)=(.+)$/.exec(s);
  if (fnPrefix) {
    const rest = fnPrefix[1]!;
    if (!rest.includes("y")) s = rest;
  }
  const rootMark = raw.match(/^[∛√]/) ? raw[0] : null;
  if (rootMark) {
    const rest = raw.slice(1).replace(/\s+/g, "");
    const m = num(rest);
    if (m === null || m < 0) return null;
    return {
      subject: "matematyka",
      id: "pierwiastek",
      values: { m: String(m), n: rootMark === "∛" ? "3" : "2" },
      label: parseLabel("pierwiastek"),
    };
  }
  const sysParts = s.split(/[\n;]/).filter((p) => p !== "");
  if (sysParts.length === 2 && s.includes("y")) {
    const e1 = parseEqLinXY(sysParts[0]!);
    const e2 = parseEqLinXY(sysParts[1]!);
    if (e1 && e2) {
      return {
        subject: "matematyka",
        id: "uklad-rownan",
        values: {
          a1: String(e1.x),
          b1: String(e1.y),
          c1: String(e1.k),
          a2: String(e2.x),
          b2: String(e2.y),
          c2: String(e2.k),
        },
        label: parseLabel("uklad-rownan"),
      };
    }
  }

  if (
    sysParts.length === 1 &&
    s.includes("y") &&
    s.includes("x") &&
    s.includes("=") &&
    !s.includes("x^")
  ) {
    const xy = parseEqLinXY(s);
    if (xy && xy.y !== 0) {
      const a = -xy.x / xy.y;
      const b = xy.k / xy.y;
      if (Number.isFinite(a) && Number.isFinite(b)) {
        return {
          subject: "matematyka",
          id: "funkcja-liniowa",
          values: { a: fmtNum(a), b: fmtNum(b) },
          label: parseLabel("funkcja-liniowa"),
        };
      }
    }
  }

  const trigEq =
    /^(sin|cos|tan|tg)\(x\)=(-?(?:\d+(?:\.\d+)?|\.\d+)(?:\/(?:\d+(?:\.\d+)?|\.\d+))?|√\d+(?:\/\d+)?)$/.exec(
      s,
    );
  if (trigEq) {
    return {
      subject: "matematyka",
      id: "rownanie-trygonometryczne",
      values: { a: trigEq[2]! },
      selects: { fn: trigEq[1] === "tan" ? "tg" : trigEq[1]! },
      label: parseLabel("rownanie-trygonometryczne"),
    };
  }

  const kv = s.includes(";") ? kvPairs(s) : null;
  if (kv) {
    if ("ms" in kv && "mr" in kv) {
      return {
        subject: "chemia",
        id: "stezenie-procentowe",
        values: { ms: String(kv["ms"]), mr: String(kv["mr"]) },
        label: parseLabel("stezenie-procentowe"),
      };
    }
    if ("r" in kv && "a1" in kv && "n" in kv) {
      return {
        subject: "matematyka",
        id: "ciag-arytmetyczny",
        values: {
          a1: String(kv["a1"]),
          r: String(kv["r"]),
          n: String(kv["n"]),
          ...(kv["an"] !== undefined ? { an: String(kv["an"]) } : {}),
        },
        label: parseLabel("ciag-arytmetyczny"),
      };
    }
    if ("q" in kv && "a1" in kv && "n" in kv) {
      return {
        subject: "matematyka",
        id: "ciag-geometryczny",
        values: {
          a1: String(kv["a1"]),
          q: String(kv["q"]),
          n: String(kv["n"]),
          ...(kv["an"] !== undefined ? { an: String(kv["an"]) } : {}),
        },
        label: parseLabel("ciag-geometryczny"),
      };
    }
    if ("a" in kv && "b" in kv && "c" in kv) {
      return {
        subject: "matematyka",
        id: "rownanie-kwadratowe",
        values: { a: String(kv["a"]), b: String(kv["b"]), c: String(kv["c"]) },
        label: parseLabel("rownanie-kwadratowe"),
      };
    }
    if ("a" in kv && "p" in kv && "q" in kv) {
      const a = kv["a"]!;
      const p = kv["p"]!;
      const q = kv["q"]!;
      return {
        subject: "matematyka",
        id: "postacie-kwadratowej",
        values: { a: String(a), b: String(-2 * a * p), c: String(a * p * p + q) },
        label: parseLabel("postacie-kwadratowej"),
      };
    }
    if ("a" in kv && "x1" in kv && "x2" in kv) {
      const a = kv["a"]!;
      const x1 = kv["x1"]!;
      const x2 = kv["x2"]!;
      return {
        subject: "matematyka",
        id: "postacie-kwadratowej",
        values: { a: String(a), b: String(-a * (x1 + x2)), c: String(a * x1 * x2) },
        label: parseLabel("postacie-kwadratowej"),
      };
    }
  }

  const ineq = new RegExp(`^(.*)(>=|<=|!=|>|<)(.*)$`).exec(s);
  if (ineq && s.includes("x")) {
    const opMap: Record<string, string> = { ">": ">", ">=": "≥", "<": "<", "<=": "≤", "!=": "≠" };
    const l = parseSide(ineq[1]!);
    const r = parseSide(ineq[3]!);
    if (l && r) {
      const a = l.a - r.a;
      const b = l.b - r.b;
      const c = l.c - r.c;
      if (a !== 0) {
        return {
          subject: "matematyka",
          id: "nierownosc-kwadratowa",
          values: { a: String(a), b: String(b), c: String(c) },
          selects: { op: opMap[ineq[2]!]! },
          label: parseLabel("nierownosc-kwadratowa"),
        };
      }
    }
  }

  const exp = new RegExp(`^(${NUM})\\^x=(${NUM})$`).exec(s);
  if (exp) {
    return {
      subject: "matematyka",
      id: "rownanie-wykladnicze",
      values: { a: exp[1]!, b: exp[2]! },
      label: parseLabel("rownanie-wykladnicze"),
    };
  }

  const log = new RegExp(`^log_?(${NUM})\\(x\\)=(${NUM})$`).exec(s);
  if (log) {
    return {
      subject: "matematyka",
      id: "rownanie-logarytmiczne",
      values: { a: log[1]!, c: log[2]! },
      label: parseLabel("rownanie-logarytmiczne"),
    };
  }

  const log10 = new RegExp(`^log\\(x\\)=(${NUM})$`).exec(s);
  if (log10) {
    return {
      subject: "matematyka",
      id: "rownanie-logarytmiczne",
      values: { a: "10", c: log10[1]! },
      label: parseLabel("rownanie-logarytmiczne"),
    };
  }

  const pct = new RegExp(`^(${NUM})%(?:z|of|\\*)(${NUM})$`).exec(s);
  if (pct) {
    return {
      subject: "matematyka",
      id: "procent",
      values: { p: pct[1]!, x: pct[2]! },
      label: parseLabel("procent"),
    };
  }

  const pw = new RegExp(`^(${NUM})\\^(${NUM})$`).exec(s);
  if (pw && !s.includes("x")) {
    return {
      subject: "matematyka",
      id: "potega",
      values: { p: pw[1]!, n: pw[2]! },
      label: parseLabel("potega"),
    };
  }

  const sq = new RegExp(`^sqrt\\((${NUM})\\)$`).exec(s);
  if (sq) {
    return {
      subject: "matematyka",
      id: "pierwiastek",
      values: { m: sq[1]!, n: "2" },
      label: parseLabel("pierwiastek"),
    };
  }

  const prop = new RegExp(`^([^=]+)/([^=]+)=([^=]+)/([^=]+)$`).exec(s);
  if (prop) {
    const parts = [prop[1]!, prop[2]!, prop[3]!, prop[4]!];
    const xCount = parts.filter((p) => p.includes("x")).length;
    if (xCount === 1) {
      const ids = ["a", "b", "c", "d"];
      const values: Record<string, string> = {};
      for (let i = 0; i < 4; i++) {
        if (!parts[i]!.includes("x")) values[ids[i]!] = parts[i]!;
      }
      if (Object.keys(values).length === 3) {
        return {
          subject: "matematyka",
          id: "tales",
          values,
          label: parseLabel("tales"),
        };
      }
    }
  }

  const scale = /^1:(\d+)$/.exec(s);
  if (scale) {
    return {
      subject: "geografia",
      id: "skala-mapy",
      values: { M: scale[1]! },
      label: parseLabel("skala-mapy"),
    };
  }

  if (!s.includes("x")) return null;

  const poly = tryPoly(s);
  if (poly) return poly;

  const product = tryProduct(s);
  if (product) return product;

  const canon = new RegExp(
    `^([+-]?(?:\\d+(?:\\.\\d+)?|\\.\\d+)?)\\(x([+-]${NUM})\\)\\^2([+-]${NUM})?(=0)?$`,
  ).exec(s);
  if (canon) {
    const rawA = canon[1]!;
    const a =
      rawA === undefined || rawA === "" || rawA === "+" ? 1 : rawA === "-" ? -1 : Number(rawA);
    const p = -Number(canon[2]!);
    const q = canon[3] === undefined || canon[3] === "=0" ? 0 : Number(canon[3]!);
    const b = -2 * a * p;
    const c = a * p * p + q;
    if ([a, b, c].every(Number.isFinite)) {
      return {
        subject: "matematyka",
        id: "postacie-kwadratowej",
        values: { a: String(a), b: String(b), c: String(c) },
        label: parseLabel("postacie-kwadratowej"),
      };
    }
  }

  const abs = new RegExp(`^\\|x((?:[+-]${NUM})?)\\|=(${NUM})$`).exec(s);
  if (abs) {
    const inner = abs[1]!;
    const w = abs[2]!;
    const a = inner === "" ? 0 : -Number(inner);
    if (Number.isFinite(a)) {
      return {
        subject: "matematyka",
        id: "wartosc-bezwzgledna",
        values: { a: String(a), w },
        label: parseLabel("wartosc-bezwzgledna"),
      };
    }
  }

  const parts = s.split("=");
  if (parts.length > 2) return null;
  const lhs = parts[0]!;
  const rhs = parts.length === 2 ? parts[1]! : "0";
  if (rhs !== "0" && rhs !== "+0" && rhs !== "-0") {
    const moved = parseSide(rhs);
    if (!moved) return null;
    const left = parseSide(lhs);
    if (!left) return null;
    return finishQuad(left.a - moved.a, left.b - moved.b, left.c - moved.c);
  }
  const parsed = parseSide(lhs);
  if (!parsed) return null;
  return finishQuad(parsed.a, parsed.b, parsed.c);
}
