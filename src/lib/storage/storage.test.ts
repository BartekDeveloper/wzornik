import "fake-indexeddb/auto";
import { beforeEach, describe, expect, it } from "vitest";
import {
  addHistory,
  clearHistory,
  getFavorites,
  getHistory,
  isFavorite,
  toggleFavorite,
} from "./db";

function entry(i: number) {
  return {
    subject: "fizyka",
    formulaId: "sila",
    formulaName: "Druga zasada dynamiki",
    inputs: { F: "10", m: "", a: "2" },
    result: `m = ${i}`,
  };
}

beforeEach(async () => {
  await clearHistory();
  for (const f of await getFavorites()) {
    await toggleFavorite(f.key);
  }
});

describe("history", () => {
  it("stores and returns newest first", async () => {
    await addHistory(entry(1));
    await addHistory(entry(2));
    const all = await getHistory();
    expect(all).toHaveLength(2);
    expect(all[0].result).toBe("m = 2");
  });

  it("prunes beyond the limit", async () => {
    for (let i = 0; i < 105; i++) {
      await addHistory(entry(i));
    }
    const all = await getHistory(200);
    expect(all).toHaveLength(100);
    expect(all[0].result).toBe("m = 104");
  });

  it("clears everything", async () => {
    await addHistory(entry(1));
    await clearHistory();
    expect(await getHistory()).toHaveLength(0);
  });
});

describe("favorites", () => {
  it("toggles on and off", async () => {
    expect(await toggleFavorite("fizyka/sila")).toBe(true);
    expect(await isFavorite("fizyka/sila")).toBe(true);
    expect(await toggleFavorite("fizyka/sila")).toBe(false);
    expect(await isFavorite("fizyka/sila")).toBe(false);
  });

  it("lists newest first", async () => {
    await toggleFavorite("matematyka/pitagoras");
    await toggleFavorite("fizyka/sila");
    const keys = (await getFavorites()).map((f) => f.key);
    expect(keys[0]).toBe("fizyka/sila");
  });
});
