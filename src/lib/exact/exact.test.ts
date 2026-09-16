import { describe, expect, it } from 'vitest'
import { fromString } from './rational'
import { approx, exactOf, solveQuadratic, sqrtRational } from './exact'
import { formatDecimal, formatExactText, formatLatex } from './format'

describe('sqrtRational', () => {
  it('reduces √12 to 2√3', () => {
    expect(formatExactText(sqrtRational(fromString('12')))).toBe('2√3')
  })

  it('keeps perfect squares rational', () => {
    expect(formatExactText(sqrtRational(fromString('9')))).toBe('3')
  })
})

describe('solveQuadratic', () => {
  it('solves x²-5x+6=0 exactly', () => {
    const q = solveQuadratic(fromString('1'), fromString('-5'), fromString('6'))
    expect(q.kind).toBe('two')
    if (q.kind === 'two') {
      expect(formatExactText(q.roots[0])).toBe('2')
      expect(formatExactText(q.roots[1])).toBe('3')
    }
  })

  it('solves x²-2=0 as ±√2', () => {
    const q = solveQuadratic(fromString('1'), fromString('0'), fromString('-2'))
    expect(q.kind).toBe('two')
    if (q.kind === 'two') {
      expect(formatExactText(q.roots[0])).toBe('−√2')
      expect(formatExactText(q.roots[1])).toBe('√2')
      expect(approx(q.roots[1])).toBeCloseTo(Math.SQRT2, 10)
    }
  })

  it('reports no real roots for Δ<0', () => {
    const q = solveQuadratic(fromString('1'), fromString('0'), fromString('1'))
    expect(q.kind).toBe('none')
  })

  it('solves the linear fallback when a=0', () => {
    const q = solveQuadratic(fromString('0'), fromString('2'), fromString('-4'))
    expect(q.kind).toBe('linear')
    if (q.kind === 'linear') expect(formatExactText(q.roots[0])).toBe('2')
  })
})

describe('format', () => {
  it('renders latex with sqrt', () => {
    expect(formatLatex(sqrtRational(fromString('12')))).toBe('2\\sqrt{3}')
  })

  it('rounds decimals', () => {
    expect(formatDecimal(sqrtRational(fromString('2')), 2)).toBe('1.41')
    expect(formatDecimal(exactOf(fromString('1/3')), 2)).toBe('0.33')
  })
})
