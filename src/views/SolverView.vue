<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { getFormula, SUBJECTS } from "../lib/formulas/index";
import { solveFormula, isVarVisible } from "../lib/solver/solver";
import { parseEquation } from "../lib/parse-formula";
import { formatDecimal, formatLatex, trimNum } from "../lib/exact/format";
import { approx, isApproxOnly, parseExact } from "../lib/exact/exact";
import type { Exact } from "../lib/exact/exact";
import { solveQuadratic } from "../lib/exact/exact";
import {
  absPlot,
  homograficznaPlot,
  linearPlot,
  parabolaStycznaPlot,
  polyPlot,
  quadraticPlot,
  quadraticReciprocalPlot,
  rationalRootsOf,
  trajectoryPlot,
  ukladPlot,
} from "../lib/plots/plot";
import type { InequalityOp } from "../lib/plots/plot";
import { inequalityBands } from "../lib/plots/plot";
import { addHistory, isFavorite, toggleFavorite } from "../lib/storage/db";
import { loadSettings } from "../lib/settings";
import { getDescription } from "../lib/descriptions";
import { getRelations, transferQuery } from "../lib/formulas/relations";
import type { FormulaDef } from "../lib/formulas/types";
import Formula from "../components/Formula.vue";
import FormulaDiagram from "../components/FormulaDiagram.vue";
import FunctionPlot from "../components/FunctionPlot.vue";
import MathKeyBar from "../components/MathKeyBar.vue";

const props = defineProps<{ subject?: string; formula?: string }>();

const def = computed(() =>
  props.subject && props.formula ? getFormula(props.subject, props.formula) : undefined,
);

const description = computed(() => (props.formula ? getDescription(props.formula) : undefined));

const subjectLabel = computed(() =>
  def.value ? (SUBJECTS.find((s) => s.id === def.value!.subject)?.label ?? def.value!.subject) : "",
);

const inputs = reactive<Record<string, string>>({});
const places = ref(loadSettings().places);

const visibleVars = computed(() =>
  def.value ? def.value.vars.filter((v) => isVarVisible(v, inputs)) : [],
);
const isFav = ref(false);
const quick = ref("");
const quickError = ref("");
const quickSuggest = ref<{ subject: string; id: string; name: string; fill: string } | null>(null);
const route = useRoute();

function applyFill(raw: string): boolean {
  const parsed = parseEquation(raw);
  if (!parsed || !def.value) return false;
  if (parsed.id !== def.value.id) {
    quickSuggest.value = {
      subject: parsed.subject,
      id: parsed.id,
      name: getFormula(parsed.subject, parsed.id)?.name ?? parsed.id,
      fill: raw,
    };
    return false;
  }
  quickSuggest.value = null;
  for (const v of def.value.vars) {
    if (v.kind === "select") continue;
    const val = parsed.values[v.id];
    if (val !== undefined) inputs[v.id] = val;
  }
  for (const [k, v] of Object.entries(parsed.selects ?? {})) {
    if (def.value.vars.some((x) => x.id === k && x.kind === "select")) inputs[k] = v;
  }
  return true;
}

function applyQuick(): void {
  quickError.value = "";
  quickSuggest.value = null;
  if (quick.value.trim() === "") return;
  if (!applyFill(quick.value.trim()) && !quickSuggest.value) {
    quickError.value = "Nie rozpoznano zapisu dla tego wzoru — wpisz liczby w pola powyżej.";
  }
}

const favKey = computed(() =>
  props.subject && props.formula ? `${props.subject}/${props.formula}` : "",
);

async function toggleFav(): Promise<void> {
  if (!favKey.value) return;
  try {
    isFav.value = await toggleFavorite(favKey.value);
  } catch {
    isFav.value = false;
  }
}

