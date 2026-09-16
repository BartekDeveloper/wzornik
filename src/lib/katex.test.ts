import { describe, expect, it } from 'vitest'
import { renderLatex } from './katex'

describe('renderLatex', () => {
  it('renders valid latex to katex html', () => {
    expect(renderLatex('\\frac{1}{2}')).toMatch(/class="katex"/)
  })

  it('falls back to code on invalid input', () => {
    expect(renderLatex('\\thiscommanddoesnotexist{')).toMatch(/latex-fallback/)
  })

  it('escapes html in fallback', () => {
    expect(renderLatex('\\bad{<script>')).toMatch(/&lt;script&gt;/)
  })
})
