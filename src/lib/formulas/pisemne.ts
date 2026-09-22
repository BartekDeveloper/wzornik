export interface WrittenNumber {
  digits: string[];
  isNegative: boolean;
  decimalIndex: number;
}

export interface WrittenStep {
  title: string;
  body: string;
  note?: string;
}

function parseNumber(s: string): WrittenNumber {
  const t = s.trim().replace(",", ".");
  if (t === "") throw new Error("puste wejście");
  const neg = t.startsWith("-");
  const u = neg ? t.slice(1) : t;
  if (!/^\d*\.?\d+$/.test(u)) throw new Error(`zły zapis liczby: ${s}`);
  const parts = u.split(".");
  const intPart = parts[0] || "0";
  const fracPart = parts[1] || "";
  return {
    digits: [...(intPart + fracPart)].filter((d) => d >= "0" && d <= "9"),
    isNegative: neg,
    decimalIndex: intPart.length,
  };
}

function toString(w: WrittenNumber): string {
  const intDigits = w.digits.slice(0, w.decimalIndex);
  while (intDigits.length > 1 && intDigits[0] === "0") intDigits.shift();
  const fracDigits = w.digits.slice(w.decimalIndex);
  const intStr = intDigits.join("") || "0";
  const fracStr = fracDigits.join("");
  return (w.isNegative ? "-" : "") + intStr + (fracStr ? "." + fracStr : "");
}

function fracLen(w: WrittenNumber): number {
  return w.digits.length - w.decimalIndex;
}

function align(a: WrittenNumber, b: WrittenNumber): [WrittenNumber, WrittenNumber] {
  const f = Math.max(fracLen(a), fracLen(b));
  const pa = [...a.digits, ...Array(f - fracLen(a)).fill("0")];
  const pb = [...b.digits, ...Array(f - fracLen(b)).fill("0")];
  const maxLen = Math.max(pa.length, pb.length);
  const A = [...Array(maxLen - pa.length).fill("0"), ...pa];
  const B = [...Array(maxLen - pb.length).fill("0"), ...pb];
  const decIdx = maxLen - f;
  return [
    { digits: A, isNegative: a.isNegative, decimalIndex: decIdx },
    { digits: B, isNegative: b.isNegative, decimalIndex: decIdx },
  ];
}

function padLeft(cells: string[], n: number): string[] {
  return [...Array(Math.max(0, n - cells.length)).fill("\\phantom{0}"), ...cells];
}

function rowCells(digits: string[], decFromRight: number, m: number): string {
  const cells = padLeft(digits, decFromRight > 0 ? m - 1 : m);
  if (decFromRight > 0 && decFromRight < cells.length) {
    cells.splice(cells.length - decFromRight, 0, ".");
  }
  return cells.join(" & ");
}

function dashRow(m: number): string {
  return Array(m).fill("\\text{-}").join(" & ");
}

function absStr(w: WrittenNumber): string {
  return toString({ ...w, isNegative: false });
}

function withSign(steps: WrittenStep[], neg: boolean, rule: string): WrittenStep[] {
  const bumped = steps.map((s) => ({
    ...s,
    title: s.title.replace(/^(\d+)\./, (_m, d) => `${Number(d) + 1}.`),
  }));
  const out: WrittenStep[] = [{ title: "1. Reguła znaków", body: rule }, ...bumped];
  if (neg) {
    const last = out[out.length - 1];
    if (last && last.title.includes("Wynik")) last.body = last.body.replace(/^= /, "= -");
  }
  return out;
}

function ruleOnly(equation: string): WrittenStep[] {
  return [
    { title: "1. Reguła znaków", body: equation },
    { title: "2. Wynik", body: "= 0" },
  ];
}

