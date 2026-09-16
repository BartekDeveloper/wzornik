import { ONE, ZERO, add, cmp, div, mul, of, sub } from '../exact/rational'
import { approx, approxOnly, exactOf, mulRat, sqrtRational } from '../exact/exact'
import type { Exact } from '../exact/exact'
import { formatRatLatex } from '../exact/format'
import type { FormulaDef, FormulaSolution } from './types'
import { asRational, requireNatural, resultLatex, stdSteps } from './types'

const L = formatRatLatex
const G10 = of(10)
const APPROX_NOTE = 'wynik przybliżony (stałe fizyczne liczę numerycznie)'
const K_COULOMB = 8.99e9
const C_LIGHT = 3e8

function num(e: Exact): number {
  return approx(e)
}

const rzutPoziomy: FormulaDef = {
  id: 'rzut-poziomy',
  subject: 'fizyka',
  topic: 'Rzut poziomy · ROZSZ',
  name: 'Rzut poziomy (zasięg i czas)',
  latex: 'Z = v_0t, \\; t = \\sqrt{\\frac{2h}{g}}',
  vars: [
    { id: 'Z', label: 'Z (zasięg) [m]' },
    { id: 'v0', label: 'v₀ [m/s]' },
    { id: 'h', label: 'h [m]' },
    { id: 't', label: 't [s]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 't') {
      const h = asRational(known['h'], 'h')
      if (cmp(h, ZERO) < 0) throw new Error('wysokość nieujemna')
      const value = sqrtRational(div(mul(h, of(2)), G10))
      return {
        values: [value],
        steps: stdSteps('t = \\sqrt{\\frac{2h}{g}}', `t = \\sqrt{\\frac{2 \\cdot ${L(h)}}{10}}`, value, places),
      }
    }
    if (unknown === 'Z') {
      const v0 = asRational(known['v0'], 'v₀')
      const h = asRational(known['h'], 'h')
      const t = sqrtRational(div(mul(h, of(2)), G10))
      const value = mulRat(t, v0)
      return {
        values: [value],
        steps: stdSteps(
          'Z = v_0t, \\; t = \\sqrt{2h/g}',
          `Z = ${L(v0)} \\cdot \\sqrt{2 \\cdot ${L(h)}/10}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'v0') {
      const Z = asRational(known['Z'], 'Z')
      const t = asRational(known['t'], 't')
      const value = exactOf(div(Z, t))
      return {
        values: [value],
        steps: stdSteps('v_0 = \\frac{Z}{t}', `v_0 = \\frac{${L(Z)}}{${L(t)}}`, value, places),
      }
    }
    const t = asRational(known['t'], 't')
    const value = exactOf(div(mul(G10, mul(t, t)), of(2)))
    return {
      values: [value],
      steps: stdSteps('h = \\frac{gt^2}{2}', `h = \\frac{10 \\cdot ${L(t)}^2}{2}`, value, places),
    }
  },
}

const momentSily: FormulaDef = {
  id: 'moment-sily',
  subject: 'fizyka',
  topic: 'Ruch obrotowy · ROZSZ',
  name: 'Moment siły',
  latex: 'M = F \\cdot r',
  vars: [
    { id: 'M', label: 'M [N·m]' },
    { id: 'F', label: 'F [N]' },
    { id: 'r', label: 'r [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'M') {
      const F = asRational(known['F'], 'F')
      const r = asRational(known['r'], 'r')
      const value = exactOf(mul(F, r))
      return {
        values: [value],
        steps: stdSteps('M = F \\cdot r', `M = ${L(F)} \\cdot ${L(r)}`, value, places),
      }
    }
    if (unknown === 'F') {
      const M = asRational(known['M'], 'M')
      const r = asRational(known['r'], 'r')
      const value = exactOf(div(M, r))
      return {
        values: [value],
        steps: stdSteps('F = \\frac{M}{r}', `F = \\frac{${L(M)}}{${L(r)}}`, value, places),
      }
    }
    const M = asRational(known['M'], 'M')
    const F = asRational(known['F'], 'F')
    const value = exactOf(div(M, F))
    return {
      values: [value],
      steps: stdSteps('r = \\frac{M}{F}', `r = \\frac{${L(M)}}{${L(F)}}`, value, places),
    }
  },
}

const energiaObrotowa: FormulaDef = {
  id: 'energia-obrotowa',
  subject: 'fizyka',
  topic: 'Ruch obrotowy · ROZSZ',
  name: 'Energia kinetyczna ruchu obrotowego',
  latex: 'E = \\frac{I\\omega^2}{2}',
  vars: [
    { id: 'E', label: 'E [J]' },
    { id: 'I', label: 'I [kg·m²]' },
    { id: 'w', label: 'ω [rad/s]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'E') {
      const I = asRational(known['I'], 'I')
      const w = asRational(known['w'], 'ω')
      const value = exactOf(div(mul(I, mul(w, w)), of(2)))
      return {
        values: [value],
        steps: stdSteps('E = \\frac{I\\omega^2}{2}', `E = \\frac{${L(I)} \\cdot ${L(w)}^2}{2}`, value, places),
      }
    }
    if (unknown === 'I') {
      const E = asRational(known['E'], 'E')
      const w = asRational(known['w'], 'ω')
      const value = exactOf(div(mul(E, of(2)), mul(w, w)))
      return {
        values: [value],
        steps: stdSteps('I = \\frac{2E}{\\omega^2}', `I = \\frac{2 \\cdot ${L(E)}}{${L(w)}^2}`, value, places),
      }
    }
    const E = asRational(known['E'], 'E')
    const I = asRational(known['I'], 'I')
    if (cmp(E, ZERO) < 0 || cmp(I, ZERO) <= 0) throw new Error('E ≥ 0 i I > 0')
    const value = sqrtRational(div(mul(E, of(2)), I))
    return {
      values: [value],
      steps: stdSteps(
        '\\omega = \\sqrt{\\frac{2E}{I}}',
        `\\omega = \\sqrt{\\frac{2 \\cdot ${L(E)}}{${L(I)}}}`,
        value,
        places,
      ),
    }
  },
}

const bernoulli: FormulaDef = {
  id: 'bernoulli',
  subject: 'fizyka',
  topic: 'Hydrodynamika · ROZSZ',
  name: 'Równanie Bernoulliego',
  latex: 'p_2 = p_1 + \\rho g(h_1 - h_2) + \\frac{\\rho}{2}(v_1^2 - v_2^2)',
  vars: [
    { id: 'p1', label: 'p₁ [Pa]' },
    { id: 'ro', label: 'ρ [kg/m³]' },
    { id: 'h1', label: 'h₁ [m]' },
    { id: 'v1', label: 'v₁ [m/s]' },
    { id: 'h2', label: 'h₂ [m]' },
    { id: 'v2', label: 'v₂ [m/s]' },
  ],
  mode: 'fixed',
  outputId: 'p2',
  outputLabel: 'p₂',
  solve(_unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    const value = exactOf(
      add(
        add(g('p1'), mul(mul(g('ro'), G10), sub(g('h1'), g('h2')))),
        div(mul(g('ro'), sub(mul(g('v1'), g('v1')), mul(g('v2'), g('v2')))), of(2)),
      ),
    )
    return {
      values: [value],
      steps: [
        { title: '1. Równanie', body: 'p_2 = p_1 + \\rho g(h_1 - h_2) + \\frac{\\rho}{2}(v_1^2 - v_2^2)' },
        {
          title: '2. Podstawienie danych',
          body: `p_2 = ${L(g('p1'))} + ${L(g('ro'))} \\cdot 10(${L(g('h1'))} - ${L(g('h2'))}) + \\ldots`,
        },
        { title: '3. Wynik', body: resultLatex('p_2', value, places) },
      ],
    }
  },
}

const clapeyron: FormulaDef = {
  id: 'clapeyron',
  subject: 'fizyka',
  topic: 'Termodynamika · ROZSZ',
  name: 'Równanie Clapeyrona',
  latex: 'pV = nRT',
  vars: [
    { id: 'p', label: 'p [Pa]' },
    { id: 'V', label: 'V [m³]' },
    { id: 'n', label: 'n [mol]' },
    { id: 'T', label: 'T [K]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const R = 8.31
    const g = (id: string): number => {
      const v = num(known[id])
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`)
      return v
    }
    let value: Exact
    let transform = ''
    let subst = ''
    if (unknown === 'p') {
      value = approxOnly((g('n') * R * g('T')) / g('V'))
      transform = 'p = nRT/V'
      subst = `p = ${g('n')} \\cdot 8{,}31 \\cdot ${g('T')} / ${g('V')}`
    } else if (unknown === 'V') {
      value = approxOnly((g('n') * R * g('T')) / g('p'))
      transform = 'V = nRT/p'
      subst = `V = ${g('n')} \\cdot 8{,}31 \\cdot ${g('T')} / ${g('p')}`
    } else if (unknown === 'n') {
      value = approxOnly((g('p') * g('V')) / (R * g('T')))
      transform = 'n = pV/(RT)'
      subst = `n = ${g('p')} \\cdot ${g('V')} / (8{,}31 \\cdot ${g('T')})`
    } else {
      value = approxOnly((g('p') * g('V')) / (R * g('n')))
      transform = 'T = pV/(nR)'
      subst = `T = ${g('p')} \\cdot ${g('V')} / (${g('n')} \\cdot 8{,}31)`
    }
    return { values: [value], steps: stdSteps(transform, subst, value, places, APPROX_NOTE) }
  },
}

const pierwszaZasada: FormulaDef = {
  id: 'pierwsza-zasada',
  subject: 'fizyka',
  topic: 'Termodynamika · ROZSZ',
  name: 'I zasada termodynamiki',
  latex: '\\Delta U = W + Q',
  vars: [
    { id: 'dU', label: 'ΔU [J]' },
    { id: 'W', label: 'W (nad gazem) [J]' },
    { id: 'Q', label: 'Q (ciepło) [J]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'dU') {
      const W = asRational(known['W'], 'W')
      const Q = asRational(known['Q'], 'Q')
      const value = exactOf(add(W, Q))
      return {
        values: [value],
        steps: stdSteps('\\Delta U = W + Q', `\\Delta U = ${L(W)} + ${L(Q)}`, value, places),
      }
    }
    if (unknown === 'W') {
      const dU = asRational(known['dU'], 'ΔU')
      const Q = asRational(known['Q'], 'Q')
      const value = exactOf(sub(dU, Q))
      return {
        values: [value],
        steps: stdSteps('W = \\Delta U - Q', `W = ${L(dU)} - ${L(Q)}`, value, places),
      }
    }
    const dU = asRational(known['dU'], 'ΔU')
    const W = asRational(known['W'], 'W')
    const value = exactOf(sub(dU, W))
    return {
      values: [value],
      steps: stdSteps('Q = \\Delta U - W', `Q = ${L(dU)} - ${L(W)}`, value, places),
    }
  },
}

const izobaryczna: FormulaDef = {
  id: 'izobaryczna',
  subject: 'fizyka',
  topic: 'Termodynamika · ROZSZ',
  name: 'Praca w przemianie izobarycznej',
  latex: 'W = p(V_2 - V_1)',
  vars: [
    { id: 'W', label: 'W [J]' },
    { id: 'p', label: 'p [Pa]' },
    { id: 'V1', label: 'V₁ [m³]' },
    { id: 'V2', label: 'V₂ [m³]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'W') {
      const value = exactOf(mul(g('p'), sub(g('V2'), g('V1'))))
      return {
        values: [value],
        steps: stdSteps(
          'W = p(V_2 - V_1)',
          `W = ${L(g('p'))}(${L(g('V2'))} - ${L(g('V1'))})`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'p') {
      const value = exactOf(div(g('W'), sub(g('V2'), g('V1'))))
      return {
        values: [value],
        steps: stdSteps(
          'p = \\frac{W}{V_2 - V_1}',
          `p = \\frac{${L(g('W'))}}{${L(g('V2'))} - ${L(g('V1'))}}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'V2') {
      const value = exactOf(add(g('V1'), div(g('W'), g('p'))))
      return {
        values: [value],
        steps: stdSteps(
          'V_2 = V_1 + \\frac{W}{p}',
          `V_2 = ${L(g('V1'))} + \\frac{${L(g('W'))}}{${L(g('p'))}}`,
          value,
          places,
        ),
      }
    }
    const value = exactOf(sub(g('V2'), div(g('W'), g('p'))))
    return {
      values: [value],
      steps: stdSteps(
        'V_1 = V_2 - \\frac{W}{p}',
        `V_1 = ${L(g('V2'))} - \\frac{${L(g('W'))}}{${L(g('p'))}}`,
        value,
        places,
      ),
    }
  },
}

const carnot: FormulaDef = {
  id: 'carnot',
  subject: 'fizyka',
  topic: 'Termodynamika · ROZSZ',
  name: 'Sprawność cyklu Carnota',
  latex: '\\eta = \\frac{T_1 - T_2}{T_1}',
  vars: [
    { id: 'eta', label: 'η (0–1)' },
    { id: 'T1', label: 'T₁ (grzejnica) [K]' },
    { id: 'T2', label: 'T₂ (chłodnica) [K]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'eta') {
      const T1 = asRational(known['T1'], 'T₁')
      const T2 = asRational(known['T2'], 'T₂')
      const value = exactOf(div(sub(T1, T2), T1))
      return {
        values: [value],
        steps: stdSteps(
          '\\eta = \\frac{T_1 - T_2}{T_1}',
          `\\eta = \\frac{${L(T1)} - ${L(T2)}}{${L(T1)}}`,
          value,
          places,
          'ułamek × 100% to procenty',
        ),
      }
    }
    if (unknown === 'T1') {
      const eta = asRational(known['eta'], 'η')
      const T2 = asRational(known['T2'], 'T₂')
      const value = exactOf(div(T2, sub(ONE, eta)))
      return {
        values: [value],
        steps: stdSteps(
          'T_1 = \\frac{T_2}{1 - \\eta}',
          `T_1 = \\frac{${L(T2)}}{1 - ${L(eta)}}`,
          value,
          places,
        ),
      }
    }
    const eta = asRational(known['eta'], 'η')
    const T1 = asRational(known['T1'], 'T₁')
    const value = exactOf(mul(T1, sub(ONE, eta)))
    return {
      values: [value],
      steps: stdSteps(
        'T_2 = T_1(1 - \\eta)',
        `T_2 = ${L(T1)}(1 - ${L(eta)})`,
        value,
        places,
      ),
    }
  },
}

const rozszerzalnosc: FormulaDef = {
  id: 'rozszerzalnosc',
  subject: 'fizyka',
  topic: 'Termodynamika · ROZSZ',
  name: 'Rozszerzalność liniowa',
  latex: '\\Delta l = \\alpha l \\Delta T',
  vars: [
    { id: 'dl', label: 'Δl [m]' },
    { id: 'alfa', label: 'α [1/K]' },
    { id: 'l', label: 'l [m]' },
    { id: 'dT', label: 'ΔT [K]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'dl') {
      const value = exactOf(mul(mul(g('alfa'), g('l')), g('dT')))
      return {
        values: [value],
        steps: stdSteps(
          '\\Delta l = \\alpha l \\Delta T',
          `\\Delta l = ${L(g('alfa'))} \\cdot ${L(g('l'))} \\cdot ${L(g('dT'))}`,
          value,
          places,
        ),
      }
    }
    const rest = ['alfa', 'l', 'dT'].filter((id) => id !== unknown)
    const o = rest.map(g)
    const dl = g('dl')
    const value = exactOf(div(dl, mul(o[0], o[1])))
    const names: Record<string, string> = { alfa: '\\alpha', l: 'l', dT: '\\Delta T' }
    return {
      values: [value],
      steps: stdSteps(
        `${names[unknown]} = \\frac{\\Delta l}{${rest.map((r) => names[r]).join('')}}`,
        `${names[unknown]} = \\frac{${L(dl)}}{${L(o[0])} \\cdot ${L(o[1])}}`,
        value,
        places,
      ),
    }
  },
}

const coulomb: FormulaDef = {
  id: 'coulomb',
  subject: 'fizyka',
  topic: 'Elektrostatyka · ROZSZ',
  name: 'Prawo Coulomba',
  latex: 'F = k\\frac{qQ}{r^2}',
  vars: [
    { id: 'F', label: 'F [N]' },
    { id: 'q', label: 'q [C]' },
    { id: 'Q', label: 'Q [C]' },
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
      value = approxOnly((K_COULOMB * g('q') * g('Q')) / g('r') ** 2)
      transform = 'F = kqQ/r^2'
      subst = `F = 8{,}99 \\cdot 10^9 \\cdot ${g('q')} \\cdot ${g('Q')} / ${g('r')}^2`
    } else if (unknown === 'r') {
      value = approxOnly(Math.sqrt((K_COULOMB * g('q') * g('Q')) / g('F')))
      transform = 'r = \\sqrt{kqQ/F}'
      subst = `r = \\sqrt{k \\cdot ${g('q')} \\cdot ${g('Q')} / ${g('F')}}`
    } else {
      const other = unknown === 'q' ? 'Q' : 'q'
      value = approxOnly((g('F') * g('r') ** 2) / (K_COULOMB * g(other)))
      transform = `${unknown} = Fr^2/(k${other})`
      subst = `${unknown} = ${g('F')} \\cdot ${g('r')}^2 / (k \\cdot ${g(other)})`
    }
    return { values: [value], steps: stdSteps(transform, subst, value, places, APPROX_NOTE) }
  },
}

const natezenie: FormulaDef = {
  id: 'natezenie',
  subject: 'fizyka',
  topic: 'Elektrostatyka · ROZSZ',
  name: 'Natężenie pola ładunku punktowego',
  latex: 'E = k\\frac{Q}{r^2}',
  vars: [
    { id: 'E', label: 'E [N/C]' },
    { id: 'Q', label: 'Q [C]' },
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
    if (unknown === 'E') {
      value = approxOnly((K_COULOMB * g('Q')) / g('r') ** 2)
      transform = 'E = kQ/r^2'
      subst = `E = k \\cdot ${g('Q')} / ${g('r')}^2`
    } else if (unknown === 'Q') {
      value = approxOnly((g('E') * g('r') ** 2) / K_COULOMB)
      transform = 'Q = Er^2/k'
      subst = `Q = ${g('E')} \\cdot ${g('r')}^2 / k`
    } else {
      value = approxOnly(Math.sqrt((K_COULOMB * g('Q')) / g('E')))
      transform = 'r = \\sqrt{kQ/E}'
      subst = `r = \\sqrt{k \\cdot ${g('Q')} / ${g('E')}}`
    }
    return { values: [value], steps: stdSteps(transform, subst, value, places, APPROX_NOTE) }
  },
}

const potencjal: FormulaDef = {
  id: 'potencjal',
  subject: 'fizyka',
  topic: 'Elektrostatyka · ROZSZ',
  name: 'Potencjał elektryczny',
  latex: 'V = \\frac{W}{q}',
  vars: [
    { id: 'V', label: 'V [V]' },
    { id: 'W', label: 'W [J]' },
    { id: 'q', label: 'q [C]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'V') {
      const W = asRational(known['W'], 'W')
      const q = asRational(known['q'], 'q')
      const value = exactOf(div(W, q))
      return {
        values: [value],
        steps: stdSteps('V = \\frac{W}{q}', `V = \\frac{${L(W)}}{${L(q)}}`, value, places),
      }
    }
    if (unknown === 'W') {
      const V = asRational(known['V'], 'V')
      const q = asRational(known['q'], 'q')
      const value = exactOf(mul(V, q))
      return {
        values: [value],
        steps: stdSteps('W = V \\cdot q', `W = ${L(V)} \\cdot ${L(q)}`, value, places),
      }
    }
    const V = asRational(known['V'], 'V')
    const W = asRational(known['W'], 'W')
    const value = exactOf(div(W, V))
    return {
      values: [value],
      steps: stdSteps('q = \\frac{W}{V}', `q = \\frac{${L(W)}}{${L(V)}}`, value, places),
    }
  },
}

const kondensatorQ: FormulaDef = {
  id: 'kondensator-q',
  subject: 'fizyka',
  topic: 'Elektrostatyka · ROZSZ',
  name: 'Pojemność kondensatora',
  latex: 'C = \\frac{Q}{U}',
  vars: [
    { id: 'C', label: 'C [F]' },
    { id: 'Q', label: 'Q [C]' },
    { id: 'U', label: 'U [V]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'C') {
      const Q = asRational(known['Q'], 'Q')
      const U = asRational(known['U'], 'U')
      const value = exactOf(div(Q, U))
      return {
        values: [value],
        steps: stdSteps('C = \\frac{Q}{U}', `C = \\frac{${L(Q)}}{${L(U)}}`, value, places),
      }
    }
    if (unknown === 'Q') {
      const C = asRational(known['C'], 'C')
      const U = asRational(known['U'], 'U')
      const value = exactOf(mul(C, U))
      return {
        values: [value],
        steps: stdSteps('Q = C \\cdot U', `Q = ${L(C)} \\cdot ${L(U)}`, value, places),
      }
    }
    const C = asRational(known['C'], 'C')
    const Q = asRational(known['Q'], 'Q')
    const value = exactOf(div(Q, C))
    return {
      values: [value],
      steps: stdSteps('U = \\frac{Q}{C}', `U = \\frac{${L(Q)}}{${L(C)}}`, value, places),
    }
  },
}

const kondensatorE: FormulaDef = {
  id: 'kondensator-e',
  subject: 'fizyka',
  topic: 'Elektrostatyka · ROZSZ',
  name: 'Energia kondensatora',
  latex: 'E = \\frac{CU^2}{2}',
  vars: [
    { id: 'E', label: 'E [J]' },
    { id: 'C', label: 'C [F]' },
    { id: 'U', label: 'U [V]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'E') {
      const C = asRational(known['C'], 'C')
      const U = asRational(known['U'], 'U')
      const value = exactOf(div(mul(C, mul(U, U)), of(2)))
      return {
        values: [value],
        steps: stdSteps('E = \\frac{CU^2}{2}', `E = \\frac{${L(C)} \\cdot ${L(U)}^2}{2}`, value, places),
      }
    }
    if (unknown === 'C') {
      const E = asRational(known['E'], 'E')
      const U = asRational(known['U'], 'U')
      const value = exactOf(div(mul(E, of(2)), mul(U, U)))
      return {
        values: [value],
        steps: stdSteps('C = \\frac{2E}{U^2}', `C = \\frac{2 \\cdot ${L(E)}}{${L(U)}^2}`, value, places),
      }
    }
    const E = asRational(known['E'], 'E')
    const C = asRational(known['C'], 'C')
    if (cmp(E, ZERO) < 0 || cmp(C, ZERO) <= 0) throw new Error('E ≥ 0 i C > 0')
    const value = sqrtRational(div(mul(E, of(2)), C))
    return {
      values: [value],
      steps: stdSteps('U = \\sqrt{\\frac{2E}{C}}', `U = \\sqrt{\\frac{2 \\cdot ${L(E)}}{${L(C)}}}`, value, places),
    }
  },
}

const sem: FormulaDef = {
  id: 'sem',
  subject: 'fizyka',
  topic: 'Prąd stały · ROZSZ',
  name: 'SEM i opór wewnętrzny',
  latex: 'I = \\frac{\\varepsilon}{R + r}',
  vars: [
    { id: 'I', label: 'I [A]' },
    { id: 'E', label: 'ε [V]' },
    { id: 'R', label: 'R [Ω]' },
    { id: 'r', label: 'r [Ω]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'I') {
      const value = exactOf(div(g('E'), add(g('R'), g('r'))))
      return {
        values: [value],
        steps: stdSteps(
          'I = \\frac{\\varepsilon}{R + r}',
          `I = \\frac{${L(g('E'))}}{${L(g('R'))} + ${L(g('r'))}}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'E') {
      const value = exactOf(mul(g('I'), add(g('R'), g('r'))))
      return {
        values: [value],
        steps: stdSteps(
          '\\varepsilon = I(R + r)',
          `\\varepsilon = ${L(g('I'))}(${L(g('R'))} + ${L(g('r'))})`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'R') {
      const value = exactOf(sub(div(g('E'), g('I')), g('r')))
      return {
        values: [value],
        steps: stdSteps(
          'R = \\frac{\\varepsilon}{I} - r',
          `R = \\frac{${L(g('E'))}}{${L(g('I'))}} - ${L(g('r'))}`,
          value,
          places,
        ),
      }
    }
    const value = exactOf(sub(div(g('E'), g('I')), g('R')))
    return {
      values: [value],
      steps: stdSteps(
        'r = \\frac{\\varepsilon}{I} - R',
        `r = \\frac{${L(g('E'))}}{${L(g('I'))}} - ${L(g('R'))}`,
        value,
        places,
      ),
    }
  },
}

const strumien: FormulaDef = {
  id: 'strumien',
  subject: 'fizyka',
  topic: 'Magnetyzm · ROZSZ',
  name: 'Strumień magnetyczny',
  latex: '\\Phi = B \\cdot S',
  vars: [
    { id: 'Phi', label: 'Φ [Wb]' },
    { id: 'B', label: 'B [T]' },
    { id: 'S', label: 'S [m²]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'Phi') {
      const B = asRational(known['B'], 'B')
      const S = asRational(known['S'], 'S')
      const value = exactOf(mul(B, S))
      return {
        values: [value],
        steps: stdSteps('\\Phi = B \\cdot S', `\\Phi = ${L(B)} \\cdot ${L(S)}`, value, places),
      }
    }
    if (unknown === 'B') {
      const Phi = asRational(known['Phi'], 'Φ')
      const S = asRational(known['S'], 'S')
      const value = exactOf(div(Phi, S))
      return {
        values: [value],
        steps: stdSteps('B = \\frac{\\Phi}{S}', `B = \\frac{${L(Phi)}}{${L(S)}}`, value, places),
      }
    }
    const Phi = asRational(known['Phi'], 'Φ')
    const B = asRational(known['B'], 'B')
    const value = exactOf(div(Phi, B))
    return {
      values: [value],
      steps: stdSteps('S = \\frac{\\Phi}{B}', `S = \\frac{${L(Phi)}}{${L(B)}}`, value, places),
    }
  },
}

const faraday: FormulaDef = {
  id: 'faraday',
  subject: 'fizyka',
  topic: 'Magnetyzm · ROZSZ',
  name: 'Prawo Faradaya (moduł SEM)',
  latex: '|\\varepsilon| = \\frac{\\Delta\\Phi}{\\Delta t}',
  vars: [
    { id: 'E', label: '|ε| [V]' },
    { id: 'dPhi', label: 'ΔΦ [Wb]' },
    { id: 'dt', label: 'Δt [s]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    if (unknown === 'E') {
      const dPhi = asRational(known['dPhi'], 'ΔΦ')
      const dt = asRational(known['dt'], 'Δt')
      const value = exactOf(div(dPhi, dt))
      return {
        values: [value],
        steps: stdSteps(
          '|\\varepsilon| = \\frac{\\Delta\\Phi}{\\Delta t}',
          `|\\varepsilon| = \\frac{${L(dPhi)}}{${L(dt)}}`,
          value,
          places,
        ),
      }
    }
    if (unknown === 'dPhi') {
      const E = asRational(known['E'], '|ε|')
      const dt = asRational(known['dt'], 'Δt')
      const value = exactOf(mul(E, dt))
      return {
        values: [value],
        steps: stdSteps(
          '\\Delta\\Phi = |\\varepsilon| \\cdot \\Delta t',
          `\\Delta\\Phi = ${L(E)} \\cdot ${L(dt)}`,
          value,
          places,
        ),
      }
    }
    const E = asRational(known['E'], '|ε|')
    const dPhi = asRational(known['dPhi'], 'ΔΦ')
    const value = exactOf(div(dPhi, E))
    return {
      values: [value],
      steps: stdSteps(
        '\\Delta t = \\frac{\\Delta\\Phi}{|\\varepsilon|}',
        `\\Delta t = \\frac{${L(dPhi)}}{${L(E)}}`,
        value,
        places,
      ),
    }
  },
}

const solenoid: FormulaDef = {
  id: 'solenoid',
  subject: 'fizyka',
  topic: 'Magnetyzm · ROZSZ',
  name: 'Pole solenoidu',
  latex: 'B = \\mu_0\\frac{NI}{l}',
  vars: [
    { id: 'B', label: 'B [T]' },
    { id: 'N', label: 'N (zwoje)' },
    { id: 'I', label: 'I [A]' },
    { id: 'l', label: 'l [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const MU = 4 * Math.PI * 1e-7
    const g = (id: string): number => {
      const v = num(known[id])
      if (!Number.isFinite(v)) throw new Error(`${id}: wpisz liczbę`)
      return v
    }
    let value: Exact
    let transform = ''
    let subst = ''
    if (unknown === 'B') {
      value = approxOnly((MU * g('N') * g('I')) / g('l'))
      transform = 'B = \\mu_0NI/l'
      subst = `B = \\mu_0 \\cdot ${g('N')} \\cdot ${g('I')} / ${g('l')}`
    } else if (unknown === 'N') {
      value = approxOnly((g('B') * g('l')) / (MU * g('I')))
      transform = 'N = Bl/(\\mu_0I)'
      subst = `N = ${g('B')} \\cdot ${g('l')} / (\\mu_0 \\cdot ${g('I')})`
    } else if (unknown === 'I') {
      value = approxOnly((g('B') * g('l')) / (MU * g('N')))
      transform = 'I = Bl/(\\mu_0N)'
      subst = `I = ${g('B')} \\cdot ${g('l')} / (\\mu_0 \\cdot ${g('N')})`
    } else {
      value = approxOnly((MU * g('N') * g('I')) / g('B'))
      transform = 'l = \\mu_0NI/B'
      subst = `l = \\mu_0 \\cdot ${g('N')} \\cdot ${g('I')} / ${g('B')}`
    }
    return { values: [value], steps: stdSteps(transform, subst, value, places, APPROX_NOTE) }
  },
}

const silaElektrodynamiczna: FormulaDef = {
  id: 'sila-elektrodynamiczna',
  subject: 'fizyka',
  topic: 'Magnetyzm · ROZSZ',
  name: 'Siła elektrodynamiczna',
  latex: 'F = BIl',
  vars: [
    { id: 'F', label: 'F [N]' },
    { id: 'B', label: 'B [T]' },
    { id: 'I', label: 'I [A]' },
    { id: 'l', label: 'l [m]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const g = (id: string) => asRational(known[id], id)
    if (unknown === 'F') {
      const value = exactOf(mul(mul(g('B'), g('I')), g('l')))
      return {
        values: [value],
        steps: stdSteps('F = BIl', `F = ${L(g('B'))} \\cdot ${L(g('I'))} \\cdot ${L(g('l'))}`, value, places),
      }
    }
    const others = ['B', 'I', 'l'].filter((id) => id !== unknown)
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

const bohr: FormulaDef = {
  id: 'bohr',
  subject: 'fizyka',
  topic: 'Atom · ROZSZ',
  name: 'Poziomy energetyczne Bohra',
  latex: 'E_n = \\frac{-13{,}6}{n^2} \\text{ eV}',
  vars: [{ id: 'n', label: 'n (powłoka)' }],
  mode: 'fixed',
  outputId: 'E',
  outputLabel: 'Eₙ',
  solve(_unknown, known, places): FormulaSolution {
    const n = requireNatural(known['n'], 'n')
    const value = exactOf(div(of(-136), mul(of(10), of(n * n))))
    return {
      values: [value],
      steps: [
        { title: '1. Wzór', body: 'E_n = \\frac{-13{,}6}{n^2} \\text{ eV}' },
        { title: '2. Podstawienie danych', body: `E_{${n}} = \\frac{-13{,}6}{${n}^2}` },
        { title: '3. Wynik', body: `${resultLatex(`E_{${n}}`, value, places)} \\text{ eV}` },
      ],
    }
  },
}

const debroglie: FormulaDef = {
  id: 'debroglie',
  subject: 'fizyka',
  topic: 'Atom · ROZSZ',
  name: 'Fala de Broglie’a',
  latex: '\\lambda = \\frac{h}{p}',
  vars: [
    { id: 'lambda', label: 'λ [m]' },
    { id: 'p', label: 'p [kg·m/s]' },
  ],
  mode: 'nvar',
  outputId: '',
  outputLabel: '',
  solve(unknown, known, places): FormulaSolution {
    const H = 6.63e-34
    if (unknown === 'lambda') {
      const p = num(known['p'])
      const value = approxOnly(H / p)
      return {
        values: [value],
        steps: stdSteps('\\lambda = h/p', `\\lambda = 6{,}63 \\cdot 10^{-34} / ${p}`, value, places, APPROX_NOTE),
      }
    }
    const lambda = num(known['lambda'])
    const value = approxOnly(H / lambda)
    return {
      values: [value],
      steps: stdSteps('p = h/\\lambda', `p = 6{,}63 \\cdot 10^{-34} / ${lambda}`, value, places, APPROX_NOTE),
    }
  },
}

const energiaRel: FormulaDef = {
  id: 'energia-rel',
  subject: 'fizyka',
  topic: 'Relatywistyka · ROZSZ',
  name: 'Energia całkowita (relatywistyka)',
  latex: 'E = \\frac{mc^2}{\\sqrt{1 - v^2/c^2}}',
  vars: [
    { id: 'E', label: 'E [J]' },
    { id: 'm', label: 'm [kg]' },
    { id: 'v', label: 'v [m/s]' },
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
    const gamma = (v: number): number => {
      if (v < 0 || v >= C_LIGHT) throw new Error('wymagane 0 ≤ v < c')
      return 1 / Math.sqrt(1 - (v / C_LIGHT) ** 2)
    }
    if (unknown === 'E') {
      const value = approxOnly(g('m') * C_LIGHT * C_LIGHT * gamma(g('v')))
      return {
        values: [value],
        steps: stdSteps(
          'E = \\gamma mc^2',
          `E = ${gamma(g('v')).toFixed(4)} \\cdot ${g('m')}c^2`,
          value,
          places,
          APPROX_NOTE,
        ),
      }
    }
    if (unknown === 'm') {
      const value = approxOnly(g('E') / (C_LIGHT * C_LIGHT * gamma(g('v'))))
      return {
        values: [value],
        steps: stdSteps('m = E/(\\gamma c^2)', `m = ${g('E')}/(\\gamma c^2)`, value, places, APPROX_NOTE),
      }
    }
    const ratio = (g('E') / (g('m') * C_LIGHT * C_LIGHT)) ** 2
    if (!(ratio > 1)) throw new Error('E musi być większe od energii spoczynkowej')
    const value = approxOnly(C_LIGHT * Math.sqrt(1 - 1 / ratio))
    return {
      values: [value],
      steps: stdSteps(
        'v = c\\sqrt{1 - (mc^2/E)^2}',
        `v = c\\sqrt{1 - (${g('m')}c^2/${g('E')})^2}`,
        value,
        places,
        APPROX_NOTE,
      ),
    }
  },
}

export const PHYSICS_PR: FormulaDef[] = [
  rzutPoziomy,
  momentSily,
  energiaObrotowa,
  bernoulli,
  clapeyron,
  pierwszaZasada,
  izobaryczna,
  carnot,
  rozszerzalnosc,
  coulomb,
  natezenie,
  potencjal,
  kondensatorQ,
  kondensatorE,
  sem,
  strumien,
  faraday,
  solenoid,
  silaElektrodynamiczna,
  bohr,
  debroglie,
  energiaRel,
]
