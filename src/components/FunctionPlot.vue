<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from "vue";
import { initialView, niceStep, panView, zoomView } from "../lib/plots/plot";
import type { PlotData, ViewBounds, ViewState } from "../lib/plots/plot";
import { trimNum } from "../lib/exact/format";

const props = defineProps<{ data: PlotData }>();

const canvas = ref<HTMLCanvasElement | null>(null);
let observer: ResizeObserver | null = null;

const HEIGHT = 250;
const view = ref<ViewState | null>(null);
const bounds = ref<ViewBounds | null>(null);

function resetView(): void {
  const iv = initialView(props.data);
  view.value = iv.view;
  bounds.value = iv.bounds;
  draw();
}

function zoom(factor: number): void {
  if (!view.value || !bounds.value) return;
  view.value = zoomView(view.value, bounds.value, factor);
  draw();
}

function cssVar(name: string, fallback: string): string {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v === "" ? fallback : v;
}

function draw(): void {
  const el = canvas.value;
  if (!el) return;
  if (!view.value || !bounds.value) resetViewSilent();
  const v = view.value;
  const b = bounds.value;
  if (!v || !b) return;
  const cssW = el.clientWidth || 600;
  const dpr = window.devicePixelRatio || 1;
  el.width = Math.round(cssW * dpr);
  el.height = Math.round(HEIGHT * dpr);
  const ctx = el.getContext("2d");
  if (!ctx) return;
  ctx.scale(dpr, dpr);
  ctx.clearRect(0, 0, cssW, HEIGHT);

  const INK = cssVar("--color-ink", "#EBF1EA");
  const GRID = cssVar("--color-grid", "#1E2621");
  const ACC = cssVar("--color-accent", "#E0685A");
  const SOFT = cssVar("--color-ink-soft", "#8A938B");
  const pad = 30;
  const x0 = v.cx - v.halfW;
  const x1 = v.cx + v.halfW;
  const y0 = v.cy - v.halfH;
  const y1 = v.cy + v.halfH;
  const toPx = (x: number, y: number): [number, number] => [
    pad + ((x - x0) / (x1 - x0)) * (cssW - pad - 8),
    HEIGHT - pad - ((y - y0) / (y1 - y0)) * (HEIGHT - pad - 8),
  ];

  const gridLines = (min: number, max: number, step: number): number[] => {
    const out: number[] = [];
    for (let g = Math.ceil(min / step) * step; g <= max + step * 1e-9; g += step) {
      out.push(Math.abs(g) < step * 1e-9 ? 0 : g);
    }
    return out;
  };

  ctx.lineWidth = 1;
  const xStep = niceStep(x1 - x0);
  ctx.strokeStyle = GRID;
  ctx.globalAlpha = 0.45;
  for (const gx of gridLines(x0, x1, xStep / 5)) {
    const [px] = toPx(gx, 0);
    ctx.beginPath();
    ctx.moveTo(px, 8);
    ctx.lineTo(px, HEIGHT - pad);
    ctx.stroke();
  }
  const yStep = niceStep(y1 - y0);
  for (const gy of gridLines(y0, y1, yStep / 5)) {
    const [, py] = toPx(0, gy);
    ctx.beginPath();
    ctx.moveTo(pad, py);
    ctx.lineTo(cssW - 8, py);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.strokeStyle = GRID;
  ctx.lineWidth = 1;
  ctx.fillStyle = SOFT;
  ctx.font = '10px "IBM Plex Mono", monospace';
  for (const gx of gridLines(x0, x1, xStep)) {
    const [px] = toPx(gx, 0);
    ctx.beginPath();
    ctx.moveTo(px, 8);
    ctx.lineTo(px, HEIGHT - pad);
    ctx.stroke();
    ctx.fillText(trimNum(gx), px - 8, HEIGHT - pad + 14);
  }
  for (const gy of gridLines(y0, y1, yStep)) {
    const [, py] = toPx(0, gy);
    ctx.beginPath();
    ctx.moveTo(pad, py);
    ctx.lineTo(cssW - 8, py);
    ctx.stroke();
    ctx.fillText(trimNum(gy), 4, py + 3);
  }

  if (y0 <= 0 && y1 >= 0) {
    const [, zy] = toPx(0, 0);
    ctx.lineWidth = 1.5;
    ctx.strokeStyle = INK;
    ctx.beginPath();
    ctx.moveTo(pad, zy);
    ctx.lineTo(cssW - 8, zy);
    ctx.stroke();
  }
  if (x0 <= 0 && x1 >= 0) {
    const [zx] = toPx(0, 0);
    ctx.beginPath();
    ctx.moveTo(zx, 8);
    ctx.lineTo(zx, HEIGHT - pad);
    ctx.stroke();
  }

  if (props.data.shade) {
    ctx.fillStyle = ACC;
    ctx.globalAlpha = 0.15;
    for (const band of props.data.shade) {
      const bx0 = Math.max(band.from, x0);
      const bx1 = Math.min(band.to, x1);
      if (!(bx1 > bx0)) continue;
      const [px0] = toPx(bx0, 0);
      const [px1] = toPx(bx1, 0);
      ctx.fillRect(px0, 8, px1 - px0, HEIGHT - pad - 8);
    }
    ctx.globalAlpha = 1;
  }

  ctx.lineWidth = 2.5;
  ctx.strokeStyle = ACC;
  ctx.beginPath();
  let pen = false;
  const n = Math.max(200, Math.round(cssW));
  for (let i = 0; i <= n; i++) {
    const x = x0 + ((x1 - x0) * i) / n;
    const y = props.data.fn(x);
    if (!Number.isFinite(y)) {
      pen = false;
      continue;
    }
    const [px, py] = toPx(x, y);
    if (!pen) {
      ctx.moveTo(px, py);
      pen = true;
    } else {
      ctx.lineTo(px, py);
    }
  }
  ctx.stroke();

  ctx.font = '11px "IBM Plex Mono", monospace';
  for (const p of props.data.points) {
    if (p.x < x0 || p.x > x1 || p.y < y0 || p.y > y1) continue;
    const [px, py] = toPx(p.x, p.y);
    ctx.fillStyle = ACC;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = INK;
    ctx.fillText(p.label, px + 8, py - 8);
  }
}

function resetViewSilent(): void {
  const iv = initialView(props.data);
  view.value = iv.view;
  bounds.value = iv.bounds;
}

let drag: { x: number; y: number } | null = null;

function onDown(e: PointerEvent): void {
  drag = { x: e.clientX, y: e.clientY };
  (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
}

function onMove(e: PointerEvent): void {
  if (!drag || !view.value || !bounds.value || !canvas.value) return;
  const cssW = canvas.value.clientWidth || 600;
  const dx = ((drag.x - e.clientX) / (cssW - 38)) * view.value.halfW * 2;
  const dy = ((e.clientY - drag.y) / (HEIGHT - 38)) * view.value.halfH * 2;
  drag = { x: e.clientX, y: e.clientY };
  view.value = panView(view.value, bounds.value, dx, dy);
  draw();
}

function onUp(): void {
  drag = null;
}

onMounted(() => {
  resetViewSilent();
  draw();
  observer = new ResizeObserver(() => draw());
  if (canvas.value) observer.observe(canvas.value);
});

onUnmounted(() => observer?.disconnect());

watch(
  () => props.data,
  () => resetView(),
);
</script>

<template>
  <figure class="plot">
    <div class="plot__tools" role="group" aria-label="Sterowanie wykresem">
      <button class="plot__btn" @click="zoom(0.8)" aria-label="Przybliż wykres">+</button>
      <button class="plot__btn" @click="zoom(1.25)" aria-label="Oddal wykres">−</button>
      <button class="plot__btn plot__btn--wide" @click="resetView()">Reset</button>
    </div>
    <canvas
      ref="canvas"
      class="plot__canvas"
      role="img"
      aria-label="Wykres funkcji. Punkty kluczowe wymienione poniżej wykresu."
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointercancel="onUp"
    ></canvas>
    <ul class="sr-only">
      <li v-for="p in data.points" :key="p.label">{{ p.label }}</li>
    </ul>
    <figcaption class="plot__cap">Wykres funkcji z zaznaczonymi punktami</figcaption>
  </figure>
</template>

<style scoped>
.plot {
  margin: 1.5rem 0 0;
  background: var(--color-paper-raised);
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  padding: 1rem 1rem 0.75rem;
  max-width: var(--content-max);
}

.plot__tools {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.plot__btn {
  min-width: 44px;
  min-height: 44px;
  font-size: 1.125rem;
  border: 1px solid var(--color-line);
  border-radius: var(--radius);
  background: transparent;
  color: var(--color-ink);
  cursor: pointer;
}

.plot__btn--wide {
  font-size: 0.875rem;
  padding: 0 1rem;
}

.plot__canvas {
  width: 100%;
  height: 250px;
  display: block;
  touch-action: none;
  cursor: grab;
}

.plot__cap {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}
</style>
