<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { niceStep, sampleY } from '../lib/plots/plot'
import type { PlotData } from '../lib/plots/plot'

const props = defineProps<{ data: PlotData }>()

const canvas = ref<HTMLCanvasElement | null>(null)
let observer: ResizeObserver | null = null

const INK = '#17211E'
const GRID = '#D9E0DC'
const ACC = '#B23B30'
const HEIGHT = 250

function draw(): void {
  const el = canvas.value
  if (!el) return
  const cssW = el.clientWidth || 600
  const dpr = window.devicePixelRatio || 1
  el.width = Math.round(cssW * dpr)
  el.height = Math.round(HEIGHT * dpr)
  const ctx = el.getContext('2d')
  if (!ctx) return
  ctx.scale(dpr, dpr)
  ctx.clearRect(0, 0, cssW, HEIGHT)

  const s = sampleY(props.data)
  const pad = 12
  const toPx = (x: number, y: number): [number, number] => [
    pad + ((x - s.xMin) / (s.xMax - s.xMin)) * (cssW - 2 * pad),
    HEIGHT - pad - ((y - s.yMin) / (s.yMax - s.yMin)) * (HEIGHT - 2 * pad),
  ]

  ctx.lineWidth = 1
  ctx.strokeStyle = GRID
  const xStep = niceStep(s.xMax - s.xMin)
  for (let gx = Math.ceil(s.xMin / xStep) * xStep; gx <= s.xMax; gx += xStep) {
    const [px] = toPx(gx, 0)
    ctx.beginPath()
    ctx.moveTo(px, pad)
    ctx.lineTo(px, HEIGHT - pad)
    ctx.stroke()
  }
  const yStep = niceStep(s.yMax - s.yMin)
  for (let gy = Math.ceil(s.yMin / yStep) * yStep; gy <= s.yMax; gy += yStep) {
    const [, py] = toPx(0, gy)
    ctx.beginPath()
    ctx.moveTo(pad, py)
    ctx.lineTo(cssW - pad, py)
    ctx.stroke()
  }

  if (s.yMin <= 0 && s.yMax >= 0) {
    const [, zy] = toPx(0, 0)
    ctx.lineWidth = 1.5
    ctx.strokeStyle = INK
    ctx.beginPath()
    ctx.moveTo(pad, zy)
    ctx.lineTo(cssW - pad, zy)
    ctx.stroke()
  }
  if (s.xMin <= 0 && s.xMax >= 0) {
    const [zx] = toPx(0, 0)
    ctx.beginPath()
    ctx.moveTo(zx, pad)
    ctx.lineTo(zx, HEIGHT - pad)
    ctx.stroke()
  }

  ctx.lineWidth = 2.5
  ctx.strokeStyle = ACC
  ctx.beginPath()
  let pen = false
  const n = Math.max(200, Math.round(cssW))
  for (let i = 0; i <= n; i++) {
    const x = s.xMin + ((s.xMax - s.xMin) * i) / n
    const y = s.fn(x)
    if (!Number.isFinite(y)) {
      pen = false
      continue
    }
    const [px, py] = toPx(x, y)
    if (!pen) {
      ctx.moveTo(px, py)
      pen = true
    } else {
      ctx.lineTo(px, py)
    }
  }
  ctx.stroke()

  ctx.font = '11px "IBM Plex Mono", monospace'
  for (const p of s.points) {
    const [px, py] = toPx(p.x, p.y)
    ctx.fillStyle = ACC
    ctx.beginPath()
    ctx.arc(px, py, 4, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = INK
    ctx.fillText(p.label, px + 8, py - 8)
  }
}

onMounted(() => {
  draw()
  observer = new ResizeObserver(() => draw())
  if (canvas.value) observer.observe(canvas.value)
})

onUnmounted(() => observer?.disconnect())

watch(() => props.data, draw)
</script>

<template>
  <figure class="plot">
    <canvas ref="canvas" class="plot__canvas"></canvas>
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

.plot__canvas {
  width: 100%;
  height: 250px;
  display: block;
}

.plot__cap {
  margin: 0.25rem 0 0;
  font-size: 0.8125rem;
  color: var(--color-ink-soft);
}
</style>
