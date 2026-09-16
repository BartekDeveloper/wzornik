export type Dim = 'length' | 'mass' | 'time' | 'speed'

export interface UnitDef {
  symbol: string
  dim: Dim
  toBase: number
}

const TABLE: UnitDef[] = [
  { symbol: 'mm', dim: 'length', toBase: 0.001 },
  { symbol: 'cm', dim: 'length', toBase: 0.01 },
  { symbol: 'm', dim: 'length', toBase: 1 },
  { symbol: 'km', dim: 'length', toBase: 1000 },
  { symbol: 'g', dim: 'mass', toBase: 0.001 },
  { symbol: 'kg', dim: 'mass', toBase: 1 },
  { symbol: 't', dim: 'mass', toBase: 1000 },
  { symbol: 's', dim: 'time', toBase: 1 },
  { symbol: 'min', dim: 'time', toBase: 60 },
  { symbol: 'h', dim: 'time', toBase: 3600 },
  { symbol: 'm/s', dim: 'speed', toBase: 1 },
  { symbol: 'km/h', dim: 'speed', toBase: 1 / 3.6 },
]

const BY_SYMBOL = new Map(TABLE.map((u) => [u.symbol, u]))

export function unitOf(symbol: string): UnitDef {
  const u = BY_SYMBOL.get(symbol)
  if (!u) throw new Error(`jednostki: nieznana jednostka "${symbol}"`)
  return u
}

export function unitsOf(dim: Dim): string[] {
  return TABLE.filter((u) => u.dim === dim).map((u) => u.symbol)
}

export function convert(value: number, from: string, to: string): number {
  const a = unitOf(from)
  const b = unitOf(to)
  if (a.dim !== b.dim) {
    throw new Error(`jednostki: nie dodasz ${a.dim} do ${b.dim} — niezgodne wymiary`)
  }
  return (value * a.toBase) / b.toBase
}
