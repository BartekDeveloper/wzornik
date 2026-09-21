import { describe, expect, it } from "vitest";
import { addWritten, divWritten, mulWritten, subWritten } from "./pisemne";

describe("addWritten", () => {
  it("dodaje 123 + 456", () => {
    const steps = addWritten("123", "456");
    expect(steps[steps.length - 1].body).toBe("= 579");
  });

  it("przenosi przez rząd (999 + 1)", () => {
    const steps = addWritten("999", "1");
    expect(steps[steps.length - 1].body).toBe("= 1000");
  });

  it("wyrównuje przecinek (2.5 + 3.75)", () => {
    const steps = addWritten("2.5", "3.75");
    expect(steps[steps.length - 1].body).toBe("= 6.25");
  });
});

describe("subWritten", () => {
  it("odejmuje 456 - 123", () => {
    const steps = subWritten("456", "123");
    expect(steps[steps.length - 1].body).toBe("= 333");
  });

  it("pożycza przez zera (1000 - 1)", () => {
    const steps = subWritten("1000", "1");
    expect(steps[steps.length - 1].body).toBe("= 999");
  });

  it("odwraca kolejność przy ujemnym wyniku", () => {
    const steps = subWritten("123", "456");
    expect(steps[steps.length - 1].body).toBe("= -333");
  });

  it("liczy dziesiętne (5.5 - 2.25)", () => {
    const steps = subWritten("5.5", "2.25");
    expect(steps[steps.length - 1].body).toBe("= 3.25");
  });
});

describe("mulWritten", () => {
  it("mnoży 123 × 45", () => {
    const steps = mulWritten("123", "45");
    expect(steps[steps.length - 1].body).toBe("= 5535");
  });

  it("stawia przecinek (0.2 × 0.3)", () => {
    const steps = mulWritten("0.2", "0.3");
    expect(steps[steps.length - 1].body).toBe("= 0.06");
  });

  it("mnoży 12 × 12", () => {
    const steps = mulWritten("12", "12");
    expect(steps[steps.length - 1].body).toBe("= 144");
  });
});

describe("divWritten", () => {
  it("dzieli 1234 : 12", () => {
    const steps = divWritten("1234", "12");
    expect(steps[steps.length - 1].body).toContain("102");
  });

  it("dzieli bez reszty 144 : 12", () => {
    const steps = divWritten("144", "12");
    expect(steps[steps.length - 1].body).toBe("= 12");
  });

  it("rzuca przy dzieleniu przez zero", () => {
    expect(() => divWritten("10", "0")).toThrow();
  });
});