export function addWritten(aStr: string, bStr: string): WrittenStep[] {
  const a = parseNumber(aStr);
  const b = parseNumber(bStr);
  if (!a.isNegative && !b.isNegative) return addAbs(aStr, bStr);
  const A = absStr(a);
  const B = absStr(b);
  if (a.isNegative === b.isNegative) {
    return withSign(addAbs(A, B), true, `${aStr} + ${bStr} = -(${A} + ${B})`);
  }
  const c = compareAbs(a, b);
  if (c === 0) return ruleOnly(`${aStr} + ${bStr} = 0`);
  const big = c > 0 ? A : B;
  const small = c > 0 ? B : A;
  const steps = subColumns(parseNumber(big), parseNumber(small));
  return withSign(
    steps,
    c > 0 ? a.isNegative : b.isNegative,
    `${aStr} + ${bStr} = ${(c > 0 ? a.isNegative : b.isNegative) ? "-" : ""}(${big} - ${small})`,
  );
}

function addAbs(aStr: string, bStr: string): WrittenStep[] {
  const [A, B] = align(parseNumber(aStr), parseNumber(bStr));
  const n = A.digits.length;
  let carry = 0;
  const result: string[] = [];
  const carries: string[] = Array(n).fill("");
  for (let i = n - 1; i >= 0; i--) {
    const sum = parseInt(A.digits[i], 10) + parseInt(B.digits[i], 10) + carry;
    carry = sum >= 10 ? 1 : 0;
    if (carry && i > 0) carries[i - 1] = "1";
    result.unshift(String(sum % 10));
  }
  if (carry) result.unshift("1");
  const decIdx = A.decimalIndex + (carry ? 1 : 0);
  const res: WrittenNumber = { digits: result, isNegative: false, decimalIndex: decIdx };
  const m = result.length + (result.length - decIdx > 0 ? 1 : 0);
  const f = result.length - decIdx;
  const lines = ["\\begin{aligned}"];
  if (carries.some((c) => c)) {
    lines.push(
      `& ${rowCells(
        carries.map((c) => (c ? `\\textcolor{blue}{${c}}` : "\\phantom{0}")),
        f,
        m,
      )} \\\\`,
    );
  }
  lines.push(`& ${rowCells(A.digits, f, m)} \\\\`);
  lines.push(`+\\quad & ${rowCells(B.digits, f, m)} \\\\`);
  lines.push(`& ${dashRow(m)} \\\\`);
  lines.push(`& ${rowCells(result, f, m)} \\\\`);
  lines.push("\\end{aligned}");
  return [
    { title: "1. Zapis kolumnowy", body: lines.join("\n") },
    { title: "2. Wynik", body: `= ${toString(res)}` },
  ];
}

export function subWritten(aStr: string, bStr: string): WrittenStep[] {
  const A = parseNumber(aStr);
  const B = parseNumber(bStr);
  if (!A.isNegative && !B.isNegative) {
    if (compareAbs(A, B) < 0) {
      const r = subAbs(B, A);
      return [
        {
          title: "1. Kolejność",
          body: `|${aStr}| < |${bStr}|`,
          note: `liczę ${bStr} - ${aStr} i dopisuję minus`,
        },
        { title: "2. Wynik", body: `= -${toString(r)}` },
      ];
    }
    return subColumns(A, B);
  }
  const S = absStr(A);
  const T = absStr(B);
  if (A.isNegative === B.isNegative) {
    const c = compareAbs(A, B);
    if (c === 0) return ruleOnly(`${aStr} - ${bStr} = 0`);
    const big = c > 0 ? S : T;
    const small = c > 0 ? T : S;
    const neg = c > 0 ? A.isNegative : !A.isNegative;
    return withSign(
      subColumns(parseNumber(big), parseNumber(small)),
      neg,
      `${aStr} - ${bStr} = ${neg ? "-" : ""}(${big} - ${small})`,
    );
  }
  return withSign(
    addAbs(S, T),
    A.isNegative,
    `${aStr} - ${bStr} = ${A.isNegative ? "-" : ""}(${S} + ${T})`,
  );
}

