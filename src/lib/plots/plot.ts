import { trimNum } from "../exact/format";

export interface PlotPoint {
  x: number;
  y: number;
  label: string;
  kind: "zero" | "vertex" | "intercept";
}

export interface PlotData {
  fn: (x: number) => number;
  points: PlotPoint[];
  xMin: number;
  xMax: number;
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
