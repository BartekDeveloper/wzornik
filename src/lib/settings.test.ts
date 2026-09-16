import { describe, expect, it } from 'vitest'
import { DEFAULT_SETTINGS, loadSettings, saveSettings } from './settings'
import type { KeyStorage } from './settings'

function mem(initial?: Record<string, string>): KeyStorage {
  const m = new Map<string, string>(Object.entries(initial ?? {}))
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => {
      m.set(k, v)
    },
  }
}

describe('settings', () => {
  it('defaults to dark with 2 places', () => {
    expect(loadSettings(mem())).toEqual(DEFAULT_SETTINGS)
    expect(DEFAULT_SETTINGS.theme).toBe('dark')
  })

  it('round-trips light theme and places', () => {
    const s = mem()
    saveSettings({ theme: 'light', places: 4 }, s)
    expect(loadSettings(s)).toEqual({ theme: 'light', places: 4 })
  })

  it('sanitizes garbage', () => {
    expect(loadSettings(mem({ 'wm:settings': 'not json' }))).toEqual(DEFAULT_SETTINGS)
    expect(loadSettings(mem({ 'wm:settings': '{"theme":"blue","places":99}' }))).toEqual({
      theme: 'dark',
      places: 2,
    })
  })
})
