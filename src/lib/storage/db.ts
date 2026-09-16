export interface HistoryEntry {
  id?: number
  ts: number
  subject: string
  formulaId: string
  formulaName: string
  inputs: Record<string, string>
  result: string
}

export interface FavoriteEntry {
  key: string
  ts: number
}

const DB_NAME = 'wzornik-maturalny'
const DB_VERSION = 1
export const HISTORY_LIMIT = 100

let dbPromise: Promise<IDBDatabase> | null = null

function openDb(): Promise<IDBDatabase> {
  if (!dbPromise) {
    dbPromise = new Promise((resolve, reject) => {
      const req = indexedDB.open(DB_NAME, DB_VERSION)
      req.onupgradeneeded = () => {
        const db = req.result
        if (!db.objectStoreNames.contains('history')) {
          db.createObjectStore('history', { keyPath: 'id', autoIncrement: true })
        }
        if (!db.objectStoreNames.contains('favorites')) {
          db.createObjectStore('favorites', { keyPath: 'key' })
        }
      }
      req.onsuccess = () => resolve(req.result)
      req.onerror = () => reject(req.error ?? new Error('storage: nie otworzyłem bazy'))
    })
  }
  return dbPromise
}

function tx<T>(store: string, mode: IDBTransactionMode, run: (s: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return openDb().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const req = run(db.transaction(store, mode).objectStore(store))
        req.onsuccess = () => resolve(req.result)
        req.onerror = () => reject(req.error ?? new Error('storage: błąd transakcji'))
      }),
  )
}

function getAll<T>(store: string): Promise<T[]> {
  return tx<T[]>(store, 'readonly', (s) => s.getAll())
}

export async function addHistory(entry: Omit<HistoryEntry, 'id' | 'ts'>): Promise<void> {
  await tx('history', 'readwrite', (s) => s.add({ ...entry, ts: Date.now() }))
  const all = await getAll<HistoryEntry>('history')
  if (all.length > HISTORY_LIMIT) {
    const excess = all
      .sort((a, b) => a.ts - b.ts || (a.id ?? 0) - (b.id ?? 0))
      .slice(0, all.length - HISTORY_LIMIT)
    await Promise.all(excess.map((e) => tx('history', 'readwrite', (s) => s.delete(e.id ?? -1))))
  }
}

export async function getHistory(limit = 30): Promise<HistoryEntry[]> {
  const all = await getAll<HistoryEntry>('history')
  return all.sort((a, b) => b.ts - a.ts || (b.id ?? 0) - (a.id ?? 0)).slice(0, limit)
}

export async function clearHistory(): Promise<void> {
  await tx<undefined>('history', 'readwrite', (s) => s.clear())
}

export async function toggleFavorite(key: string): Promise<boolean> {
  const existing = await tx<FavoriteEntry | undefined>('favorites', 'readonly', (s) => s.get(key))
  if (existing) {
    await tx('favorites', 'readwrite', (s) => s.delete(key))
    return false
  }
  await tx('favorites', 'readwrite', (s) => s.put({ key, ts: Date.now() }))
  return true
}

export async function isFavorite(key: string): Promise<boolean> {
  const existing = await tx<FavoriteEntry | undefined>('favorites', 'readonly', (s) => s.get(key))
  return existing !== undefined
}

export async function getFavorites(): Promise<FavoriteEntry[]> {
  const all = await getAll<FavoriteEntry>('favorites')
  return all.sort((a, b) => b.ts - a.ts)
}
