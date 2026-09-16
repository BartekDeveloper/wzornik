import { ONE, ZERO, add, cmp, div, mul, of, sub } from '../exact/rational'
import { approx, approxOnly, exactOf, mulRat, sqrtRational, stripPi } from '../exact/exact'
import type { Exact } from '../exact/exact'
import { formatLatex, formatRatLatex } from '../exact/format'
import type { FormulaDef, FormulaSolution } from './types'
import { asRational, resultLatex, stdSteps } from './types'

const G10 = of(10)
const L = formatRatLatex
const APPROX_NOTE = 'wynik przybliżony (stałe i funkcje liczę numerycznie)'

const moc: FormulaDef = {
  id: 'moc',
  subject: 'fizyka',
  topic: 'Praca i moc',
  name: 'Moc',
  latex: 'P = \\frac{W}{t}',
  vars: [
    { id: 'P', label: 'P (moc)', unit: 'W' },
    { id: 'W', label: 'W (praca)', unit: 'J' },
    { id: 't', label: 't (czas)', unit: 's' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'P') {
      const W = asRational(known['W'], 'W')
      const t = asRational(known['t'], 't')
      const value = exactOf(div(W, t))
      return {
        values: [value],
        steps: stdSteps('P = \\frac{W}{t}', `P = \\frac{${L(W)}}{${L(t)}}`, value, places),
      }
    }
    if (unknown === 'W') {
      const P = asRational(known['P'], 'P')
      const t = asRational(known['t'], 't')
      const value = exactOf(mul(P, t))
      return {
        values: [value],
        steps: stdSteps('W = P \\cdot t', `W = ${L(P)} \\cdot ${L(t)}`, value, places),
      }
    }
    const P = asRational(known['P'], 'P')
    const W = asRational(known['W'], 'W')
    const value = exactOf(div(W, P))
    return {
      values: [value],
      steps: stdSteps('t = \\frac{W}{P}', `t = \\frac{${L(W)}}{${L(P)}}`, value, places),
    }
  },
}

const sprawnosc: FormulaDef = {
  id: 'sprawnosc',
  subject: 'fizyka',
  topic: 'Praca i moc',
  name: 'Sprawność',
  latex: '\\eta = \\frac{W_{uż}}{W_{d}}',
  vars: [
    { id: 'eta', label: 'η (0–1)' },
    { id: 'Wu', label: 'W użyteczna [J]' },
    { id: 'Wd', label: 'W dostarczona [J]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'eta') {
      const Wu = asRational(known['Wu'], 'Wu')
      const Wd = asRational(known['Wd'], 'Wd')
      const value = exactOf(div(Wu, Wd))
      return {
        values: [value],
        steps: stdSteps(
          '\\eta = \\frac{W_{uż}}{W_{d}}',
          `\\eta = \\frac{${L(Wu)}}{${L(Wd)}}`,
          value,
          places,
          'ułamek dziesiętny × 100% to procenty',
        ),
      }
    }
    if (unknown === 'Wu') {
      const eta = asRational(known['eta'], 'η')
      const Wd = asRational(known['Wd'], 'Wd')
      const value = exactOf(mul(eta, Wd))
      return {
        values: [value],
        steps: stdSteps(
          'W_{uż} = \\eta \\cdot W_{d}',
          `W_{uż} = ${L(eta)} \\cdot ${L(Wd)}`,
          value,
          places,
        ),
      }
    }
    const eta = asRational(known['eta'], 'η')
    const Wu = asRational(known['Wu'], 'Wu')
    const value = exactOf(div(Wu, eta))
    return {
      values: [value],
      steps: stdSteps(
        'W_{d} = \\frac{W_{uż}}{\\eta}',
        `W_{d} = \\frac{${L(Wu)}}{${L(eta)}}`,
        value,
        places,
      ),
    }
  },
}

const ped: FormulaDef = {
  id: 'ped',
  subject: 'fizyka',
  topic: 'Pęd',
  name: 'Pęd ciała',
  latex: 'p = m \\cdot v',
  vars: [
    { id: 'p', label: 'p (pęd)', unit: 'kg·m/s' },
    { id: 'm', label: 'm (masa)', unit: 'kg' },
    { id: 'v', label: 'v (prędkość)', unit: 'm/s' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'p') {
      const m = asRational(known['m'], 'm')
      const v = asRational(known['v'], 'v')
      const value = exactOf(mul(m, v))
      return {
        values: [value],
        steps: stdSteps('p = m \\cdot v', `p = ${L(m)} \\cdot ${L(v)}`, value, places),
      }
    }
    if (unknown === 'm') {
      const p = asRational(known['p'], 'p')
      const v = asRational(known['v'], 'v')
      const value = exactOf(div(p, v))
      return {
        values: [value],
        steps: stdSteps('m = \\frac{p}{v}', `m = \\frac{${L(p)}}{${L(v)}}`, value, places),
      }
    }
    const p = asRational(known['p'], 'p')
    const m = asRational(known['m'], 'm')
    const value = exactOf(div(p, m))
    return {
      values: [value],
      steps: stdSteps('v = \\frac{p}{m}', `v = \\frac{${L(p)}}{${L(m)}}`, value, places),
    }
  },
}