function subColumns(A: WrittenNumber, B: WrittenNumber): WrittenStep[] {
  const [AA, BB] = align(A, B);
  const n = AA.digits.length;
  let borrow = 0;
  let result: string[] = [];
  const borrows: string[] = Array(n).fill("");
  for (let i = n - 1; i >= 0; i--) {
    let da = parseInt(AA.digits[i], 10) - borrow;
    const db = parseInt(BB.digits[i], 10);
    if (da < db) {
      da += 10;
      borrow = 1;
      if (i > 0) borrows[i - 1] = "1";
    } else {
      borrow = 0;
    }
    result.unshift(String(da - db));
  }
  let decIdx = AA.decimalIndex;
  while (result.length > decIdx + 1 && result[0] === "0") {
    result = result.slice(1);
    decIdx -= 1;
  }
  const res: WrittenNumber = { digits: result, isNegative: false, decimalIndex: decIdx };
  const f = result.length - decIdx;
  const m = result.length + (f > 0 ? 1 : 0);
  const lines = ["\\begin{aligned}"];
  if (borrows.some((c) => c)) {
    lines.push(
      `& ${rowCells(
        borrows.map((c) => (c ? `\\textcolor{red}{${c}}` : "\\phantom{0}")),
        f,
        m,
      )} \\\\`,
    );
  }
  lines.push(`& ${rowCells(AA.digits, f, m)} \\\\`);
  lines.push(`-\\quad & ${rowCells(BB.digits, f, m)} \\\\`);
  lines.push(`& ${dashRow(m)} \\\\`);
  lines.push(`& ${rowCells(result, f, m)} \\\\`);
  lines.push("\\end{aligned}");
  return [
    { title: "1. Zapis kolumnowy", body: lines.join("\n") },
    { title: "2. Wynik", body: `= ${toString(res)}` },
  ];
}

function compareAbs(a: WrittenNumber, b: WrittenNumber): number {
  const [A, B] = align(a, b);
  for (let i = 0; i < A.digits.length; i++) {
    const da = parseInt(A.digits[i], 10);
    const db = parseInt(B.digits[i], 10);
    if (da !== db) return da > db ? 1 : -1;
  }
  return 0;
}

function subAbs(a: WrittenNumber, b: WrittenNumber): WrittenNumber {
  const [A, B] = align(a, b);
  const n = A.digits.length;
  let borrow = 0;
  let result: string[] = [];
  for (let i = n - 1; i >= 0; i--) {
    let da = parseInt(A.digits[i], 10) - borrow;
    const db = parseInt(B.digits[i], 10);
    if (da < db) {
      da += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }
    result.unshift(String(da - db));
  }
  let decIdx = A.decimalIndex;
  while (result.length > decIdx + 1 && result[0] === "0") {
    result = result.slice(1);
    decIdx -= 1;
  }
  return { digits: result, isNegative: false, decimalIndex: decIdx };
}

export function mulWritten(aStr: string, bStr: string): WrittenStep[] {
  const a = parseNumber(aStr);
  const b = parseNumber(bStr);
  if (!a.isNegative && !b.isNegative) return mulAbs(aStr, bStr);
  const A = absStr(a);
  const B = absStr(b);
  return withSign(
    mulAbs(A, B),
    a.isNegative !== b.isNegative,
    `${aStr} \\times ${bStr} = ${a.isNegative !== b.isNegative ? "-" : ""}(${A} \\times ${B})`,
  );
}

