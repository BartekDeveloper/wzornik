import { describe, expect, it } from 'vitest'
import { searchFormulas } from './search'

describe('searchFormulas', () => {
  it('finds quadratic by "delta"', () => {
    const r = searchFormulas('delta')
    expect(r.length).toBeGreaterThan(0)
    expect(r[0].id).toBe('rownanie-kwadratowe')
  })

  it('matches without diacritics', () => {
    const ids = searchFormulas('kolo').map((f) => f.id)
    expect(ids).toContain('pole-kola')
    expect(ids).toContain('obwod-kola')
  })

  it('finds energy formulas', () => {
    const ids = searchFormulas('energia').map((f) => f.id)
    expect(ids).toContain('energia-kinetyczna')
    expect(ids).toContain('energia-potencjalna')
  })

  it('filters by subject', () => {
    const r = searchFormulas('', 'fizyka')
    expect(r.length).toBeGreaterThan(0)
    expect(r.every((f) => f.subject === 'fizyka')).toBe(true)
  })

  it('returns empty for gibberish', () => {
    expect(searchFormulas('xyzqq')).toHaveLength(0)
  })

  it('finds newton and coulomb by keyword', () => {
    expect(searchFormulas('dwumian')[0].id).toBe('newton')
    expect(searchFormulas('coulomb')[0].id).toBe('coulomb')
  })
})
