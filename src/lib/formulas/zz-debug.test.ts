import { describe, expect, it } from "vitest";
import { divWritten } from "./pisemne";

describe("debug", () => {
  it("dumps", () => {
    const steps = divWritten("144", "12");
    console.log(JSON.stringify(steps, null, 1).slice(0, 800));
    expect(true).toBe(true);
  });
});