function mulAbs(aStr: string, bStr: string): WrittenStep[] {
  const a = parseNumber(aStr);
  const b = parseNumber(bStr);
  const totalDec = fracLen(a) + fracLen(b);
  const aDigits = a.digits.map((d) => parseInt(d, 10));
  const bDigits = b.digits.map((d) => parseInt(d, 10));
  const partials: number[][] = [];
  for (let i = bDigits.length - 1; i >= 0; i--) {
    let carry = 0;
    const row: number[] = [];
    for (let j = aDigits.length - 1; j >= 0; j--) {
      const prod = aDigits[j] * bDigits[i] + carry;
      carry = Math.floor(prod / 10);
      row.unshift(prod % 10);
    }
    if (carry) row.unshift(carry);
    const shift = bDigits.length - 1 - i;
    for (let s = 0; s < shift; s++) row.push(0);
    partials.push(row);
  }
  const maxLen = Math.max(...partials.map((p) => p.length));
  let carry = 0;
  let result: number[] = [];
  for (let k = 0; k < maxLen; k++) {
    let sum = carry;
    for (const p of partials) {
      if (k < p.length) sum += p[p.length - 1 - k];
    }
    carry = Math.floor(sum / 10);
    result.unshift(sum % 10);
  }
  while (carry) {
    result.unshift(carry % 10);
    carry = Math.floor(carry / 10);
  }
  while (result.length > totalDec + 1 && result[0] === 0) result = result.slice(1);
  const res: WrittenNumber = {
    digits: result.map(String),
    isNegative: false,
    decimalIndex: result.length - totalDec,
  };
  const m = Math.max(maxLen, result.length) + (totalDec > 0 ? 1 : 0);
  const lines = ["\\begin{aligned}"];
  lines.push(`& ${rowCells(aDigits.map(String), fracLen(a), m)} \\\\`);
  lines.push(`\\times\\quad & ${rowCells(bDigits.map(String), fracLen(b), m)} \\\\`);
  lines.push(`& ${dashRow(m)} \\\\`);
  for (const p of partials) lines.push(`& ${rowCells(p.map(String), 0, m)} \\\\`);
  lines.push(`& ${dashRow(m)} \\\\`);
  lines.push(`& ${rowCells(result.map(String), totalDec, m)} \\\\`);
  lines.push("\\end{aligned}");
  return [
    { title: "1. Częściowe iloczyny", body: lines.join("\n") },
    { title: "2. Wynik", body: `= ${toString(res)}` },
  ];
}

function digitsWithPoint(digits: number[], pointPos: number): string {
  const s = digits.join("");
  if (pointPos <= 0 || pointPos >= digits.length) return s;
  return `${s.slice(0, pointPos)}.${s.slice(pointPos)}`;
}

export function divWritten(aStr: string, bStr: string, maxFrac = 2): WrittenStep[] {
  const a = parseNumber(aStr);
  const b = parseNumber(bStr);
  if (!a.isNegative && !b.isNegative) return divAbs(aStr, bStr, maxFrac);
  const A = absStr(a);
  const B = absStr(b);
  return withSign(
    divAbs(A, B, maxFrac),
    a.isNegative !== b.isNegative,
    `${aStr} : ${bStr} = ${a.isNegative !== b.isNegative ? "-" : ""}(${A} : ${B})`,
  );
}

export interface PeriodExpansion {
  int: string;
  pre: string;
  per: string;
  capped: boolean;
  remainder: bigint;
  trail: string[];
}

function longDivideCore(
  digits: number[],
  splitAt: number,
  q: bigint,
  maxFrac: number,
): PeriodExpansion {
  const out: bigint[] = [];
  let work = 0n;
  const trail: string[] = [];
  const seen = new Map<bigint, number>();
  let periodFrom = -1;
  let pos = 0;
  for (;;) {
    if (pos >= digits.length) {
      if (work === 0n) break;
      const prev = seen.get(work);
      if (prev !== undefined) {
        periodFrom = prev;
        break;
      }
      if (out.length - splitAt >= maxFrac) break;
      seen.set(work, out.length);
      work = work * 10n;
    } else {
      work = work * 10n + BigInt(digits[pos]!);
      pos++;
    }
    if (work < q) {
      out.push(0n);
      continue;
    }
    const d = work / q;
    const prod = d * q;
    const rem = work - prod;
    out.push(d);
    trail.push(`${work} - ${prod} = ${rem}`);
    work = rem;
  }
  const intDigits = out.slice(0, splitAt).map(String);
  while (intDigits.length > 1 && intDigits[0] === "0") intDigits.shift();
  const int = intDigits.join("") || "0";
  if (periodFrom >= 0) {
    const pre = out.slice(splitAt, periodFrom).map(String).join("");
    let per = out.slice(periodFrom).map(String).join("");
    while (
      per.length % 2 === 0 &&
      per.length > 0 &&
      per.slice(0, per.length / 2) === per.slice(per.length / 2)
    ) {
      per = per.slice(0, per.length / 2);
    }
    return { int, pre, per, capped: false, remainder: 0n, trail };
  }
  const frac = out.slice(splitAt).map(String);
  while (frac.length > 0 && frac[frac.length - 1] === "0") frac.pop();
  return { int, pre: frac.join(""), per: "", capped: work !== 0n, remainder: work, trail };
}

