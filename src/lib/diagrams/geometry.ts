import { trimNum } from '../exact/format'

const FONT = 'IBM Plex Mono, ui-monospace, monospace'

function f(n: number): string {
  return n.toFixed(1)
}

function get(nums: Record<string, number>, ...keys: string[]): number[] | null {
  const out: number[] = []
  for (const k of keys) {
    const v = nums[k]
    if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) return null
    out.push(v)
  }
  return out
}

function edge(x1: number, y1: number, x2: number, y2: number, hl: boolean, dashed = false): string {
  const dash = dashed ? ' stroke-dasharray="5 4"' : ''
  return `<line x1="${f(x1)}" y1="${f(y1)}" x2="${f(x2)}" y2="${f(y2)}" class="e${hl ? ' hl' : ''}" stroke-width="${hl ? 3 : 2}"${dash}/>`
}

function lbl(x: number, y: number, text: string, hl: boolean, anchor = 'middle'): string {
  const w = hl ? ' font-weight="bold"' : ''
  return `<text x="${f(x)}" y="${f(y)}" text-anchor="${anchor}" font-family="${FONT}" font-size="11" class="t${hl ? ' hl' : ''}"${w}>${text}</text>`
}

function pitagoras(nums: Record<string, number>, hl: string): string | null {
  const g = get(nums, 'a', 'b', 'c')
  if (!g) return null
  const [a, b, c] = g
  const ox = 52
  const top = 16
  const s = Math.min(140 / b, 120 / a)
  const x0 = ox
  const y0 = top
  const x1 = ox + b * s
  const y1 = top + a * s
  const dx = x1 - x0
  const dy = y1 - y0
  const len = Math.hypot(dx, dy)
  const mx = (x0 + x1) / 2 + ((dy / len) * 15)
  const my = (y0 + y1) / 2 + ((-dx / len) * 15)
  return (
    `<polygon points="${f(x0)},${f(y0)} ${f(x1)},${f(y1)} ${f(x0)},${f(y1)}" class="e" stroke-width="1"/>` +
    edge(x0, y0, x0, y1, hl === 'a') +
    edge(x0, y1, x1, y1, hl === 'b') +
    edge(x0, y0, x1, y1, hl === 'c') +
    `<path d="M ${f(x0)} ${f(y1 - 9)} h 9 v 9" class="e" stroke-width="1.5"/>` +
    lbl(x0 - 8, (y0 + y1) / 2 + 4, `a = ${trimNum(a)}`, hl === 'a', 'end') +
    lbl((x0 + x1) / 2, y1 + 17, `b = ${trimNum(b)}`, hl === 'b') +
    lbl(mx, my, `c = ${trimNum(c)}`, hl === 'c')
  )
}

function triangle(nums: Record<string, number>, hl: string): string | null {
  const g = get(nums, 'a', 'h')
  if (!g) return null
  const [a, h] = g
  const s = Math.min(150 / a, 105 / h)
  const baseW = a * s
  const hh = h * s
  const x0 = 40
  const yb = 142
  const x1 = x0 + baseW
  const ax = x0 + baseW * 0.62
  const ay = yb - hh
  return (
    `<polygon points="${f(ax)},${f(ay)} ${f(x1)},${f(yb)} ${f(x0)},${f(yb)}" class="e" stroke-width="1"/>` +
    edge(x0, yb, x1, yb, hl === 'a') +
    edge(ax, ay, ax, yb, hl === 'h', true) +
    `<path d="M ${f(ax)} ${f(yb - 8)} h 8 v 8" class="es" stroke-width="1.5"/>` +
    lbl((x0 + x1) / 2, yb + 17, `a = ${trimNum(a)}`, hl === 'a') +
    lbl(ax - 8, (ay + yb) / 2 + 4, `h = ${trimNum(h)}`, hl === 'h', 'end')
  )
}

