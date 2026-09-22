import { describe, expect, it } from "vitest";
import { addWritten, divWritten, expandPeriod, mulWritten, subWritten } from "./pisemne";

describe("expandPeriod", () => {
  it("wykrywa okres 1/3", () => {
    const ex = expandPeriod(1n, 3n, 10);
    expect(ex.int).toBe("0");
    expect(ex.pre).toBe("");
    expect(ex.per).toBe("3");
  });

  it("liczy część przedokresową 1/6", () => {
    const ex = expandPeriod(1n, 6n, 10);
    expect(ex.int).toBe("0");
    expect(ex.pre).toBe("1");
    expect(ex.per).toBe("6");
  });

  it("kończy dzielenie dokładne", () => {
    const ex = expandPeriod(7n, 2n, 5);
    expect(ex.int).toBe("3");
    expect(ex.pre).toBe("5");
    expect(ex.per).toBe("");
    expect(ex.capped).toBe(false);
  });
});

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

  it("liczy ujemne (-5 + 3 = -2)", () => {
    const steps = addWritten("-5", "3");
    expect(steps[steps.length - 1].body).toBe("= -2");
    expect(steps[0].title).toBe("1. Reguła znaków");
  });

  it("liczy dwa minusy (-5 + -3 = -8)", () => {
    const steps = addWritten("-5", "-3");
    expect(steps[steps.length - 1].body).toBe("= -8");
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

  it("liczy ujemne (-5 - -3 = -2)", () => {
    const steps = subWritten("-5", "-3");
    expect(steps[steps.length - 1].body).toBe("= -2");
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

  it("liczy ujemne (-2 × 3 = -6)", () => {
    const steps = mulWritten("-2", "3");
    expect(steps[steps.length - 1].body).toBe("= -6");
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

  it("przesuwa przecinek 12.5 : 2.5 = 5", () => {
    const steps = divWritten("12.5", "2.5");
    expect(steps[steps.length - 1].body).toBe("= 5");
    expect(steps[0].title).toMatch(/Przesuni/);
  });

  it("stawia przecinek 1 : 8 = 0.125", () => {
    const steps = divWritten("1", "8", 3);
    expect(steps[steps.length - 1].body).toBe("= 0.125");
  });

  it("dzieli 7 : 2 = 3.5", () => {
    const steps = divWritten("7", "2");
    expect(steps[steps.length - 1].body).toBe("= 3.5");
  });

  it("ucina do limitu miejsc z resztą", () => {
    const steps = divWritten("12.34", "1.2", 2);
    const last = steps[steps.length - 1];
    expect(last.body).toContain("10.28");
    expect(last.body).toContain("\\text{ r }");
    expect(last.note).toContain("reszta");
  });

  it("liczy ujemne (-7 : 2 = -3.5)", () => {
    const steps = divWritten("-7", "2");
    expect(steps[steps.length - 1].body).toBe("= -3.5");
  });

  it("wykrywa okres 1 : 6 = 0.1(6)", () => {
    const steps = divWritten("1", "6", 10);
    expect(steps[steps.length - 1].body).toBe("= 0.1(6)");
  });

  it("wykrywa okres 2 : 3 = 0.(6)", () => {
    const steps = divWritten("2", "3", 10);
    expect(steps[steps.length - 1].body).toBe("= 0.(6)");
  });

  it("liczy duże liczby na BigInt", () => {
    const steps = divWritten("100000000000000000000", "10");
    expect(steps[steps.length - 1].body).toBe("= 10000000000000000000");
  });

  it("rzuca przy dzieleniu przez zero", () => {
    expect(() => divWritten("10", "0")).toThrow();
  });
});
