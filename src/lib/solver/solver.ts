import { parseExact } from "../exact/exact";
import type { Exact } from "../exact/exact";
import type { FormulaDef, SolveStep } from "../formulas/types";

export type SolverResult =
  | {
      ok: true;
      unknown: string;
      unknownLabel: string;
      values: Exact[];
      labels: string[];
      steps: SolveStep[];
    }
  | { ok: false; error: string };

function parseInput(label: string, raw: string): Exact {
  try {
    return parseExact(raw);
  } catch {
    throw new Error(`${label}: wpisz liczbę (np. 2,5 albo 1/3)`);
  }
}

export function solveFormula(
  def: FormulaDef,
  raw: Record<string, string>,
  places = 2,
): SolverResult {
  try {
    const selects: Record<string, string> = {};
    for (const v of def.vars) {
      if (v.kind === "list") {
        selects[v.id] = (raw[v.id] ?? "").trim();
        continue;
      }
      if (v.kind !== "select") continue;
      const opts = v.options ?? [];
      const s = (raw[v.id] ?? "").trim();
      selects[v.id] = opts.includes(s) ? s : (opts[0] ?? "");
    }
    if (def.mode === "fixed") {
      const known: Record<string, Exact> = {};
      for (const v of def.vars) {
        if (v.kind === "select" || v.kind === "list") continue;
        const s = (raw[v.id] ?? "").trim();
        if (s === "") return { ok: false, error: `uzupełnij pole ${v.label}` };
        known[v.id] = parseInput(v.label, s);
      }
      const sol = def.solve(def.outputId, known, places, selects);
      return {
        ok: true,
        unknown: def.outputId,
        unknownLabel: def.outputLabel,
        values: sol.values,
        labels: sol.labels ?? [],
        steps: sol.steps,
      };
    }
    const empty = def.vars.filter(
      (v) => v.kind !== "select" && v.kind !== "list" && (raw[v.id] ?? "").trim() === "",
    );
    if (empty.length === 0)
      return { ok: false, error: "zostaw jedno pole puste — to będzie niewiadoma" };
    if (empty.length > 1)
      return { ok: false, error: "zostaw dokładnie jedno puste pole — resztę uzupełnij" };
    const unknown = empty[0];
    const known: Record<string, Exact> = {};
    for (const v of def.vars) {
      if (v.id === unknown.id || v.kind === "select" || v.kind === "list") continue;
      known[v.id] = parseInput(v.label, (raw[v.id] ?? "").trim());
    }
    const sol = def.solve(unknown.id, known, places, selects);
    return {
      ok: true,
      unknown: unknown.id,
      unknownLabel: unknown.label,
      values: sol.values,
      labels: sol.labels ?? [],
      steps: sol.steps,
    };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Błąd obliczeń" };
  }
}