watch(
  def,
  (d) => {
    for (const k of Object.keys(inputs)) delete inputs[k];
    if (d) for (const v of d.vars) inputs[v.id] = v.kind === "select" ? (v.options?.[0] ?? "") : "";
    const fill = route.query.fill;
    if (typeof fill === "string" && fill !== "") applyFill(fill);
    for (const [k, v] of Object.entries(route.query)) {
      if (!k.startsWith("v_") || typeof v !== "string" || v === "") continue;
      const vr = d?.vars.find((x) => x.id === k.slice(2));
      if (vr && vr.kind === undefined) inputs[vr.id] = v;
    }
    isFav.value = false;
    if (d && favKey.value) {
      isFavorite(favKey.value)
        .then((v) => {
          isFav.value = v;
        })
        .catch(() => {
          isFav.value = false;
        });
    }
  },
  { immediate: true },
);

const SUB = ["₁", "₂", "₃", "₄"];

const hasAnyInput = computed(() => Object.values(inputs).some((s) => s.trim() !== ""));

const view = computed(() => {
  const d = def.value;
  if (!d) return { state: "missing" as const };
  const r = solveFormula(d, { ...inputs }, places.value);
  if (!r.ok) {
    return {
      state: "idle" as const,
      error: hasAnyInput.value ? r.error : "",
      hint: !hasAnyInput.value,
    };
  }
  return {
    state: "done" as const,
    unknownId: r.unknown,
    unknownLabel: r.unknownLabel,
    values: r.values.map((v, i) => ({
      label: r.labels[i] ?? (r.values.length > 1 ? `x${SUB[i] ?? `_${i + 1}`}` : r.unknownLabel),
      tex: formatLatex(v),
      dec: formatDecimal(v, places.value),
      approx: isApproxOnly(v),
    })),
    raw: r.values as Exact[],
    labels: r.labels,
    steps: r.steps,
    first: r.values[0],
  };
});

const related = computed(() =>
  def.value ? getRelations(def.value.id) : { simpler: [], harder: [] },
);

function linkQuery(target: FormulaDef): Record<string, string> {
  const d = def.value;
  if (!d) return {};
  const st = view.value;
  return st.state === "done"
    ? transferQuery(d, target, { inputs, values: st.raw, labels: st.labels })
    : transferQuery(d, target, { inputs });
}

const diagramNums = computed<Record<string, number> | null>(() => {
  const d = def.value;
  const st = view.value;
  if (!d || st.state !== "done" || d.mode !== "nvar") return null;
  const nums: Record<string, number> = {};
  for (const v of d.vars) {
    try {
      const e =
        v.id === st.unknownId && st.first ? st.first : parseExact((inputs[v.id] ?? "").trim());
      const n = approx(e);
      if (!Number.isFinite(n) || n <= 0) return null;
      nums[v.id] = n;
    } catch {
      return null;
    }
  }
  return nums;
});

const diagramCaption = computed<string | undefined>(() => {
  const d = def.value;
  const n = diagramNums.value;
  if (!d || !n) return undefined;
  return `${d.name}: ${d.vars.map((v) => `${v.id} = ${trimNum(n[v.id] ?? NaN)}`).join(", ")}`;
});

