import katex from "katex";

const cache = new Map<string, string>();

export function renderLatex(source: string, display = false): string {
  const key = `${display ? "d" : "i"}:${source}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  let out: string;
  try {
    out = katex.renderToString(source, { throwOnError: true, displayMode: display });
  } catch {
    out = `<code class="latex-fallback">${escapeHtml(source)}</code>`;
  }
  cache.set(key, out);
  return out;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