function rect(nums: Record<string, number>, hl: string): string | null {
  const g = get(nums, 'a', 'b')
  if (!g) return null
  const [a, b] = g
  const s = Math.min(150 / a, 110 / b)
  const w = a * s
  const h = b * s
  const x0 = 40
  const y0 = 30
  const x1 = x0 + w
  const y1 = y0 + h
  return (
    edge(x0, y0, x1, y0, false) +
    edge(x1, y0, x1, y1, hl === 'b') +
    edge(x1, y1, x0, y1, hl === 'a') +
    edge(x0, y1, x0, y0, hl === 'b') +
    lbl((x0 + x1) / 2, y1 + 17, `a = ${trimNum(a)}`, hl === 'a') +
    lbl(x0 - 8, (y0 + y1) / 2 + 4, `b = ${trimNum(b)}`, hl === 'b', 'end')
  )
}

function circle(nums: Record<string, number>, hl: string): string | null {
  const g = get(nums, 'r')
  if (!g) return null
  const [r] = g
  const cx = 115
  const cy = 88
  const R = 58
  return (
    `<circle cx="${cx}" cy="${cy}" r="${R}" class="e" stroke-width="2"/>` +
    `<circle cx="${cx}" cy="${cy}" r="2.5" class="dot"/>` +
    edge(cx, cy, cx + R, cy, hl === 'r') +
    lbl(cx + R / 2, cy - 8, `r = ${trimNum(r)}`, hl === 'r')
  )
}

function box(nums: Record<string, number>, hl: string): string | null {
  const g = get(nums, 'a', 'b', 'c')
  if (!g) return null
  const [a, b, c] = g
  const s = Math.min(115 / a, 90 / b)
  const fw = a * s
  const fh = b * s
  const dd = 14 + (26 * c) / (a + b + c)
  const dx = dd
  const dy = -dd * 0.55
  const fx = 48
  const fy = 62
  return (
    `<rect x="${f(fx + dx)}" y="${f(fy + dy)}" width="${f(fw)}" height="${f(fh)}" class="es" stroke-width="1.5"/>` +
    edge(fx, fy, fx + dx, fy + dy, hl === 'c') +
    edge(fx + fw, fy, fx + fw + dx, fy + dy, hl === 'c') +
    edge(fx + fw, fy + fh, fx + fw + dx, fy + fh + dy, hl === 'c') +
    `<rect x="${f(fx)}" y="${f(fy)}" width="${f(fw)}" height="${f(fh)}" class="e" stroke-width="2"/>` +
    lbl(fx + fw / 2, fy + fh + 19, `a = ${trimNum(a)}`, hl === 'a') +
    lbl(fx - 8, fy + fh / 2 + 4, `b = ${trimNum(b)}`, hl === 'b', 'end') +
    lbl(fx + fw + dx / 2 + 6, fy + fh + dy / 2 + 12, `c = ${trimNum(c)}`, hl === 'c')
  )
}

function sphere(nums: Record<string, number>, hl: string): string | null {
  const g = get(nums, 'r')
  if (!g) return null
  const [r] = g
  const cx = 115
  const cy = 88
  const R = 55
  return (
    `<circle cx="${cx}" cy="${cy}" r="${R}" class="e" stroke-width="2"/>` +
    `<ellipse cx="${cx}" cy="${cy}" rx="${R}" ry="15" class="es" stroke-width="1.5"/>` +
    `<circle cx="${cx}" cy="${cy}" r="2.5" class="dot"/>` +
    edge(cx, cy, cx + R, cy, hl === 'r') +
    lbl(cx + R / 2, cy - 20, `r = ${trimNum(r)}`, hl === 'r')
  )
}

export function renderDiagram(formulaId: string, nums: Record<string, number>, highlight = ''): string | null {
  let inner: string | null = null
  switch (formulaId) {
    case 'pitagoras':
      inner = pitagoras(nums, highlight)
      break
    case 'pole-trojkata':
      inner = triangle(nums, highlight)
      break
    case 'pole-prostokata':
      inner = rect(nums, highlight)
      break
    case 'pole-kola':
    case 'obwod-kola':
      inner = circle(nums, highlight)
      break
    case 'objetosc-prostopadloscianu':
      inner = box(nums, highlight)
      break
    case 'objetosc-kuli':
    case 'pole-kuli':
      inner = sphere(nums, highlight)
      break
    default:
      return null
  }
  if (!inner) return null
  return `<svg viewBox="0 0 230 180" role="img" aria-hidden="true" class="diag">${inner}</svg>`
}