function numInput(id: string): number | null {
  try {
    const n = approx(parseExact((inputs[id] ?? "").trim()));
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

const plotData = computed(() => {
  const d = def.value;
  if (!d) return null;
  if (d.id === "rownanie-kwadratowe") {
    const a = numInput("a");
    const b = numInput("b");
    const c = numInput("c");
    if (a === null || b === null || c === null) return null;
    if (a !== 0) return quadraticPlot(a, b, c);
    return b !== 0 ? linearPlot(b, c) : null;
  }
  if (
    d.id === "postacie-kwadratowej" ||
    d.id === "kwadratowa-iloczynowa" ||
    d.id === "delta" ||
    d.id === "ekstrema-kwadratowej" ||
    d.id === "monotonicznosc-kwadratowej" ||
    d.id === "miejsca-zerowe-kwadratowej"
  ) {
    const a = numInput("a");
    const b = numInput("b");
    const c = numInput("c");
    if (a === null || b === null || c === null || a === 0) return null;
    return quadraticPlot(a, b, c);
  }
  if (d.id === "kwadratowa-z-kanonicznej" || d.id === "wierzcholek-p-q") {
    const a = numInput("a");
    const p = numInput("p");
    const third = numInput(d.id === "kwadratowa-z-kanonicznej" ? "q" : "b");
    if (a === null || p === null || third === null || a === 0) return null;
    return quadraticPlot(a, -2 * a * p, a * p * p + third);
  }
  if (d.id === "kwadratowa-z-iloczynowej" || d.id === "kwadratowa-ogolna") {
    const a = numInput("a");
    const x1 = numInput("x1");
    const x2 = numInput("x2");
    if (a === null || x1 === null || x2 === null || a === 0) return null;
    return quadraticPlot(a, -a * (x1 + x2), a * x1 * x2);
  }
  if (d.id === "kwadratowa-z-wierzcholka-i-punktu") {
    const p = numInput("p");
    const q = numInput("q");
    const xA = numInput("xA");
    const yA = numInput("yA");
    if (p === null || q === null || xA === null || yA === null) return null;
    if (xA === p || yA === q) return null;
    const a = (yA - q) / ((xA - p) * (xA - p));
    return quadraticPlot(a, -2 * a * p, a * p * p + q);
  }
  if (d.id === "minmax-kwadratowej-przedzial") {
    const a = numInput("a");
    const b = numInput("b");
    const c = numInput("c");
    const alfa = numInput("alfa");
    const beta = numInput("beta");
    if (a === null || b === null || c === null || a === 0) return null;
    if (alfa === null || beta === null || alfa > beta) return null;
    const base = quadraticPlot(a, b, c);
    return base ? { ...base, shade: [{ from: alfa, to: beta }] } : null;
  }
  if (d.id === "funkcja-liniowa" || d.id === "monotonicznosc-liniowej") {
    const a = numInput("a");
    const b = numInput("b");
    if (a === null || b === null) return null;
    return linearPlot(a, b);
  }
  if (d.id === "prosta-przeksztalcenia") {
    const A = numInput("A");
    const B = numInput("B");
    const C = numInput("C");
    if (A === null || B === null || C === null) return null;
    if (B !== 0) return linearPlot(-A / B, -C / B);
    if (A !== 0) {
      const x = -C / A;
      return { fn: () => NaN, points: [], xMin: x - 5, xMax: x + 5, asymptotes: [x] };
    }
    return null;
  }
  if (d.id === "prosta-2-punkty") {
    const x1 = numInput("x1");
    const y1 = numInput("y1");
    const x2 = numInput("x2");
    const y2 = numInput("y2");
    if ([x1, y1, x2, y2].some((v) => v === null)) return null;
    if (x1 === x2) return null;
    const a = (y2! - y1!) / (x2! - x1!);
    return linearPlot(a, y1! - a * x1!);
  }
  if (d.id === "uklad-rownan") {
    const vals = ["a1", "b1", "c1", "a2", "b2", "c2"].map(numInput);
    if (vals.some((v) => v === null)) return null;
    return ukladPlot(vals[0]!, vals[1]!, vals[2]!, vals[3]!, vals[4]!, vals[5]!);
  }
  if (d.id === "rownanie-stycznej") {
    const a = numInput("a");
    const b = numInput("b");
    const c = numInput("c");
    const x0 = numInput("x0");
    if ([a, b, c, x0].some((v) => v === null) || a === 0) return null;
    return parabolaStycznaPlot(a!, b!, c!, x0!);
  }
  if (d.id === "monotonicznosc-ekstrema-wielomianu") {
    const coefs = ["a", "b", "c", "d"].map(numInput);
    if (coefs.some((v) => v === null) || coefs[0] === 0) return null;
    return polyPlot(coefs as number[], rationalRootsOf(coefs as number[]));
  }
  if (d.id === "wartosc-bezwzgledna") {
    const a = numInput("a");
    const w = numInput("w");
    if (a === null || w === null) return null;
    return absPlot(a, w);
  }
  if (d.id === "nierownosc-bezwzgledna") {
    const a = numInput("a");
    const r = numInput("r");
    if (a === null || r === null || r < 0) return null;
    const base = absPlot(a, r);
    if (!base) return null;
    const op = (inputs.op ?? "<") as InequalityOp;
    const bands =
      op === "<" || op === "≤"
        ? [{ from: a - r, to: a + r }]
        : [
            { from: Number.NEGATIVE_INFINITY, to: a - r },
            { from: a + r, to: Number.POSITIVE_INFINITY },
          ];
    return { ...base, shade: bands };
  }
  if (d.id === "pochodna-ilorazu-iloczynu") {
    const a = numInput("a");
    const b = numInput("b");
    const c = numInput("c");
    const dd = numInput("d");
    if ([a, b, c, dd].some((v) => v === null)) return null;
    if ((inputs.typ ?? "iloraz") === "iloczyn") {
      return quadraticPlot(a! * c!, a! * dd! + b! * c!, b! * dd!);
    }
    if (c === 0 && dd === 0) return null;
    return homograficznaPlot(a!, b!, c!, dd!);
  }
  if (d.id === "dziedzina-ulamka-wymiernego") {
    if ((inputs.deg ?? "1") === "1") {
      const q1 = numInput("q1");
      const q0 = numInput("q0");
      if (q1 === null || q0 === null || (q1 === 0 && q0 === 0)) return null;
      return homograficznaPlot(0, 1, q1, q0);
    }
    const q2 = numInput("q2");
    const q1 = numInput("q1");
    const q0 = numInput("q0");
    if (q2 === null || q1 === null || q0 === null) return null;
    return quadraticReciprocalPlot(q2, q1, q0);
  }
  if (d.id === "rozklad-wielomianu" || d.id === "horner-pierwiastki") {
    const ids =
      d.id === "rozklad-wielomianu"
        ? ["a6", "a5", "a4", "a3", "a2", "a1", "a0"]
        : ["a", "b", "c", "d"];
    const raw = ids.map(numInput);
    if (raw.some((v) => v === null)) return null;
    let coeffs = raw as number[];
    while (coeffs.length > 2 && coeffs[0] === 0) coeffs = coeffs.slice(1);
    const st = view.value;
    if (st.state !== "done") return null;
    const roots = st.raw.map((v) => approx(v));
    return polyPlot(coeffs, roots);
  }
  if (d.id === "rzut-poziomy") {
    const v0 = numInput("v0");
    const h = numInput("h");
    if (v0 === null || h === null) return null;
    return trajectoryPlot(v0, h);
  }
  if (d.id === "nierownosc-kwadratowa") {
    const a = numInput("a");
    const b = numInput("b");
    const c = numInput("c");
    if (a === null || b === null || c === null) return null;
    const base = quadraticPlot(a, b, c);
    if (!base) return null;
    try {
      const qa = parseExact((inputs.a ?? "").trim());
      const qb = parseExact((inputs.b ?? "").trim());
      const qc = parseExact((inputs.c ?? "").trim());
      if (qa.irr || qb.irr || qc.irr) return base;
      const q = solveQuadratic(qa.rat, qb.rat, qc.rat);
      const qroots = q.roots.map((r) => approx(r));
      const op = (inputs.op ?? ">") as InequalityOp;
      const bands = inequalityBands(a, op, qroots);
      return bands && bands.length > 0 ? { ...base, shade: bands } : base;
    } catch {
      return base;
    }
  }
  return null;
});

let saveTimer: number | undefined;

watch(view, (v) => {
  window.clearTimeout(saveTimer);
  const d = def.value;
  if (v.state !== "done" || !hasAnyInput.value || !d) return;
  const snapshot = { ...inputs };
  const result = v.values.map((r) => r.tex).join("; ");
  saveTimer = window.setTimeout(() => {
    void addHistory({
      subject: d.subject,
      formulaId: d.id,
      formulaName: d.name,
      inputs: snapshot,
      result,
    }).catch(() => {});
  }, 1500);
});

onUnmounted(() => window.clearTimeout(saveTimer));
</script>

<template>
  <section v-if="def">
    <p class="topic">{{ subjectLabel }} · {{ def.topic }}</p>
    <h2>{{ def.name }}</h2>
    <button
      class="fav"
      :aria-pressed="isFav"
      @click="toggleFav"
      :title="isFav ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'"
    >
      {{ isFav ? "★" : "☆" }} Ulubione
    </button>
    <p class="formula"><Formula :source="def.latex" /></p>
    <details v-if="description" class="about">
      <summary>Do czego ten wzór</summary>
      <p>{{ description }}</p>
    </details>

    <nav v-if="related.simpler.length > 0" class="rel" aria-label="Prostsze i składowe wzory">
      <h3 class="rel__title">↑ Prostsze / składowe wzory</h3>
      <router-link
        v-for="f in related.simpler"
        :key="f.id"
        class="rel__chip"
        :to="{
          name: 'solver',
          params: { subject: f.subject, formula: f.id },
          query: linkQuery(f),
        }"
      >
        <span class="rel__name">{{ f.name }}</span>
        <span class="rel__tex"><Formula :source="f.latex" /></span>
      </router-link>
    </nav>

    <div class="solver">
      <div class="quick">
        <input
          v-model="quick"
          class="quick__input"
          data-keybar="equation"
          inputmode="text"
          enterkeyhint="go"
          placeholder="Wklej całe równanie, np. 4x^2-2x+10=0"
          aria-label="Wklej całe równanie, żeby uzupełnić pola"
          @keyup.enter="applyQuick"
        />
        <button class="quick__go" @click="applyQuick">Wypełnij</button>
      </div>
      <p v-if="quickError" class="error" role="alert">{{ quickError }}</p>
      <p v-if="quickSuggest" class="suggest" role="status">
        To pasuje do wzoru „{{ quickSuggest.name }}”.
        <router-link
          :to="{
            name: 'solver',
            params: { subject: quickSuggest.subject, formula: quickSuggest.id },
            query: { fill: quickSuggest.fill },
          }"
          >Przejdź tam →</router-link
        >
      </p>
      <div class="solver__inputs">
        <label v-for="v in visibleVars" :key="v.id">
          {{ v.label }}<span v-if="v.unit" class="unit"> [{{ v.unit }}]</span>
          <select v-if="v.kind === 'select'" v-model="inputs[v.id]" :aria-label="v.label">
            <option v-for="o in v.options ?? []" :key="o" :value="o">{{ o }}</option>
          </select>
          <input
            v-else
            v-model="inputs[v.id]"
            inputmode="text"
            autocomplete="off"
            autocorrect="off"
            spellcheck="false"
          />
        </label>
        <label>
          miejsca
          <input type="number" v-model.number="places" min="0" max="12" />
        </label>
      </div>
      <p class="hint" v-if="def.mode === 'nvar'">
        Zostaw jedno pole puste — to będzie niewiadoma. Wpisz π, √3, ułamek 1/3 albo 2π/3.
      </p>

      <div v-if="view.state === 'idle'">
        <p v-if="view.hint" class="hint">Uzupełnij dane powyżej, a kroki pojawią się same.</p>
        <p v-else class="error" role="alert">{{ view.error }}</p>
      </div>

      <ol v-if="view.state === 'done'" class="steps">
        <li v-for="s in view.steps" :key="s.title">
          <p class="steps__title">{{ s.title }}</p>
          <p class="steps__body"><Formula :source="s.body" /></p>
          <p v-if="s.note" class="steps__note">{{ s.note }}</p>
        </li>
      </ol>

      <div v-if="view.state === 'done'" class="results" aria-live="polite">
        <p v-for="(r, i) in view.values" :key="i" class="results__row">
          {{ r.label }} =
          <span class="result-value"><Formula :source="r.tex" /></span>
          <span v-if="!r.approx" class="badge">do zapisu</span>
          <span v-if="r.tex !== r.dec" class="approx">≈ {{ r.dec }}</span>
        </p>
      </div>

      <FormulaDiagram
        v-if="view.state === 'done' && diagramNums"
        :formula-id="def.id"
        :nums="diagramNums"
        :highlight="view.unknownId"
        :caption="diagramCaption"
      />

      <FunctionPlot v-if="plotData" :data="plotData" />
    </div>

    <nav v-if="related.harder.length > 0" class="rel" aria-label="Wykorzystaj dalej">
      <h3 class="rel__title">↓ Wykorzystaj dalej</h3>
      <router-link
        v-for="f in related.harder"
        :key="f.id"
        class="rel__chip"
        :to="{
          name: 'solver',
          params: { subject: f.subject, formula: f.id },
          query: linkQuery(f),
        }"
      >
        <span class="rel__name">{{ f.name }}</span>
        <span class="rel__tex"><Formula :source="f.latex" /></span>
      </router-link>
    </nav>

    <p class="back">
      <router-link :to="{ name: 'wzornik', params: { subject: def.subject } }"
        >← wszystkie wzory</router-link
      >
    </p>
  </section>

  <section v-else>
    <h2>Nie ma takiego kalkulatora</h2>
    <p><router-link :to="{ name: 'wzornik' }">Wróć do wzornika</router-link></p>
  </section>

  <MathKeyBar fallback="numeric" />