const zderzenia: FormulaDef = {
  id: 'zderzenia',
  subject: 'fizyka',
  topic: 'Pęd',
  name: 'Zderzenie niesprężyste',
  latex: 'u = \\frac{m_1v_1 + m_2v_2}{m_1 + m_2}',
  vars: [
    { id: 'm1', label: 'm₁ [kg]' },
    { id: 'v1', label: 'v₁ [m/s]' },
    { id: 'm2', label: 'm₂ [kg]' },
    { id: 'v2', label: 'v₂ [m/s]' },
  ],
  mode: 'fixed',
  outputId: 'u',
  outputLabel: 'u',
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    const value = exactOf(div(add(mul(g('m1'), g('v1')), mul(g('m2'), g('v2'))), add(g('m1'), g('m2'))))
    return {
      values: [value],
      steps: [
        { title: '1. Zachowanie pędu', body: 'u = \\frac{m_1v_1 + m_2v_2}{m_1 + m_2}' },
        {
          title: '2. Podstawienie danych',
          body: `u = \\frac{${L(g('m1'))} \\cdot ${L(g('v1'))} + ${L(g('m2'))} \\cdot ${L(g('v2'))}}{${L(g('m1'))} + ${L(g('m2'))}}`,
        },
        { title: '3. Wynik', body: resultLatex('u', value, places) },
      ],
    }
  },
}

