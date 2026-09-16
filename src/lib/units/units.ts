export type Category =
  | "length"
  | "mass"
  | "time"
  | "speed"
  | "area"
  | "volume"
  | "pressure"
  | "energy"
  | "power"
  | "temperature"
  | "angle";

export interface CategoryDef {
  id: Category;
  label: string;
}

export const CATEGORIES: CategoryDef[] = [
  { id: "length", label: "Długość" },
  { id: "mass", label: "Masa" },
  { id: "time", label: "Czas" },
  { id: "speed", label: "Prędkość" },
  { id: "area", label: "Pole powierzchni" },
  { id: "volume", label: "Objętość" },
  { id: "pressure", label: "Ciśnienie" },
  { id: "energy", label: "Energia" },
  { id: "power", label: "Moc" },
  { id: "temperature", label: "Temperatura" },
  { id: "angle", label: "Kąt" },
];

export interface UnitDef {
  symbol: string;
  cat: Category;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

function lin(factor: number): Pick<UnitDef, "toBase" | "fromBase"> {
  return { toBase: (v) => v * factor, fromBase: (v) => v / factor };
}

const TABLE: UnitDef[] = [
  { symbol: "mm", cat: "length", ...lin(0.001) },
  { symbol: "cm", cat: "length", ...lin(0.01) },
  { symbol: "dm", cat: "length", ...lin(0.1) },
  { symbol: "m", cat: "length", ...lin(1) },
  { symbol: "km", cat: "length", ...lin(1000) },
  { symbol: "mila", cat: "length", ...lin(1609.344) },
  { symbol: "mg", cat: "mass", ...lin(0.000001) },
  { symbol: "g", cat: "mass", ...lin(0.001) },
  { symbol: "dag", cat: "mass", ...lin(0.01) },
  { symbol: "kg", cat: "mass", ...lin(1) },
  { symbol: "t", cat: "mass", ...lin(1000) },
  { symbol: "ms", cat: "time", ...lin(0.001) },
  { symbol: "s", cat: "time", ...lin(1) },
  { symbol: "min", cat: "time", ...lin(60) },
  { symbol: "h", cat: "time", ...lin(3600) },
  { symbol: "doba", cat: "time", ...lin(86400) },
  { symbol: "m/s", cat: "speed", ...lin(1) },
  { symbol: "km/h", cat: "speed", ...lin(1 / 3.6) },
  { symbol: "węzeł", cat: "speed", ...lin(0.514444) },
  { symbol: "mm²", cat: "area", ...lin(0.000001) },
  { symbol: "cm²", cat: "area", ...lin(0.0001) },
  { symbol: "m²", cat: "area", ...lin(1) },
  { symbol: "a", cat: "area", ...lin(100) },
  { symbol: "ha", cat: "area", ...lin(10000) },
  { symbol: "km²", cat: "area", ...lin(1000000) },
  { symbol: "cm³", cat: "volume", ...lin(0.000001) },
  { symbol: "ml", cat: "volume", ...lin(0.000001) },
  { symbol: "l", cat: "volume", ...lin(0.001) },
  { symbol: "dm³", cat: "volume", ...lin(0.001) },
  { symbol: "m³", cat: "volume", ...lin(1) },
  { symbol: "Pa", cat: "pressure", ...lin(1) },
  { symbol: "hPa", cat: "pressure", ...lin(100) },
  { symbol: "kPa", cat: "pressure", ...lin(1000) },
  { symbol: "MPa", cat: "pressure", ...lin(1000000) },
  { symbol: "bar", cat: "pressure", ...lin(100000) },
  { symbol: "atm", cat: "pressure", ...lin(101325) },
  { symbol: "mmHg", cat: "pressure", ...lin(133.322) },
  { symbol: "J", cat: "energy", ...lin(1) },
  { symbol: "kJ", cat: "energy", ...lin(1000) },
  { symbol: "cal", cat: "energy", ...lin(4.184) },
  { symbol: "kcal", cat: "energy", ...lin(4184) },
  { symbol: "eV", cat: "energy", ...lin(1.602176634e-19) },
  { symbol: "kWh", cat: "energy", ...lin(3600000) },
  { symbol: "W", cat: "power", ...lin(1) },
  { symbol: "kW", cat: "power", ...lin(1000) },
  { symbol: "KM", cat: "power", ...lin(735.49875) },
  {
    symbol: "°C",
    cat: "temperature",
    toBase: (v) => v + 273.15,
    fromBase: (v) => v - 273.15,
  },
  { symbol: "K", cat: "temperature", ...lin(1) },
  {
    symbol: "°F",
    cat: "temperature",
    toBase: (v) => ((v - 32) * 5) / 9 + 273.15,
    fromBase: (v) => ((v - 273.15) * 9) / 5 + 32,
  },
  { symbol: "°", cat: "angle", ...lin(Math.PI / 180) },
  { symbol: "rad", cat: "angle", ...lin(1) },
  { symbol: "grad", cat: "angle", ...lin(Math.PI / 200) },
];

const BY_SYMBOL = new Map(TABLE.map((u) => [u.symbol, u]));

export function unitOf(symbol: string): UnitDef {
  const u = BY_SYMBOL.get(symbol);
  if (!u) throw new Error(`jednostki: nieznana jednostka "${symbol}"`);
  return u;
}

export function unitsOf(cat: Category): string[] {
  return TABLE.filter((u) => u.cat === cat).map((u) => u.symbol);
}

export function convert(value: number, from: string, to: string): number {
  if (!Number.isFinite(value)) throw new Error("jednostki: wpisz liczbę");
  const a = unitOf(from);
  const b = unitOf(to);
  if (a.cat !== b.cat) {
    throw new Error(`jednostki: nie zamienię ${from} na ${to} — różne kategorie`);
  }
  return b.fromBase(a.toBase(value));
}
