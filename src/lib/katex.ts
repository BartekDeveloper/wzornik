import katex from "katex";

export function renderLatex(source: string, display = false): string {
  try {
    return katex.renderToString(source, { throwOnError: true, displayMode: display });
  } catch {
    return `<code class="latex-fallback">${escapeHtml(source)}</code>`;
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