const ruchOkrag: FormulaDef = {
  id: 'ruch-okrag',
  subject: 'fizyka',
  topic: 'Ruch po okręgu',
  name: 'Prędkość w ruchu po okręgu',
  latex: 'v = \\frac{2\\pi r}{T}, \\; a_r = \\frac{v^2}{r}',
  vars: [
    { id: 'v', label: 'v [m/s]' },
    { id: 'r', label: 'r [m]' },
    { id: 'T', label: 'T (okres) [s]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const PI: Exact = { rat: ZERO, irr: { type: 'pi', coef: ONE } }
    if (unknown === 'v') {
      const r = asRational(known['r'], 'r')
      const T = asRational(known['T'], 'T')
      const value = mulRat(PI, div(mul(of(2), r), T))
      return {
        values: [value],
        steps: stdSteps(
          'v = \\frac{2\\pi r}{T}',
          `v = \\frac{2\\pi \\cdot ${L(r)}}{${L(T)}}`,
          value,
          places,
          'a także: f = 1/T, ar = v²/r',
        ),
      }
    }
    if (unknown === 'r') {
      const v = known['v']
      const T = asRational(known['T'], 'T')
      let value: Exact
      let note: string | undefined
      try {
        value = exactOf(div(mul(stripPi(v), T), of(2)))
      } catch {
        value = approxOnly((approx(v) * approx(exactOf(T))) / (2 * Math.PI))
        note = APPROX_NOTE
      }
      return {
        values: [value],
        steps: stdSteps(
          'r = \\frac{vT}{2\\pi}',
          `r = \\frac{${formatLatex(v)} \\cdot ${L(T)}}{2\\pi}`,
          value,
          places,
          note,
        ),
      }
    }
    const v = known['v']
    const r = asRational(known['r'], 'r')
    let valueT: Exact
    let noteT: string | undefined
    try {
      valueT = mulRat(PI, div(mul(of(2), r), asRational(v, 'v')))
    } catch {
      valueT = approxOnly((2 * Math.PI * approx(exactOf(r))) / approx(v))
      noteT = APPROX_NOTE
    }
    return {
      values: [valueT],
      steps: stdSteps(
        'T = \\frac{2\\pi r}{v}',
        `T = \\frac{2\\pi \\cdot ${L(r)}}{${formatLatex(v)}}`,
        valueT,
        places,
        noteT,
      ),
    }
  },
}

const G_CONST = 6.67e-11
const C_LIGHT = 3e8

function num(e: Exact): number {
  return approx(e)
}

const grawitacja: FormulaDef = {
  id: 'grawitacja',
  subject: 'fizyka',
  topic: 'Grawitacja',
  name: 'Prawo powszechnego ciążenia',
  latex: 'F = G\\frac{mM}{r^2}',
  vars: [
    { id: 'F', label: 'F [N]' },
    { id: 'm', label: 'm [kg]' },
    { id: 'M', label: 'M [kg]' },
    { id: 'r', label: 'r [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): number => {
      const v = num(known[id])
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`)
      return v
    }
    let value: Exact
    let transform = ''
    let subst = ''
    if (unknown === 'F') {
      value = approxOnly((G_CONST * g('m') * g('M')) / g('r') ** 2)
      transform = 'F = G\\frac{mM}{r^2}'
      subst = `F = 6{,}67 \\cdot 10^{-11} \\cdot ${g('m')} \\cdot ${g('M')} / ${g('r')}^2`
    } else if (unknown === 'm') {
      value = approxOnly((g('F') * g('r') ** 2) / (G_CONST * g('M')))
      transform = 'm = \\frac{Fr^2}{GM}'
      subst = `m = ${g('F')} \\cdot ${g('r')}^2 / (G \\cdot ${g('M')})`
    } else if (unknown === 'M') {
      value = approxOnly((g('F') * g('r') ** 2) / (G_CONST * g('m')))
      transform = 'M = \\frac{Fr^2}{Gm}'
      subst = `M = ${g('F')} \\cdot ${g('r')}^2 / (G \\cdot ${g('m')})`
    } else {
      value = approxOnly(Math.sqrt((G_CONST * g('m') * g('M')) / g('F')))
      transform = 'r = \\sqrt{\\frac{GmM}{F}}'
      subst = `r = \\sqrt{G \\cdot ${g('m')} \\cdot ${g('M')} / ${g('F')}}`
    }
    return { values: [value], steps: stdSteps(transform, subst, value, places, APPROX_NOTE) }
  },
}

const kepler: FormulaDef = {
  id: 'kepler',
  subject: 'fizyka',
  topic: 'Grawitacja',
  name: 'III prawo Keplera',
  latex: '\\frac{T_1^2}{r_1^3} = \\frac{T_2^2}{r_2^3}',
  vars: [
    { id: 'T1', label: 'T₁ [s]' },
    { id: 'r1', label: 'r₁ [m]' },
    { id: 'T2', label: 'T₂ [s]' },
    { id: 'r2', label: 'r₂ [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): number => {
      const v = num(known[id])
      if (!Number.isFinite(v) || v <= 0) throw new Error(`${id}: wpisz dodatnią liczbę`)
      return v
    }
    let value: Exact
    let transform = ''
    let subst = ''
    if (unknown === 'T1') {
      value = approxOnly(g('T2') * (g('r1') / g('r2')) ** 1.5)
      transform = 'T_1 = T_2(r_1/r_2)^{3/2}'
      subst = `T_1 = ${g('T2')} \\cdot (${g('r1')}/${g('r2')})^{3/2}`
    } else if (unknown === 'T2') {
      value = approxOnly(g('T1') * (g('r2') / g('r1')) ** 1.5)
      transform = 'T_2 = T_1(r_2/r_1)^{3/2}'
      subst = `T_2 = ${g('T1')} \\cdot (${g('r2')}/${g('r1')})^{3/2}`
    } else if (unknown === 'r1') {
      value = approxOnly(g('r2') * (g('T1') / g('T2')) ** (2 / 3))
      transform = 'r_1 = r_2(T_1/T_2)^{2/3}'
      subst = `r_1 = ${g('r2')} \\cdot (${g('T1')}/${g('T2')})^{2/3}`
    } else {
      value = approxOnly(g('r1') * (g('T2') / g('T1')) ** (2 / 3))
      transform = 'r_2 = r_1(T_2/T_1)^{2/3}'
      subst = `r_2 = ${g('r1')} \\cdot (${g('T2')}/${g('T1')})^{2/3}`
    }
    return { values: [value], steps: stdSteps(transform, subst, value, places, APPROX_NOTE) }
  },
}

const archimedes: FormulaDef = {
  id: 'archimedes',
  subject: 'fizyka',
  topic: 'Hydrostatyka',
  name: 'Siła wyporu (Archimedes)',
  latex: 'F_w = \\rho g V',
  vars: [
    { id: 'Fw', label: 'F_w [N]' },
    { id: 'ro', label: 'ρ [kg/m³]' },
    { id: 'V', label: 'V [m³]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'Fw') {
      const ro = asRational(known['ro'], 'ρ')
      const V = asRational(known['V'], 'V')
      const value = exactOf(mul(mul(ro, G10), V))
      return {
        values: [value],
        steps: stdSteps('F_w = \\rho g V', `F_w = ${L(ro)} \\cdot 10 \\cdot ${L(V)}`, value, places),
      }
    }
    if (unknown === 'ro') {
      const Fw = asRational(known['Fw'], 'Fw')
      const V = asRational(known['V'], 'V')
      const value = exactOf(div(Fw, mul(G10, V)))
      return {
        values: [value],
        steps: stdSteps('\\rho = \\frac{F_w}{gV}', `\\rho = \\frac{${L(Fw)}}{10 \\cdot ${L(V)}}`, value, places),
      }
    }
    const Fw = asRational(known['Fw'], 'Fw')
    const ro = asRational(known['ro'], 'ρ')
    const value = exactOf(div(Fw, mul(ro, G10)))
    return {
      values: [value],
      steps: stdSteps('V = \\frac{F_w}{\\rho g}', `V = \\frac{${L(Fw)}}{${L(ro)} \\cdot 10}`, value, places),
    }
  },
}

const hydrostatyczne: FormulaDef = {
  id: 'hydrostatyczne',
  subject: 'fizyka',
  topic: 'Hydrostatyka',
  name: 'Ciśnienie hydrostatyczne',
  latex: 'p = \\rho g h',
  vars: [
    { id: 'p', label: 'p [Pa]' },
    { id: 'ro', label: 'ρ [kg/m³]' },
    { id: 'h', label: 'h [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'p') {
      const ro = asRational(known['ro'], 'ρ')
      const h = asRational(known['h'], 'h')
      const value = exactOf(mul(mul(ro, G10), h))
      return {
        values: [value],
        steps: stdSteps('p = \\rho g h', `p = ${L(ro)} \\cdot 10 \\cdot ${L(h)}`, value, places),
      }
    }
    if (unknown === 'ro') {
      const p = asRational(known['p'], 'p')
      const h = asRational(known['h'], 'h')
      const value = exactOf(div(p, mul(G10, h)))
      return {
        values: [value],
        steps: stdSteps('\\rho = \\frac{p}{gh}', `\\rho = \\frac{${L(p)}}{10 \\cdot ${L(h)}}`, value, places),
      }
    }
    const p = asRational(known['p'], 'p')
    const ro = asRational(known['ro'], 'ρ')
    const value = exactOf(div(p, mul(ro, G10)))
    return {
      values: [value],
      steps: stdSteps('h = \\frac{p}{\\rho g}', `h = \\frac{${L(p)}}{${L(ro)} \\cdot 10}`, value, places),
    }
  },
}

const cieplo: FormulaDef = {
  id: 'cieplo',
  subject: 'fizyka',
  topic: 'Ciepło',
  name: 'Ciepło właściwe',
  latex: 'Q = mc\\Delta T',
  vars: [
    { id: 'Q', label: 'Q [J]' },
    { id: 'm', label: 'm [kg]' },
    { id: 'c', label: 'c [J/(kg·K)]' },
    { id: 'dT', label: 'ΔT [K]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'Q') {
      const value = exactOf(mul(mul(g('m'), g('c')), g('dT')))
      return {
        values: [value],
        steps: stdSteps('Q = mc\\Delta T', `Q = ${L(g('m'))} \\cdot ${L(g('c'))} \\cdot ${L(g('dT'))}`, value, places),
      }
    }
    if (unknown === 'm') {
      const value = exactOf(div(g('Q'), mul(g('c'), g('dT'))))
      return {
        values: [value],
        steps: stdSteps(
          'm = \\frac{Q}{c\\Delta T}',
          `m = \\frac{${L(g('Q'))}}{${L(g('c'))} \\cdot ${L(g('dT'))}}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'c') {
      const value = exactOf(div(g('Q'), mul(g('m'), g('dT'))))
      return {
        values: [value],
        steps: stdSteps(
          'c = \\frac{Q}{m\\Delta T}',
          `c = \\frac{${L(g('Q'))}}{${L(g('m'))} \\cdot ${L(g('dT'))}}`,
          value,
          places,
        ),
      }
    }
    const value = exactOf(div(g('Q'), mul(g('m'), g('c'))))
    return {
      values: [value],
      steps: stdSteps(
        '\\Delta T = \\frac{Q}{mc}',
        `\\Delta T = \\frac{${L(g('Q'))}}{${L(g('m'))} \\cdot ${L(g('c'))}}`,
        value,
        places,
      ),
    }
  },
}

const cieploPrzemiany: FormulaDef = {
  id: 'cieplo-przemiany',
  subject: 'fizyka',
  topic: 'Ciepło',
  name: 'Ciepło przemiany (topnienie/parowanie)',
  latex: 'Q = m \\cdot R',
  vars: [
    { id: 'Q', label: 'Q [J]' },
    { id: 'm', label: 'm [kg]' },
    { id: 'R', label: 'R [J/kg]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'Q') {
      const m = asRational(known['m'], 'm')
      const R = asRational(known['R'], 'R')
      const value = exactOf(mul(m, R))
      return {
        values: [value],
        steps: stdSteps('Q = m \\cdot R', `Q = ${L(m)} \\cdot ${L(R)}`, value, places),
      }
    }
    if (unknown === 'm') {
      const Q = asRational(known['Q'], 'Q')
      const R = asRational(known['R'], 'R')
      const value = exactOf(div(Q, R))
      return {
        values: [value],
        steps: stdSteps('m = \\frac{Q}{R}', `m = \\frac{${L(Q)}}{${L(R)}}`, value, places),
      }
    }
    const Q = asRational(known['Q'], 'Q')
    const m = asRational(known['m'], 'm')
    const value = exactOf(div(Q, m))
    return {
      values: [value],
      steps: stdSteps('R = \\frac{Q}{m}', `R = \\frac{${L(Q)}}{${L(m)}}`, value, places),
    }
  },
}

const ohm: FormulaDef = {
  id: 'ohm',
  subject: 'fizyka',
  topic: 'Prąd stały',
  name: 'Prawo Ohma',
  latex: 'I = \\frac{U}{R}',
  vars: [
    { id: 'I', label: 'I [A]' },
    { id: 'U', label: 'U [V]' },
    { id: 'R', label: 'R [Ω]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'I') {
      const U = asRational(known['U'], 'U')
      const R = asRational(known['R'], 'R')
      const value = exactOf(div(U, R))
      return {
        values: [value],
        steps: stdSteps('I = \\frac{U}{R}', `I = \\frac{${L(U)}}{${L(R)}}`, value, places),
      }
    }
    if (unknown === 'U') {
      const I = asRational(known['I'], 'I')
      const R = asRational(known['R'], 'R')
      const value = exactOf(mul(I, R))
      return {
        values: [value],
        steps: stdSteps('U = I \\cdot R', `U = ${L(I)} \\cdot ${L(R)}`, value, places),
      }
    }
    const I = asRational(known['I'], 'I')
    const U = asRational(known['U'], 'U')
    const value = exactOf(div(U, I))
    return {
      values: [value],
      steps: stdSteps('R = \\frac{U}{I}', `R = \\frac{${L(U)}}{${L(I)}}`, value, places),
    }
  },
}

const opor: FormulaDef = {
  id: 'opor',
  subject: 'fizyka',
  topic: 'Prąd stały',
  name: 'Opór przewodnika',
  latex: 'R = \\rho\\frac{l}{S}',
  vars: [
    { id: 'R', label: 'R [Ω]' },
    { id: 'ro', label: 'ρ [Ω·m]' },
    { id: 'l', label: 'l [m]' },
    { id: 'S', label: 'S [m²]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'R') {
      const value = exactOf(div(mul(g('ro'), g('l')), g('S')))
      return {
        values: [value],
        steps: stdSteps(
          'R = \\rho\\frac{l}{S}',
          `R = ${L(g('ro'))} \\cdot \\frac{${L(g('l'))}}{${L(g('S'))}}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'ro') {
      const value = exactOf(div(mul(g('R'), g('S')), g('l')))
      return {
        values: [value],
        steps: stdSteps(
          '\\rho = \\frac{RS}{l}',
          `\\rho = \\frac{${L(g('R'))} \\cdot ${L(g('S'))}}{${L(g('l'))}}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'l') {
      const value = exactOf(div(mul(g('R'), g('S')), g('ro')))
      return {
        values: [value],
        steps: stdSteps(
          'l = \\frac{RS}{\\rho}',
          `l = \\frac{${L(g('R'))} \\cdot ${L(g('S'))}}{${L(g('ro'))}}`,
          value,
          places,
        ),
      }
    }
    const value = exactOf(div(mul(g('ro'), g('l')), g('R')))
    return {
      values: [value],
      steps: stdSteps(
        'S = \\frac{\\rho l}{R}',
        `S = \\frac{${L(g('ro'))} \\cdot ${L(g('l'))}}{${L(g('R'))}}`,
        value,
        places,
      ),
    }
  },
}

const mocPradu: FormulaDef = {
  id: 'moc-pradu',
  subject: 'fizyka',
  topic: 'Prąd stały',
  name: 'Moc prądu elektrycznego',
  latex: 'P = U \\cdot I',
  vars: [
    { id: 'P', label: 'P [W]' },
    { id: 'U', label: 'U [V]' },
    { id: 'I', label: 'I [A]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'P') {
      const U = asRational(known['U'], 'U')
      const I = asRational(known['I'], 'I')
      const value = exactOf(mul(U, I))
      return {
        values: [value],
        steps: stdSteps('P = U \\cdot I', `P = ${L(U)} \\cdot ${L(I)}`, value, places),
      }
    }
    if (unknown === 'U') {
      const P = asRational(known['P'], 'P')
      const I = asRational(known['I'], 'I')
      const value = exactOf(div(P, I))
      return {
        values: [value],
        steps: stdSteps('U = \\frac{P}{I}', `U = \\frac{${L(P)}}{${L(I)}}`, value, places),
      }
    }
    const P = asRational(known['P'], 'P')
    const U = asRational(known['U'], 'U')
    const value = exactOf(div(P, U))
    return {
      values: [value],
      steps: stdSteps('I = \\frac{P}{U}', `I = \\frac{${L(P)}}{${L(U)}}`, value, places),
    }
  },
}

const energiaPradu: FormulaDef = {
  id: 'energia-pradu',
  subject: 'fizyka',
  topic: 'Prąd stały',
  name: 'Praca prądu (energia)',
  latex: 'W = P \\cdot t',
  vars: [
    { id: 'W', label: 'W [J]' },
    { id: 'P', label: 'P [W]' },
    { id: 't', label: 't [s]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'W') {
      const P = asRational(known['P'], 'P')
      const t = asRational(known['t'], 't')
      const value = exactOf(mul(P, t))
      return {
        values: [value],
        steps: stdSteps('W = P \\cdot t', `W = ${L(P)} \\cdot ${L(t)}`, value, places),
      }
    }
    if (unknown === 'P') {
      const W = asRational(known['W'], 'W')
      const t = asRational(known['t'], 't')
      const value = exactOf(div(W, t))
      return {
        values: [value],
        steps: stdSteps('P = \\frac{W}{t}', `P = \\frac{${L(W)}}{${L(t)}}`, value, places),
      }
    }
    const W = asRational(known['W'], 'W')
    const P = asRational(known['P'], 'P')
    const value = exactOf(div(W, P))
    return {
      values: [value],
      steps: stdSteps('t = \\frac{W}{P}', `t = \\frac{${L(W)}}{${L(P)}}`, value, places),
    }
  },
}

const lorentz: FormulaDef = {
  id: 'lorentz',
  subject: 'fizyka',
  topic: 'Magnetyzm',
  name: 'Siła Lorentza (v ⊥ B)',
  latex: 'F = qvB',
  vars: [
    { id: 'F', label: 'F [N]' },
    { id: 'q', label: 'q [C]' },
    { id: 'v', label: 'v [m/s]' },
    { id: 'B', label: 'B [T]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'F') {
      const value = exactOf(mul(mul(g('q'), g('v')), g('B')))
      return {
        values: [value],
        steps: stdSteps('F = qvB', `F = ${L(g('q'))} \\cdot ${L(g('v'))} \\cdot ${L(g('B'))}`, value, places),
      }
    }
    const others = ['q', 'v', 'B'].filter((id) => id !== unknown)
    const o = others.map(g)
    const F = g('F')
    const value = exactOf(div(F, mul(o[0], o[1])))
    return {
      values: [value],
      steps: stdSteps(
        `${unknown} = F/(${others[0]}${others[1]})`,
        `${unknown} = \\frac{${L(F)}}{${L(o[0])} \\cdot ${L(o[1])}}`,
        value,
        places,
      ),
    }
  },
}

const snell: FormulaDef = {
  id: 'snell',
  subject: 'fizyka',
  topic: 'Optyka',
  name: 'Prawo załamania (Snellius)',
  latex: 'n = \\frac{\\sin\\alpha}{\\sin\\beta}',
  vars: [
    { id: 'n', label: 'n' },
    { id: 'alfa', label: 'α (padania) [°]' },
    { id: 'beta', label: 'β (załamania) [°]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const rad = (d: number): number => (d * Math.PI) / 180
    const deg = (r: number): number => (r * 180) / Math.PI
    const g = (id: string): number => {
      const v = num(known[id])
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`)
      return v
    }
    if (unknown === 'n') {
      const value = approxOnly(Math.sin(rad(g('alfa'))) / Math.sin(rad(g('beta'))))
      return {
        values: [value],
        steps: stdSteps(
          'n = \\sin\\alpha/\\sin\\beta',
          `n = \\sin ${g('alfa')}^\\circ / \\sin ${g('beta')}^\\circ`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    if (unknown === 'alfa') {
      const s = g('n') * Math.sin(rad(g('beta')))
      if (Math.abs(s) > 1) throw new Error('sin α > 1 — sprawdź dane (całkowite odbicie?)')
      const value = approxOnly(deg(Math.asin(s)))
      return {
        values: [value],
        steps: stdSteps(
          '\\alpha = \\arcsin(n \\sin\\beta)',
          `\\alpha = \\arcsin(${g('n')} \\cdot \\sin ${g('beta')}^\\circ)`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    const s = Math.sin(rad(g('alfa'))) / g('n')
    if (Math.abs(s) > 1) throw new Error('sin β > 1 — sprawdź dane')
    const value = approxOnly(deg(Math.asin(s)))
    return {
      values: [value],
      steps: stdSteps(
        '\\beta = \\arcsin(\\sin\\alpha/n)',
        `\\beta = \\arcsin(\\sin ${g('alfa')}^\\circ / ${g('n')})`,
        value,
        places,
        APPROX_NOTE,
      ),
    }
  },
}

const soczewki: FormulaDef = {
  id: 'soczewki',
  subject: 'fizyka',
  topic: 'Optyka',
  name: 'Równanie soczewki',
  latex: '\\frac{1}{f} = \\frac{1}{x} + \\frac{1}{y}',
  vars: [
    { id: 'f', label: 'f (ogniskowa)' },
    { id: 'x', label: 'x (przedmiot)' },
    { id: 'y', label: 'y (obraz)' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'f') {
      const x = g('x')
      const y = g('y')
      const value = exactOf(div(mul(x, y), add(x, y)))
      return {
        values: [value],
        steps: stdSteps(
          'f = \\frac{xy}{x + y}',
          `f = \\frac{${L(x)} \\cdot ${L(y)}}{${L(x)} + ${L(y)}}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'x') {
      const f = g('f')
      const y = g('y')
      const value = exactOf(div(mul(f, y), sub(y, f)))
      return {
        values: [value],
        steps: stdSteps(
          'x = \\frac{fy}{y - f}',
          `x = \\frac{${L(f)} \\cdot ${L(y)}}{${L(y)} - ${L(f)}}`,
          value,
          places,
        ),
      }
    }
    const f = g('f')
    const x = g('x')
    const value = exactOf(div(mul(f, x), sub(x, f)))
    return {
      values: [value],
      steps: stdSteps(
        'y = \\frac{fx}{x - f}',
        `y = \\frac{${L(f)} \\cdot ${L(x)}}{${L(x)} - ${L(f)}}`,
        value,
        places,
      ),
    }
  },
}

const powiekszenie: FormulaDef = {
  id: 'powiekszenie',
  subject: 'fizyka',
  topic: 'Optyka',
  name: 'Powiększenie soczewki',
  latex: 'p = \\frac{y}{x}',
  vars: [
    { id: 'x', label: 'x (przedmiot)' },
    { id: 'y', label: 'y (obraz)' },
  ],
  mode: 'fixed',
  outputId: 'p',
  outputLabel: 'p',
  solve(_unknown, known, places): FormulaSolution {
    const x = asRational(known['x'], 'x')
    const y = asRational(known['y'], 'y')
    const value = exactOf(div(y, x))
    return {
      values: [value],
      steps: stdSteps('p = \\frac{y}{x}', `p = \\frac{${L(y)}}{${L(x)}}`, value, places),
    }
  },
}

const siatka: FormulaDef = {
  id: 'siatka',
  subject: 'fizyka',
  topic: 'Optyka',
  name: 'Siatka dyfrakcyjna',
  latex: 'd\\sin\\alpha = n\\lambda',
  vars: [
    { id: 'd', label: 'd (stała siatki) [m]' },
    { id: 'alfa', label: 'α [°]' },
    { id: 'n', label: 'n (rząd, całkowite)' },
    { id: 'lambda', label: 'λ [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const rad = (x: number): number => (x * Math.PI) / 180
    const deg = (x: number): number => (x * 180) / Math.PI
    if (unknown === 'n') {
      const d = num(known['d'])
      const alfa = num(known['alfa'])
      const lambda = num(known['lambda'])
      const nFloat = (d * Math.sin(rad(alfa))) / lambda
      const n = Math.round(nFloat)
      if (!Number.isFinite(nFloat) || Math.abs(nFloat - n) > 1e-6 || n < 0) {
        throw new Error('rząd nie wychodzi całkowity — sprawdź dane')
      }
      const value = exactOf({ p: BigInt(n), q: 1n })
      return {
        values: [value],
        steps: stdSteps(
          'n = d\\sin\\alpha/\\lambda',
          `n = ${d} \\cdot \\sin ${alfa}^\\circ / ${lambda}`,
          value,
          places,
        ),
      }
    }
    const gn = (id: string): number => {
      const v = num(known[id])
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`)
      return v
    }
    if (unknown === 'd') {
      const value = approxOnly((gn('n') * gn('lambda')) / Math.sin(rad(gn('alfa'))))
      return {
        values: [value],
        steps: stdSteps(
          'd = n\\lambda/\\sin\\alpha',
          `d = ${gn('n')} \\cdot ${gn('lambda')} / \\sin ${gn('alfa')}^\\circ`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    if (unknown === 'lambda') {
      const value = approxOnly((gn('d') * Math.sin(rad(gn('alfa')))) / gn('n'))
      return {
        values: [value],
        steps: stdSteps(
          '\\lambda = d\\sin\\alpha/n',
          `\\lambda = ${gn('d')} \\cdot \\sin ${gn('alfa')}^\\circ / ${gn('n')}`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    const s = (gn('n') * gn('lambda')) / gn('d')
    if (Math.abs(s) > 1) throw new Error('sin α > 1 — sprawdź dane')
    const value = approxOnly(deg(Math.asin(s)))
    return {
      values: [value],
      steps: stdSteps(
        '\\alpha = \\arcsin(n\\lambda/d)',
        `\\alpha = \\arcsin(${gn('n')} \\cdot ${gn('lambda')} / ${gn('d')})`,
        value,
        places,
        APPROX_NOTE,
      ),
    }
  },
}

const fale: FormulaDef = {
  id: 'fale',
  subject: 'fizyka',
  topic: 'Fale',
  name: 'Prędkość fali',
  latex: 'v = \\lambda f',
  vars: [
    { id: 'v', label: 'v [m/s]' },
    { id: 'lambda', label: 'λ [m]' },
    { id: 'f', label: 'f [Hz]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'v') {
      const lambda = asRational(known['lambda'], 'λ')
      const f = asRational(known['f'], 'f')
      const value = exactOf(mul(lambda, f))
      return {
        values: [value],
        steps: stdSteps('v = \\lambda f', `v = ${L(lambda)} \\cdot ${L(f)}`, value, places),
      }
    }
    if (unknown === 'lambda') {
      const v = asRational(known['v'], 'v')
      const f = asRational(known['f'], 'f')
      const value = exactOf(div(v, f))
      return {
        values: [value],
        steps: stdSteps('\\lambda = v/f', `\\lambda = \\frac{${L(v)}}{${L(f)}}`, value, places),
      }
    }
    const v = asRational(known['v'], 'v')
    const lambda = asRational(known['lambda'], 'λ')
    const value = exactOf(div(v, lambda))
    return {
      values: [value],
      steps: stdSteps('f = v/\\lambda', `f = \\frac{${L(v)}}{${L(lambda)}}`, value, places),
    }
  },
}

const wahadloMat: FormulaDef = {
  id: 'wahadlo-mat',
  subject: 'fizyka',
  topic: 'Drgania',
  name: 'Wahadło matematyczne',
  latex: 'T = 2\\pi\\sqrt{l/g}',
  vars: [
    { id: 'T', label: 'T (okres) [s]' },
    { id: 'l', label: 'l (długość) [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'T') {
      const l = asRational(known['l'], 'l')
      if (cmp(l, ZERO) <= 0) throw new Error('długość dodatnia')
      const out = approxOnly(2 * Math.PI * Math.sqrt(num(exactOf(l)) / 10))
      return {
        values: [out],
        steps: stdSteps(
          'T = 2\\pi\\sqrt{l/g}',
          `T = 2\\pi\\sqrt{${L(l)}/10}`,
          out,
          places,
          APPROX_NOTE,
        ),
      }
    }
    const T = known['T']
    const tNum = num(T)
    const value = approxOnly((10 * tNum * tNum) / (4 * Math.PI * Math.PI))
    return {
      values: [value],
      steps: stdSteps(
        'l = gT^2/(4\\pi^2)',
        `l = 10 \\cdot ${formatLatex(T)}^2 / (4\\pi^2)`,
        value,
        places,
        APPROX_NOTE,
      ),
    }
  },
}

function mulExactNum(e: Exact, k: number): Exact {
  if (e.irr) return approxOnly(approx(e) * k)
  return exactOf(mul(e.rat, of(k)))
}

function mulPiNum(e: Exact): Exact {
  return approxOnly(Math.PI * approx(e))
}

const wahadloSprezyna: FormulaDef = {
  id: 'wahadlo-sprezyna',
  subject: 'fizyka',
  topic: 'Drgania',
  name: 'Wahadło sprężynowe',
  latex: 'T = 2\\pi\\sqrt{m/k}',
  vars: [
    { id: 'T', label: 'T (okres) [s]' },
    { id: 'm', label: 'm (masa) [kg]' },
    { id: 'k', label: 'k (sprężystość) [N/m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'T') {
      const m = asRational(known['m'], 'm')
      const k = asRational(known['k'], 'k')
      if (cmp(m, ZERO) <= 0 || cmp(k, ZERO) <= 0) throw new Error('m i k dodatnie')
      const out = mulPiNum(mulExactNum(sqrtRational(div(m, k)), 2))
      return {
        values: [out],
        steps: stdSteps(
          'T = 2\\pi\\sqrt{m/k}',
          `T = 2\\pi\\sqrt{${L(m)}/${L(k)}}`,
          out,
          places,
        ),
      }
    }
    const T = known['T']
    const tNum = num(T)
    if (unknown === 'm') {
      const k = asRational(known['k'], 'k')
      const value = approxOnly((num(exactOf(k)) * tNum * tNum) / (4 * Math.PI * Math.PI))
      return {
        values: [value],
        steps: stdSteps(
          'm = kT^2/(4\\pi^2)',
          `m = ${L(k)} \\cdot ${formatLatex(T)}^2 / (4\\pi^2)`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    const m = asRational(known['m'], 'm')
    const value = approxOnly((4 * Math.PI * Math.PI * num(exactOf(m))) / (tNum * tNum))
    return {
      values: [value],
      steps: stdSteps(
        'k = 4\\pi^2m/T^2',
        `k = 4\\pi^2 \\cdot ${L(m)} / ${formatLatex(T)}^2`,
        value,
        places,
        APPROX_NOTE,
      ),
    }
  },
}

const foto: FormulaDef = {
  id: 'foto',
  subject: 'fizyka',
  topic: 'Fizyka atomowa',
  name: 'Zjawisko fotoelektryczne',
  latex: 'E_f = W + E_k',
  vars: [
    { id: 'Ef', label: 'E_f (foton) [eV]' },
    { id: 'W', label: 'W (praca wyjścia) [eV]' },
    { id: 'Ek', label: 'E_k (kinetyczna) [eV]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'Ef') {
      const W = asRational(known['W'], 'W')
      const Ek = asRational(known['Ek'], 'Ek')
      const value = exactOf(add(W, Ek))
      return {
        values: [value],
        steps: stdSteps('E_f = W + E_k', `E_f = ${L(W)} + ${L(Ek)}`, value, places),
      }
    }
    if (unknown === 'W') {
      const Ef = asRational(known['Ef'], 'Ef')
      const Ek = asRational(known['Ek'], 'Ek')
      const value = exactOf(sub(Ef, Ek))
      return {
        values: [value],
        steps: stdSteps('W = E_f - E_k', `W = ${L(Ef)} - ${L(Ek)}`, value, places),
      }
    }
    const Ef = asRational(known['Ef'], 'Ef')
    const W = asRational(known['W'], 'W')
    const value = exactOf(sub(Ef, W))
    return {
      values: [value],
      steps: stdSteps('E_k = E_f - W', `E_k = ${L(Ef)} - ${L(W)}`, value, places),
    }
  },
}

const emc2: FormulaDef = {
  id: 'emc2',
  subject: 'fizyka',
  topic: 'Fizyka atomowa',
  name: 'Równoważność masy i energii',
  latex: 'E = mc^2',
  vars: [
    { id: 'E', label: 'E [J]' },
    { id: 'm', label: 'm [kg]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'E') {
      const m = num(known['m'])
      const value = approxOnly(m * C_LIGHT * C_LIGHT)
      return {
        values: [value],
        steps: stdSteps('E = mc^2', `E = ${m}c^2`, value, places, APPROX_NOTE),
      }
    }
    const E = num(known['E'])
    const value = approxOnly(E / (C_LIGHT * C_LIGHT))
    return {
      values: [value],
      steps: stdSteps('m = E/c^2', `m = ${E}/c^2`, value, places, APPROX_NOTE),
    }
  },
}

const rozpad: FormulaDef = {
  id: 'rozpad',
  subject: 'fizyka',
  topic: 'Fizyka atomowa',
  name: 'Prawo rozpadu promieniotwórczego',
  latex: 'N = N_0(1/2)^{t/T}',
  vars: [
    { id: 'N', label: 'N (pozostałe jądra)' },
    { id: 'N0', label: 'N₀ (początkowe)' },
    { id: 't', label: 't (czas)' },
    { id: 'T', label: 'T (okres połowicznego zaniku)' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string): number => {
      const v = num(known[id])
      if (!Number.isFinite(v) || v < 0) throw new Error(`${id}: wpisz nieujemną liczbę`)
      return v
    }
    if (unknown === 'N') {
      const value = approxOnly(g('N0') * 0.5 ** (g('t') / g('T')))
      return {
        values: [value],
        steps: stdSteps(
          'N = N_0(1/2)^{t/T}',
          `N = ${g('N0')}(1/2)^{${g('t')}/${g('T')}}`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    if (unknown === 'N0') {
      const value = approxOnly(g('N') * 2 ** (g('t') / g('T')))
      return {
        values: [value],
        steps: stdSteps(
          'N_0 = N 2^{t/T}',
          `N_0 = ${g('N')} 2^{${g('t')}/${g('T')}}`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    if (g('N0') <= 0 || g('N') <= 0 || g('N') > g('N0')) {
      throw new Error('wymagane 0 < N ≤ N₀')
    }
    const log2 = Math.log2(g('N0') / g('N'))
    if (unknown === 't') {
      const value = approxOnly(g('T') * log2)
      return {
        values: [value],
        steps: stdSteps(
          't = T log_2(N_0/N)',
          `t = ${g('T')} log_2(${g('N0')}/${g('N')})`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    if (log2 === 0) throw new Error('N = N₀ — czas nieokreślony')
    const value = approxOnly(g('t') / log2)
    return {
      values: [value],
      steps: stdSteps(
        'T = t/log_2(N_0/N)',
        `T = ${g('t')}/log_2(${g('N0')}/${g('N')})`,
        value,
        places,
        APPROX_NOTE,
      ),
    }
  },
}

export const PHYSICS_PP: FormulaDef[] = [
  moc,
  sprawnosc,
  ped,
  zderzenia,
  ruchOkrag,
  grawitacja,
  kepler,
  archimedes,
  hydrostatyczne,
  cieplo,
  cieploPrzemiany,
  ohm,
  opor,
  mocPradu,
  energiaPradu,
  lorentz,
  snell,
  soczewki,
  powiekszenie,
  siatka,
  fale,
  wahadloMat,
  wahadloSprezyna,
  foto,
  emc2,
  rozpad,
]
