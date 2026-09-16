import { describe, expect, it } from 'vitest'
import { renderDiagram } from './geometry'

const SUPPORTED: [string, Record<string, number>][] = [
  ['pitagoras', { a: 3, b: 4, c: 5 }],
  ['pole-trojkata', { P: 10, a: 4, h: 5 }],
  ['pole-prostokata', { P: 12, a: 3, b: 4 }],
  ['pole-kola', { P: 12.57, r: 2 }],
  ['obwod-kola', { Ob: 6.28, r: 1 }],
  ['objetosc-prostopadloscianu', { V: 24, a: 2, b: 3, c: 4 }],
  ['objetosc-kuli', { V: 113.1, r: 3 }],
  ['pole-kuli', { P: 50.27, r: 2 }],
]

describe('renderDiagram', () => {
  it.each(SUPPORTED)('%s renders svg with labels and no NaN', (id, nums) => {
    const svg = renderDiagram(id, nums, Object.keys(nums)[0])
    expect(svg).toMatch(/^<svg/)
    expect(svg).toMatch(/<\/svg>$/)
    expect(svg).not.toMatch(/NaN|undefined/)
  })

  it('highlights the unknown edge', () => {
    const svg = renderDiagram('pitagoras', { a: 3, b: 4, c: 5 }, 'c')
    expect(svg).toMatch(/stroke="#B23B30"/)
    const plain = renderDiagram('pitagoras', { a: 3, b: 4, c: 5 }, 'a')
    expect(plain).not.toBe(svg)
  })

  it('returns null for formulas without geometry', () => {
    expect(renderDiagram('procent', { p: 20, x: 50, w: 10 }, 'w')).toBeNull()
    expect(renderDiagram('sila', { F: 10, m: 5, a: 2 }, 'm')).toBeNull()
  })

  it('returns null for degenerate data', () => {
    expect(renderDiagram('pitagoras', { a: 0, b: 4, c: 5 }, 'a')).toBeNull()
    expect(renderDiagram('pole-kola', { P: 1, r: -2 }, 'r')).toBeNull()
    expect(renderDiagram('pole-kola', { P: 1 }, 'r')).toBeNull()
  })
})
