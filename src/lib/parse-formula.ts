export interface ParsedEquation {
  subject: "matematyka";
  id: string;
  values: Record<string, string>;
}

function clean(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/\*/g, "")
    .replace(/,/g, ".")
    .replace(/x²/g, "x^2")
    .replace(/−/g, "-");
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

export function looksLikeEquation(q: string): boolean {
  const s = clean(q);
  return s.includes("x") && (s.includes("=") || s.includes("^"));
}

export function parseEquation(input: string): ParsedEquation | null {
  const s = clean(input);
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
    return finish(left.a - moved.a, left.b - moved.b, left.c - moved.c);
  }
  const parsed = parseSide(lhs);
  if (!parsed) return null;
  return finish(parsed.a, parsed.b, parsed.c);
}

function finish(a: number, b: number, c: number): ParsedEquation | null {
  if (a !== 0) {
    return {
      subject: "matematyka",
      id: "rownanie-kwadratowe",
      values: { a: String(a), b: String(b), c: String(c) },
    };
  }
  if (b !== 0) {
    return {
      subject: "matematyka",
      id: "funkcja-liniowa",
      values: { a: String(b), b: String(c) },
    };
  }
  return null;
}
