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
    .replace(/,/g, ".")
    .replace(/x²/g, "x^2")
    .replace(/−/g, "-")
    .replace(/≥/g, ">=")
    .replace(/≤/g, "<=")
    .replace(/≠/g, "!=");
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
    s.includes("!")
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

export function parseEquation(input: string): ParsedEquation | null {
  const raw = input.trim();
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
  const s = clean(raw);
  if (s === "") return null;

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

  const kv = s.includes(";") && !s.includes("x") && !s.includes("y") ? kvPairs(s) : null;
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
