export type Theme = "dark" | "light";

export interface Settings {
  theme: Theme;
  places: number;
}

export const DEFAULT_SETTINGS: Settings = { theme: "dark", places: 2 };
const KEY = "wm:settings";

export interface KeyStorage {
  getItem(k: string): string | null;
  setItem(k: string, v: string): void;
}

function memoryStorage(): KeyStorage {
  const m = new Map<string, string>();
  return {
    getItem: (k) => m.get(k) ?? null,
    setItem: (k, v) => {
      m.set(k, v);
    },
  };
}

function webStorage(): KeyStorage {
  try {
    if (typeof localStorage !== "undefined") return localStorage;
  } catch {
    /* private mode etc. */
  }
  return memoryStorage();
}

export function loadSettings(storage: KeyStorage = webStorage()): Settings {
  try {
    const raw = storage.getItem(KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const p = JSON.parse(raw) as Partial<Settings>;
    return {
      theme: p.theme === "light" ? "light" : "dark",
      places:
        typeof p.places === "number" && p.places >= 0 && p.places <= 12 ? Math.floor(p.places) : 2,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(s: Settings, storage: KeyStorage = webStorage()): void {
  try {
    storage.setItem(KEY, JSON.stringify(s));
  } catch {
    /* non-critical */
  }
}

export function themeMetaColor(theme: Theme): string {
  return theme === "dark" ? "#0D1117" : "#F6F8FA";
}

export function applyTheme(theme: Theme): void {
  document.documentElement.dataset.theme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeMetaColor(theme));
}