</template>

<style scoped>
.topic {
  color: var(--color-ink-soft);
  font-size: 0.875rem;
  margin: 0 0 0.25rem;
}

.fav {
  font-family: var(--font-body);
  font-size: 0.875rem;
  padding: 0.3rem 0.7rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
  cursor: pointer;
  margin-bottom: 1rem;
}

.fav[aria-pressed="true"] {
  color: var(--color-accent);
  border-color: var(--color-accent);
}

.formula {
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 0.75rem 1rem;
  max-width: var(--content-max);
  font-size: 1.125rem;
}

.about {
  max-width: var(--content-max);
  margin-top: 0.75rem;
  font-size: 0.9375rem;
  color: var(--color-ink-soft);
}

.about summary {
  cursor: pointer;
  min-height: 44px;
  display: inline-flex;
  align-items: center;
}

.about p {
  margin: 0.25rem 0 0;
}

.solver {
  margin-top: 1.5rem;
  max-width: var(--content-max);
}

.rel {
  margin-top: 1.25rem;
  max-width: var(--content-max);
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.rel__title {
  width: 100%;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-ink-soft);
  margin: 0 0 0.25rem;
}

.rel__chip {
  display: inline-flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.45rem 0.7rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  text-decoration: none;
  min-height: 44px;
  justify-content: center;
}

