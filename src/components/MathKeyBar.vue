<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

const props = defineProps<{ fallback?: "numeric" | "equation" }>();

interface KeyDef {
  insert: string;
  label: string;
  back?: number;
}

const NUMERIC: KeyDef[] = [
  { insert: "-", label: "−" },
  { insert: "/", label: "/" },
  { insert: "π", label: "π" },
  { insert: "√", label: "√" },
  { insert: "√()", label: "√()", back: 1 },
  { insert: "²", label: "²" },
  { insert: "³", label: "³" },
  { insert: ";", label: ";" },
];

const EQUATION: KeyDef[] = [
  { insert: "x", label: "x" },
  { insert: "x²", label: "x²" },
  { insert: "x³", label: "x³" },
  { insert: "-", label: "−" },
  { insert: "+", label: "+" },
  { insert: "/", label: "/" },
  { insert: "(", label: "(" },
  { insert: ")", label: ")" },
  { insert: "=", label: "=" },
  { insert: "<", label: "<" },
  { insert: ">", label: ">" },
  { insert: "≤", label: "≤" },
  { insert: "≥", label: "≥" },
  { insert: "|x|", label: "|x|" },
  { insert: "π", label: "π" },
  { insert: "√", label: "√" },
  { insert: ";", label: ";" },
];

const visible = ref(false);
const mode = ref<"numeric" | "equation">(props.fallback ?? "numeric");
const keys = computed(() => (mode.value === "equation" ? EQUATION : NUMERIC));

type Field = HTMLInputElement | HTMLTextAreaElement;
let active: Field | null = null;

function onFocusIn(e: FocusEvent): void {
  const t = e.target;
  if (!(t instanceof HTMLInputElement) && !(t instanceof HTMLTextAreaElement)) return;
  if (["number", "checkbox", "radio", "range", "color"].includes(t.type)) return;
  active = t;
  mode.value =
    (t as HTMLElement).dataset.keybar === "equation" ? "equation" : (props.fallback ?? "numeric");
  visible.value = true;
}

function onFocusOut(e: FocusEvent): void {
  if (e.target === active) {
    active = null;
    visible.value = false;
  }
}

function sync(el: Field): void {
  el.dispatchEvent(new Event("input", { bubbles: true }));
}

function insert(key: KeyDef): void {
  const el = active;
  if (!el) return;
  const s = el.selectionStart ?? el.value.length;
  const e = el.selectionEnd ?? s;
  el.value = el.value.slice(0, s) + key.insert + el.value.slice(e);
  const pos = s + key.insert.length - (key.back ?? 0);
  el.focus();
  el.setSelectionRange(pos, pos);
  sync(el);
}

function backspace(): void {
  const el = active;
  if (!el) return;
  const s = el.selectionStart ?? el.value.length;
  const e = el.selectionEnd ?? s;
  if (s === e && s > 0) {
    el.value = el.value.slice(0, s - 1) + el.value.slice(e);
    el.focus();
    el.setSelectionRange(s - 1, s - 1);
  } else {
    el.value = el.value.slice(0, s) + el.value.slice(e);
    el.focus();
    el.setSelectionRange(s, s);
  }
  sync(el);
}

onMounted(() => {
  document.addEventListener("focusin", onFocusIn);
  document.addEventListener("focusout", onFocusOut);
});

onUnmounted(() => {
  document.removeEventListener("focusin", onFocusIn);
  document.removeEventListener("focusout", onFocusOut);
});
</script>

<template>
  <Transition name="keybar">
    <div v-if="visible" class="keybar" role="toolbar" aria-label="Pasek symboli matematycznych">
      <button
        v-for="k in keys"
        :key="k.label"
        type="button"
        class="keybar__key"
        :aria-label="`Wstaw ${k.label}`"
        @pointerdown.prevent
        @click="insert(k)"
      >
        {{ k.label }}
      </button>
      <button
        type="button"
        class="keybar__key keybar__key--wide"
        aria-label="Usuń ostatni znak"
        @pointerdown.prevent
        @click="backspace"
      >
        ⌫
      </button>
    </div>
  </Transition>
</template>

<style scoped>
.keybar {
  position: fixed;
  left: 0;
  right: 0;
  bottom: calc(66px + env(safe-area-inset-bottom));
  z-index: 60;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  gap: 0.3rem;
  padding: 0.35rem 0.5rem;
  background: var(--color-paper-raised);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-top: 1px solid var(--color-line);
  max-width: 100vw;
}

.keybar__key {
  flex-shrink: 0;
  min-width: 2.6rem;
  min-height: 40px;
  padding: 0 0.55rem;
  font-family: var(--font-mono);
  font-size: 1rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius-sm, var(--radius));
  background: var(--color-paper);
  color: var(--color-ink);
  cursor: pointer;
}

.keybar__key--wide {
  margin-left: auto;
  min-width: 3.2rem;
}

.keybar-enter-active,
.keybar-leave-active {
  transition:
    transform 0.15s ease,
    opacity 0.15s ease;
}

.keybar-enter-from,
.keybar-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>
