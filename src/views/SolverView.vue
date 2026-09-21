<script setup lang="ts">
import { computed, onUnmounted, reactive, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getFormula, SUBJECTS } from "../lib/formulas/index";
import { solveFormula } from "../lib/solver/solver";
import { parseEquation } from "../lib/parse-formula";
import { formatDecimal, formatLatex, trimNum } from "../lib/exact/format";
import { approx, isApproxOnly, parseExact } from "../lib/exact/exact";
import { linearPlot, quadraticPlot } from "../lib/plots/plot";
import { addHistory, isFavorite, toggleFavorite } from "../lib/storage/db";
import { loadSettings } from "../lib/settings";
import { getDescription } from "../lib/descriptions";
import Formula from "../components/Formula.vue";
import FormulaDiagram from "../components/FormulaDiagram.vue";
import FunctionPlot from "../components/FunctionPlot.vue";

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
const isFav = ref(false);
const quick = ref("");
const quickError = ref("");
const route = useRoute();
const router = useRouter();

function applyFill(raw: string): boolean {
  const parsed = parseEquation(raw);
  if (!parsed || !def.value) return false;
  if (parsed.id !== def.value.id) {
    void router.push({
      name: "solver",
      params: { subject: parsed.subject, formula: parsed.id },
      query: { fill: raw },
    });
    return true;
  }
  for (const v of def.value.vars) {
    if (v.kind === "select") continue;
    const val = parsed.values[v.id];
    if (val !== undefined) inputs[v.id] = val;
  }
  return true;
}

function applyQuick(): void {
  quickError.value = "";
  if (quick.value.trim() === "") return;
  if (!applyFill(quick.value.trim())) {
    quickError.value = "Nie rozpoznano równania — spróbuj np. 4x^2-2x+10=0";
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
    steps: r.steps,
    first: r.values[0],
  };
});

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
  if (d.id === "funkcja-liniowa") {
    const a = numInput("a");
    const b = numInput("b");
    if (a === null || b === null) return null;
    return linearPlot(a, b);
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

    <div class="solver">
      <div class="quick">
        <input
          v-model="quick"
          class="quick__input"
          inputmode="text"
          enterkeyhint="go"
          placeholder="Wklej całe równanie, np. 4x^2-2x+10=0"
          aria-label="Wklej całe równanie, żeby uzupełnić pola"
          @keyup.enter="applyQuick"
        />
        <button class="quick__go" @click="applyQuick">Wypełnij</button>
      </div>
      <p v-if="quickError" class="error" role="alert">{{ quickError }}</p>
      <div class="solver__inputs">
        <label v-for="v in def.vars" :key="v.id">
          {{ v.label }}<span v-if="v.unit" class="unit"> [{{ v.unit }}]</span>
          <select v-if="v.kind === 'select'" v-model="inputs[v.id]" :aria-label="v.label">
            <option v-for="o in v.options ?? []" :key="o" :value="o">{{ o }}</option>
          </select>
          <input v-else v-model="inputs[v.id]" inputmode="decimal" />
        </label>
        <label>
          miejsca
          <input type="number" v-model.number="places" min="0" max="12" />
        </label>
      </div>
      <p class="hint" v-if="def.mode === 'nvar'">
        Zostaw jedno pole puste — to będzie niewiadoma. Możesz wpisać π, np. 25π.
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
