import { describe, expect, it } from 'vitest'
import { convert } from './units'

describe('units', () => {
  it('converts 36 km/h to 10 m/s', () => {
    expect(convert(36, 'km/h', 'm/s')).toBeCloseTo(10, 10)
  })

  it('converts 1 km to 1000 m', () => {
    expect(convert(1, 'km', 'm')).toBe(1000)
  })

  it('rejects mismatched dimensions', () => {
    expect(() => convert(1, 'm', 's')).toThrow()
  })
})
