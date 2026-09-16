import { describe, expect, it } from "vitest";
import { CATEGORIES, convert, unitsOf } from "./units";

describe("units", () => {
  it("converts 36 km/h to 10 m/s", () => {
    expect(convert(36, "km/h", "m/s")).toBeCloseTo(10, 10);
  });

  it("converts 1 km to 1000 m", () => {
    expect(convert(1, "km", "m")).toBe(1000);
  });

  it("converts hectares and ares", () => {
    expect(convert(1, "ha", "m²")).toBe(10000);
    expect(convert(3, "a", "m²")).toBe(300);
  });

  it("converts liters and milliliters", () => {
    expect(convert(2, "l", "ml")).toBeCloseTo(2000, 8);
    expect(convert(1, "m³", "l")).toBeCloseTo(1000, 8);
  });

  it("converts pressure", () => {
    expect(convert(1, "atm", "kPa")).toBeCloseTo(101.325, 8);
    expect(convert(1000, "hPa", "bar")).toBeCloseTo(1, 10);
  });

  it("converts energy and power", () => {
    expect(convert(1, "kWh", "J")).toBe(3600000);
    expect(convert(1, "KM", "W")).toBeCloseTo(735.5, 1);
  });

  it("converts temperature with offset", () => {
    expect(convert(0, "°C", "K")).toBeCloseTo(273.15, 8);
    expect(convert(100, "°C", "°F")).toBeCloseTo(212, 8);
    expect(convert(32, "°F", "°C")).toBeCloseTo(0, 8);
  });

  it("rejects mismatched categories", () => {
    expect(() => convert(1, "m", "s")).toThrow();
  });

  it("converts angles", () => {
    expect(convert(180, "°", "rad")).toBeCloseTo(Math.PI, 10);
    expect(convert(Math.PI, "rad", "°")).toBeCloseTo(180, 8);
    expect(convert(200, "grad", "°")).toBeCloseTo(180, 8);
  });

  it("lists units per category", () => {
    expect(unitsOf("temperature")).toEqual(["°C", "K", "°F"]);
    expect(unitsOf("angle")).toEqual(["°", "rad", "grad"]);
    expect(CATEGORIES).toHaveLength(11);
  });
});