export function expandPeriod(p: bigint, q: bigint, maxFrac: number): PeriodExpansion {
  if (q <= 0n) throw new Error("dzielenie przez zero");
  if (p < 0n) throw new Error("expandPeriod: tylko liczby nieujemne");
  const pStr = p.toString();
  return longDivideCore(
    pStr.split("").map((d) => parseInt(d, 10)),
    pStr.length,
    q,
    maxFrac,
  );
}

function divAbs(aStr: string, bStr: string, maxFrac = 2): WrittenStep[] {
  const a = parseNumber(aStr);
  const b = parseNumber(bStr);
  if (b.digits.every((d) => d === "0")) throw new Error("dzielenie przez zero");
  const steps: WrittenStep[] = [];
  const k = fracLen(b);
  const dd: number[] = [...a.digits.map((d) => parseInt(d, 10)), ...Array(k).fill(0)];
  const pointPos = a.decimalIndex + k;
  const divNum = b.digits.reduce((acc, d) => acc * 10n + BigInt(d), 0n);
  if (k > 0 || fracLen(a) > 0) {
    steps.push({
      title: "1. Przesunięcie przecinka",
      body: `${digitsWithPoint(
        a.digits.map((d) => parseInt(d, 10)),
        a.decimalIndex,
      )} : ${digitsWithPoint(
        b.digits.map((d) => parseInt(d, 10)),
        b.decimalIndex,
      )} = ${digitsWithPoint(dd, pointPos)} : ${b.digits.join("")} \\; (\\times 10^{${k}})`,
    });
  }
  const ex = longDivideCore(dd, pointPos, divNum, maxFrac);
  const qStr =
    ex.per !== ""
      ? `${ex.int}.${ex.pre}(${ex.per})`
      : ex.pre !== ""
        ? `${ex.int}.${ex.pre}`
        : ex.int;
  const lines = ["\\begin{aligned}"];
  lines.push(
    `& ${digitsWithPoint(dd, pointPos)} : ${b.digits.join("")} = ${qStr.split("").join(" ")} \\\\`,
  );
  for (const t of ex.trail) lines.push(`& ${t} \\\\`);
  if (ex.remainder !== 0n) lines.push(`& \\text{reszta } ${ex.remainder} \\\\`);
  lines.push("\\end{aligned}");
  steps.push({ title: `${steps.length + 1}. Dzielenie pod kreską`, body: lines.join("\n") });
  steps.push({
    title: `${steps.length + 1}. Wynik`,
    body: `= ${qStr}${ex.remainder !== 0n ? ` \\text{ r } ${ex.remainder}` : ""}`,
    note:
      ex.remainder !== 0n
        ? `reszta ${ex.remainder} (ograniczono do ${maxFrac} miejsc)`
        : ex.per !== ""
          ? "ułamek okresowy — cyfry w nawiasie powtarzają się w nieskończoność"
          : undefined,
  });
  return steps;
}

export function hornerTableWritten(coeffs: number[], x0: number): WrittenStep[] {
  const n = coeffs.length;
  const result: number[] = [coeffs[0]];
  for (let i = 1; i < n; i++) {
    result.push(coeffs[i] + result[i - 1] * x0);
  }
  const remainder = result[n - 1];
  const quotient = result.slice(0, -1);
  return [
    {
      title: "1. Schemat Hornera",
      body: `\\begin{aligned} x_0 &= ${x0} \\\\ a &= ${coeffs.join(" & ")} \\\\ wiersz &= ${result.join(" & ")} \\end{aligned}`,
    },
    {
      title: "2. Wynik",
      body: `W(${x0}) = ${remainder}, \\; \\text{iloraz} = ${quotient.join(", ")}`,
    },
  ];
}