.rel__chip:hover {
  border-color: var(--color-accent);
}

.rel__name {
  font-family: var(--font-body);
  font-size: 0.8125rem;
  color: var(--color-ink);
}

.rel__tex {
  font-size: 0.75rem;
  color: var(--color-ink-soft);
}

.quick {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.quick__input {
  flex: 1;
  min-width: 0;
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.quick__go {
  flex-shrink: 0;
  min-height: 44px;
  padding: 0.35rem 1rem;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  border: 1px solid var(--color-accent);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-accent);
  cursor: pointer;
}

.solver__inputs {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem 1.5rem;
  margin-bottom: 0.5rem;
}

.solver__inputs label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-family: var(--font-mono);
  font-size: 0.9375rem;
}

.solver__inputs input {
  width: 6rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.solver__inputs select {
  font-family: var(--font-mono);
  font-size: 1rem;
  padding: 0.35rem 0.5rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: var(--color-paper-raised);
  color: var(--color-ink);
}

.unit {
  color: var(--color-ink-soft);
}

.hint {
  color: var(--color-ink-soft);
  font-size: 0.875rem;
}

.suggest {
  font-size: 0.9375rem;
  color: var(--color-ink);
}

.error {
  color: var(--color-accent);
  font-size: 0.9375rem;
}

.steps {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1.25rem 1.5rem;
}

.steps li + li {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px dashed var(--color-line);
}

.steps__title {
  margin: 0 0 0.25rem;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--color-ink-soft);
}

.steps__body {
  margin: 0;
  font-size: 1.0625rem;
}

.steps__note {
  margin: 0.25rem 0 0;
  font-size: 0.875rem;
  color: var(--color-ink-soft);
}

.results__row {
  font-family: var(--font-mono);
}

.result-value {
  color: var(--color-accent);
  font-weight: 500;
  font-size: 1.0625rem;
}

.badge {
  display: inline-block;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--color-accent);
  border: 1px solid var(--color-accent);
  border-radius: var(--radius);
  padding: 0.05rem 0.35rem;
  margin-left: 0.5rem;
  vertical-align: middle;
}

.approx {
  color: var(--color-ink-soft);
  margin-left: 0.5rem;
}

.back {
  margin-top: 2rem;
  font-size: 0.9375rem;
}
</style>
