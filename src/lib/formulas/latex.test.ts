import { describe, expect, it } from 'vitest'
import { FORMULAS } from './index'
import { solveFormula } from '../solver/solver'
import { renderLatex } from '../katex'

const CASES: [string, string, Record<string, string>][] = [
  ['matematyka', 'pitagoras', { a: '3', b: '4', c: '' }],
  ['matematyka', 'pitagoras', { a: '', b: '4', c: '5' }],
  ['matematyka', 'pitagoras', { a: '3', b: '', c: '5' }],
  ['matematyka', 'pole-trojkata', { P: '', a: '4', h: '5' }],
  ['matematyka', 'pole-trojkata', { P: '10', a: '', h: '5' }],
  ['matematyka', 'pole-trojkata', { P: '10', a: '4', h: '' }],
  ['matematyka', 'pole-prostokata', { P: '', a: '3', b: '4' }],
  ['matematyka', 'pole-prostokata', { P: '12', a: '', b: '4' }],
  ['matematyka', 'pole-prostokata', { P: '12', a: '3', b: '' }],
  ['matematyka', 'pole-kola', { P: '', r: '2' }],
  ['matematyka', 'pole-kola', { P: '25π', r: '' }],
  ['matematyka', 'pole-kola', { P: '25', r: '' }],
  ['matematyka', 'obwod-kola', { Ob: '', r: '1' }],
  ['matematyka', 'obwod-kola', { Ob: '10π', r: '' }],
  ['matematyka', 'obwod-kola', { Ob: '10', r: '' }],
  ['matematyka', 'rownanie-kwadratowe', { a: '1', b: '-5', c: '6' }],
  ['matematyka', 'rownanie-kwadratowe', { a: '1', b: '0', c: '1' }],
  ['matematyka', 'rownanie-kwadratowe', { a: '1', b: '-2', c: '1' }],
  ['matematyka', 'rownanie-kwadratowe', { a: '0', b: '2', c: '-4' }],
  ['matematyka', 'funkcja-liniowa', { a: '2', b: '-4' }],
  ['matematyka', 'funkcja-liniowa', { a: '0', b: '0' }],
  ['matematyka', 'funkcja-liniowa', { a: '0', b: '3' }],
  ['matematyka', 'procent', { p: '20', x: '50', w: '' }],
  ['matematyka', 'procent', { p: '', x: '50', w: '10' }],
  ['matematyka', 'procent', { p: '20', x: '', w: '10' }],
  ['matematyka', 'ciag-arytmetyczny', { an: '', a1: '2', n: '4', r: '3' }],
  ['matematyka', 'ciag-arytmetyczny', { an: '11', a1: '', n: '4', r: '3' }],
  ['matematyka', 'ciag-arytmetyczny', { an: '11', a1: '2', n: '', r: '3' }],
  ['matematyka', 'ciag-arytmetyczny', { an: '11', a1: '2', n: '4', r: '' }],
  ['matematyka', 'ciag-geometryczny', { an: '', a1: '2', q: '3', n: '4' }],
  ['matematyka', 'ciag-geometryczny', { an: '54', a1: '', q: '3', n: '4' }],
  ['matematyka', 'objetosc-prostopadloscianu', { V: '', a: '2', b: '3', c: '4' }],
  ['matematyka', 'objetosc-prostopadloscianu', { V: '24', a: '', b: '3', c: '4' }],
  ['matematyka', 'objetosc-kuli', { V: '', r: '3' }],
  ['matematyka', 'objetosc-kuli', { V: '36π', r: '' }],
  ['matematyka', 'objetosc-kuli', { V: '100', r: '' }],
  ['matematyka', 'pole-kuli', { P: '', r: '2' }],
  ['matematyka', 'pole-kuli', { P: '16π', r: '' }],
  ['matematyka', 'pole-kuli', { P: '50', r: '' }],
  ['fizyka', 'predkosc', { v: '', s: '100', t: '4' }],
  ['fizyka', 'predkosc', { v: '25', s: '', t: '4' }],
  ['fizyka', 'predkosc', { v: '25', s: '100', t: '' }],
  ['fizyka', 'droga-jednostajnie-przyspieszona', { s: '', v0: '2', a: '2', t: '3' }],
  ['fizyka', 'droga-jednostajnie-przyspieszona', { s: '15', v0: '', a: '2', t: '3' }],
  ['fizyka', 'droga-jednostajnie-przyspieszona', { s: '15', v0: '2', a: '', t: '3' }],
  ['fizyka', 'droga-jednostajnie-przyspieszona', { s: '4', v0: '0', a: '2', t: '' }],
  ['fizyka', 'sila', { F: '', m: '2', a: '5' }],
  ['fizyka', 'sila', { F: '10', m: '', a: '2' }],
  ['fizyka', 'sila', { F: '10', m: '2', a: '' }],
  ['fizyka', 'energia-kinetyczna', { Ek: '', m: '2', v: '10' }],
  ['fizyka', 'energia-kinetyczna', { Ek: '100', m: '', v: '10' }],
  ['fizyka', 'energia-kinetyczna', { Ek: '100', m: '2', v: '' }],
  ['fizyka', 'energia-potencjalna', { Ep: '', m: '2', h: '5' }],
  ['fizyka', 'energia-potencjalna', { Ep: '100', m: '', h: '5' }],
  ['fizyka', 'energia-potencjalna', { Ep: '100', m: '2', h: '' }],
  ['fizyka', 'gestosc', { ro: '', m: '10', V: '2' }],
  ['fizyka', 'gestosc', { ro: '5', m: '', V: '2' }],
  ['fizyka', 'gestosc', { ro: '5', m: '10', V: '' }],
  ['fizyka', 'cisnienie', { p: '', F: '20', S: '4' }],
  ['fizyka', 'cisnienie', { p: '5', F: '', S: '4' }],
  ['fizyka', 'cisnienie', { p: '5', F: '20', S: '' }],
  ['fizyka', 'praca', { W: '', F: '5', s: '4' }],
  ['fizyka', 'praca', { W: '20', F: '', s: '4' }],
  ['fizyka', 'praca', { W: '20', F: '5', s: '' }],
]

describe('latex validity', () => {
  it('covers every registered formula', () => {
    const covered = new Set(CASES.map(([s, id]) => `${s}/${id}`))
    for (const f of FORMULAS) {
      expect(covered.has(`${f.subject}/${f.id}`)).toBe(true)
    }
  })

  it.each(CASES)('%s/%s renders every step without fallback', (subject, id, raw) => {
    const def = FORMULAS.find((f) => f.subject === subject && f.id === id)
    if (!def) throw new Error(`missing ${subject}/${id}`)
    expect(renderLatex(def.latex)).not.toMatch(/latex-fallback/)
    const r = solveFormula(def, raw, 2)
    if (!r.ok) throw new Error(`${subject}/${id}: ${r.error}`)
    for (const s of r.steps) {
      expect(renderLatex(s.body)).not.toMatch(/latex-fallback/)
    }
  })
})
