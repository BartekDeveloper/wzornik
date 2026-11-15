import { trimNum } from "../exact/format";

export interface PlotPoint {
  x: number;
  y: number;
  label: string;
  kind: "zero" | "vertex" | "intercept";
}

export interface PlotBand {
  from: number;
  to: number;
}

export interface PlotData {
  fn: (x: number) => number;
  points: PlotPoint[];
  xMin: number;
  xMax: number;
  shade?: PlotBand[];
  secondaryFn?: (x: number) => number;
  asymptotes?: number[];
}

export interface SampledPlot extends PlotData {
  yMin: number;
  yMax: number;
}

export interface ViewState {
  cx: number;
  cy: number;
  halfW: number;
  halfH: number;
}

export interface ViewBounds {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export function initialView(data: PlotData): { view: ViewState; bounds: ViewBounds } {
  const s = sampleY(data);
  return {
    view: {
      cx: (s.xMin + s.xMax) / 2,
      cy: (s.yMin + s.yMax) / 2,
      halfW: (s.xMax - s.xMin) / 2,
      halfH: (s.yMax - s.yMin) / 2,
    },
    bounds: { xMin: s.xMin, xMax: s.xMax, yMin: s.yMin, yMax: s.yMax },
  };
}

export function clampView(v: ViewState, b: ViewBounds): ViewState {
  const xr = b.xMax - b.xMin;
  const yr = b.yMax - b.yMin;
  const exMin = b.xMin - 0.5 * xr;
  const exMax = b.xMax + 0.5 * xr;
  const eyMin = b.yMin - 0.5 * yr;
  const eyMax = b.yMax + 0.5 * yr;
  let { cx, cy, halfW, halfH } = v;
  halfW = Math.min(Math.max(halfW, xr * 0.01), xr * 2);
  halfH = Math.min(Math.max(halfH, yr * 0.01), yr * 2);
  cx = Math.min(Math.max(cx, exMin + halfW), exMax - halfW);
  cy = Math.min(Math.max(cy, eyMin + halfH), eyMax - halfH);
  if (exMin + halfW > exMax - halfW) cx = (exMin + exMax) / 2;
  if (eyMin + halfH > eyMax - halfH) cy = (eyMin + eyMax) / 2;
  return { cx, cy, halfW, halfH };
}

export function zoomView(v: ViewState, b: ViewBounds, factor: number): ViewState {
  return clampView({ ...v, halfW: v.halfW * factor, halfH: v.halfH * factor }, b);
}

export function panView(v: ViewState, b: ViewBounds, dx: number, dy: number): ViewState {
  return clampView({ ...v, cx: v.cx + dx, cy: v.cy + dy }, b);
}

function zeroPoint(x: number): PlotPoint {
  return { x, y: 0, label: `x₀ = ${trimNum(x)}`, kind: "zero" };
}

function frame(points: PlotPoint[], fn: (x: number) => number): PlotData {
  const xs = points.map((p) => p.x);
  let xMin = Math.min(...xs, -1);
  let xMax = Math.max(...xs, 1);
  if (xMax - xMin < 4) {
    const m = (xMin + xMax) / 2;
    xMin = m - 2;
    xMax = m + 2;
  } else {
    const pad = (xMax - xMin) * 0.2;
    xMin -= pad;
    xMax += pad;
  }
  return { fn, points, xMin, xMax };
}

export function quadraticPlot(a: number, b: number, c: number): PlotData | null {
  if (![a, b, c].every(Number.isFinite) || a === 0) return null;
  const fn = (x: number) => a * x * x + b * x + c;
  const d = b * b - 4 * a * c;
  const points: PlotPoint[] = [];
  if (d >= 0) {
    const s = Math.sqrt(d);
    points.push(zeroPoint((-b - s) / (2 * a)));
    if (d > 0) points.push(zeroPoint((-b + s) / (2 * a)));
  }
  const xv = -b / (2 * a);
  const yv = fn(xv);
  points.push({ x: xv, y: yv, label: `W(${trimNum(xv)}, ${trimNum(yv)})`, kind: "vertex" });
  points.push({ x: 0, y: c, label: `(0, ${trimNum(c)})`, kind: "intercept" });
  return frame(points, fn);
}

export function linearPlot(a: number, b: number): PlotData | null {
  if (![a, b].every(Number.isFinite) || a === 0) return null;
  const fn = (x: number) => a * x + b;
  const x0 = -b / a;
  const points: PlotPoint[] = [
    zeroPoint(x0),
    { x: 0, y: b, label: `(0, ${trimNum(b)})`, kind: "intercept" },
  ];
  return frame(points, fn);
}

export function polyPlot(coeffs: number[], roots: number[]): PlotData | null {
  if (coeffs.length < 2 || !coeffs.every(Number.isFinite)) return null;
  if (coeffs[0] === 0) return null;
  const saneRoots = roots.filter(Number.isFinite);
  if (saneRoots.length === 0) return null;
  const fn = (x: number): number => {
    let v = 0;
    for (const c of coeffs) v = v * x + c;
    return v;
  };
  const points: PlotPoint[] = saneRoots.map((r) => zeroPoint(r));
  return frame(points, fn);
}

export function trajectoryPlot(v0: number, h: number): PlotData | null {
  if (![v0, h].every(Number.isFinite) || v0 <= 0 || h < 0) return null;
  const g = 10;
  const Z = v0 * Math.sqrt((2 * h) / g);
  if (!Number.isFinite(Z)) return null;
  const fn = (x: number): number => h - (g * x * x) / (2 * v0 * v0);
  const points: PlotPoint[] = [
    { x: 0, y: h, label: `(0, ${trimNum(h)})`, kind: "intercept" },
    { x: Z, y: 0, label: `(Z, 0) = ${trimNum(Z)}`, kind: "zero" },
  ];
  return { fn, points, xMin: 0, xMax: Math.max(Z, 1) };
}

export type InequalityOp = ">" | "≥" | "<" | "≤" | "≠";

export function divisorsOf(n: number): number[] {
  n = Math.abs(Math.round(n));
  const out: number[] = [];
  for (let i = 1; i <= Math.min(n, 100); i++) if (n % i === 0) out.push(i);
  return out;
}

export function polyEvalNum(coefs: number[], x: number): number {
  let v = 0;
  for (const c of coefs) v = v * x + c;
  return v;
}

export function rationalRootsOf(coefs: number[]): number[] {
  const cs = [...coefs];
  const zeroRoots: number[] = [];
  while (cs.length > 1 && Math.abs(cs[cs.length - 1]!) < 1e-12) {
    zeroRoots.push(0);
    cs.pop();
  }
  const roots: number[] = [...zeroRoots];
  if (cs.length === 1) return roots.sort((m, n) => m - n);
  const a0 = cs[cs.length - 1]!;
  const cands = new Set<number>();
  if (Math.abs(a0) > 1e-12) {
    for (const p of divisorsOf(a0)) {
      for (const q of divisorsOf(cs[0]!)) {
        cands.add(p / q);
        cands.add(-p / q);
      }
    }
  }
  for (const x of cands) {
    if (roots.some((r) => Math.abs(r - x) < 1e-9)) continue;
    if (Math.abs(polyEvalNum(cs, x)) < 1e-9) roots.push(x);
  }
  return roots.sort((m, n) => m - n);
}

export function absPlot(a: number, w: number): PlotData | null {
  if (![a, w].every(Number.isFinite) || w < 0) return null;
  const fn = (x: number) => Math.abs(x - a);
  const points: PlotPoint[] = [{ x: a, y: 0, label: `(${trimNum(a)}, 0)`, kind: "vertex" }];
  if (w > 0) {
    points.push(
      { x: a - w, y: w, label: `(${trimNum(a - w)}, ${trimNum(w)})`, kind: "zero" },
      { x: a + w, y: w, label: `(${trimNum(a + w)}, ${trimNum(w)})`, kind: "zero" },
    );
  }
  const xMin = a - Math.max(4, w + 2);
  return { fn, points, xMin, xMax: a + Math.max(4, w + 2), secondaryFn: () => w };
}

export function homograficznaPlot(a: number, b: number, c: number, d: number): PlotData | null {
  if (![a, b, c, d].every(Number.isFinite)) return null;
  if (c === 0 && d === 0) return null;
  const fn = (x: number): number => {
    const den = c * x + d;
    const y = (a * x + b) / den;
    return Math.abs(y) < 1e3 ? y : NaN;
  };
  const asymptotes: number[] = c === 0 ? [] : [-d / c];
  const secondaryFn = c === 0 ? undefined : () => a / c;
  const points: PlotPoint[] = [];
  if (a !== 0) {
    const xz = -b / a;
    points.push({ x: xz, y: 0, label: `(${trimNum(xz)}, 0)`, kind: "zero" });
  }
  if (d !== 0) {
    points.push({ x: 0, y: b / d, label: `(0, ${trimNum(b / d)})`, kind: "intercept" });
  }
  const xMin = asymptotes.length > 0 ? asymptotes[0]! - 6 : -6;
  return { fn, points, xMin, xMax: xMin + 12, asymptotes, secondaryFn };
}

export function quadraticReciprocalPlot(q2: number, q1: number, q0: number): PlotData | null {
  if (![q2, q1, q0].every(Number.isFinite) || q2 === 0) return null;
  const d = q1 * q1 - 4 * q2 * q0;
  const asymptotes: number[] = [];
  if (d > 0) {
    const s = Math.sqrt(d);
    asymptotes.push((-q1 - s) / (2 * q2), (-q1 + s) / (2 * q2));
  }
  const fn = (x: number): number => {
    const den = q2 * x * x + q1 * x + q0;
    const y = 1 / den;
    return Math.abs(y) < 1e3 ? y : NaN;
  };
  const xMin = asymptotes.length > 0 ? asymptotes[0]! - 4 : -6;
  const xMax = asymptotes.length > 0 ? asymptotes[1]! + 4 : 6;
  return { fn, points: [], xMin, xMax, asymptotes };
}

export function ukladPlot(
  a1: number,
  b1: number,
  c1: number,
  a2: number,
  b2: number,
  c2: number,
): PlotData | null {
  if (![a1, b1, c1, a2, b2, c2].every(Number.isFinite)) return null;
  if (b1 === 0 && b2 === 0) return null;
  const mk =
    (a: number, b: number, c: number): ((x: number) => number) =>
    (x) =>
      (c - a * x) / b;
  const points: PlotPoint[] = [];
  const asymptotes: number[] = [];
  let primary: (x: number) => number;
  let secondary: (x: number) => number;
  if (b1 === 0) {
    asymptotes.push(c1 / a1);
    primary = mk(a2, b2, c2);
    secondary = () => NaN;
  } else if (b2 === 0) {
    asymptotes.push(c2 / a2);
    primary = mk(a1, b1, c1);
    secondary = () => NaN;
  } else {
    primary = mk(a1, b1, c1);
    secondary = mk(a2, b2, c2);
  }
  const det = a1 * b2 - a2 * b1;
  if (det !== 0) {
    const x = (c1 * b2 - c2 * b1) / det;
    const y = (a1 * c2 - a2 * c1) / det;
    points.push({ x, y, label: `(${trimNum(x)}, ${trimNum(y)})`, kind: "vertex" });
  }
  return { fn: primary, points, xMin: -8, xMax: 8, secondaryFn: secondary, asymptotes };
}

export function parabolaStycznaPlot(a: number, b: number, c: number, x0: number): PlotData | null {
  if (![a, b, c, x0].every(Number.isFinite) || a === 0) return null;
  const base = quadraticPlot(a, b, c);
  if (!base) return null;
  const m = 2 * a * x0 + b;
  const y0 = a * x0 * x0 + b * x0 + c;
  return {
    ...base,
    secondaryFn: (x) => m * (x - x0) + y0,
    points: [
      ...base.points,
      { x: x0, y: y0, label: `(${trimNum(x0)}, ${trimNum(y0)})`, kind: "vertex" },
    ],
  };
}

export function inequalityBands(a: number, op: InequalityOp, roots: number[]): PlotBand[] | null {
  if (!Number.isFinite(a) || a === 0) return null;
  const xs = [...roots].filter(Number.isFinite).sort((p, q) => p - q);
  const up = a > 0;
  const outside = (up && (op === ">" || op === "≥")) || (!up && (op === "<" || op === "≤"));
  if (op === "≠") return [{ from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY }];
  if (xs.length === 0) {
    const holds = (up && (op === ">" || op === "≥")) || (!up && (op === "<" || op === "≤"));
    return holds ? [{ from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY }] : [];
  }
  if (xs.length === 1) {
    const x0 = xs[0]!;
    if (op === ">" || op === "<") {
      const holdsOutside = (up && op === ">") || (!up && op === "<");
      return holdsOutside
        ? [
            { from: Number.NEGATIVE_INFINITY, to: x0 },
            { from: x0, to: Number.POSITIVE_INFINITY },
          ]
        : [];
    }
    return [{ from: Number.NEGATIVE_INFINITY, to: Number.POSITIVE_INFINITY }];
  }
  const [x1, x2] = [xs[0]!, xs[1]!];
  if (outside) {
    return [
      { from: Number.NEGATIVE_INFINITY, to: x1 },
      { from: x2, to: Number.POSITIVE_INFINITY },
    ];
  }
  return [{ from: x1, to: x2 }];
}

export function sampleY(data: PlotData, n = 200): SampledPlot {
  let yMin = Infinity;
  let yMax = -Infinity;
  for (let i = 0; i <= n; i++) {
    const x = data.xMin + ((data.xMax - data.xMin) * i) / n;
    const y = data.fn(x);
    if (!Number.isFinite(y)) continue;
    if (y < yMin) yMin = y;
    if (y > yMax) yMax = y;
  }
  for (const p of data.points) {
    if (p.y < yMin) yMin = p.y;
    if (p.y > yMax) yMax = p.y;
  }
  if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
    yMin = -1;
    yMax = 1;
  }
  if (yMax - yMin < 1e-9) {
    yMin -= 1;
    yMax += 1;
  } else {
    const pad = (yMax - yMin) * 0.15;
    yMin -= pad;
    yMax += pad;
  }
  return { ...data, yMin, yMax };
}

export function niceStep(range: number, target = 6): number {
  if (!(range > 0)) return 1;
  const p = 10 ** Math.floor(Math.log10(range / target));
  for (const m of [1, 2, 5, 10]) {
    if (range / (p * m) <= target) return p * m;
  }
  return p * 10;
}
