import { norm } from "./search";

interface TrieNode {
  ids: Set<string>;
  next: Map<string, TrieNode>;
}

interface BKNode {
  token: string;
  kids: Map<number, BKNode>;
}

export interface FuzzyIndex {
  trie: TrieNode;
  bk: BKNode | null;
  tokenOwners: Map<string, Set<string>>;
}

export function levenshtein(a: string, b: string): number {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let cur0 = i;
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      const v = Math.min(prev[j]! + 1, cur0 + 1, prev[j - 1]! + cost);
      prev[j - 1] = cur0;
      cur0 = v;
    }
    prev[b.length] = cur0;
  }
  return prev[b.length]!;
}

function trieInsert(root: TrieNode, token: string, id: string): void {
  let node = root;
  for (const ch of token) {
    let kid = node.next.get(ch);
    if (!kid) {
      kid = { ids: new Set(), next: new Map() };
      node.next.set(ch, kid);
    }
    node = kid;
    node.ids.add(id);
  }
}

function trieLookup(root: TrieNode, prefix: string): Set<string> {
  let node = root;
  for (const ch of prefix) {
    const kid = node.next.get(ch);
    if (!kid) return new Set();
    node = kid;
  }
  return node.ids;
}

function bkInsert(root: BKNode | null, token: string): BKNode {
  if (!root) return { token, kids: new Map() };
  let node = root;
  for (;;) {
    const d = levenshtein(token, node.token);
    if (d === 0) return root;
    const kid = node.kids.get(d);
    if (!kid) {
      node.kids.set(d, { token, kids: new Map() });
      return root;
    }
    node = kid;
  }
}

function bkQuery(
  root: BKNode | null,
  token: string,
  maxDist: number,
  out: Map<string, number>,
): void {
  if (!root) return;
  const stack: BKNode[] = [root];
  while (stack.length > 0) {
    const node = stack.pop()!;
    const d = levenshtein(token, node.token);
    if (d <= maxDist && d > 0) {
      const prev = out.get(node.token) ?? Infinity;
      if (d < prev) out.set(node.token, d);
    }
    for (const [kd, kid] of node.kids) {
      if (kd >= d - maxDist && kd <= d + maxDist) stack.push(kid);
    }
  }
}

export function tokenize(text: string): string[] {
  return norm(text)
    .split(/[^a-z0-9]+/g)
    .filter((t) => t.length >= 2);
}

export function buildFuzzyIndex(items: { id: string; text: string }[]): FuzzyIndex {
  const trie: TrieNode = { ids: new Set(), next: new Map() };
  let bk: BKNode | null = null;
  const tokenOwners = new Map<string, Set<string>>();
  for (const { id, text } of items) {
    const seen = new Set<string>();
    for (const t of tokenize(text)) {
      let owners = tokenOwners.get(t);
      if (!owners) {
        owners = new Set();
        tokenOwners.set(t, owners);
      }
      owners.add(id);
      if (seen.has(t)) continue;
      seen.add(t);
      trieInsert(trie, t, id);
      bk = bkInsert(bk, t);
    }
  }
  return { trie, bk, tokenOwners };
}

export function fuzzyScore(idx: FuzzyIndex, query: string): Map<string, number> {
  const out = new Map<string, number>();
  const add = (id: string, w: number) => out.set(id, (out.get(id) ?? 0) + w);
  for (const qt of tokenize(query)) {
    for (const id of trieLookup(idx.trie, qt)) add(id, 1.5);
    const near = new Map<string, number>();
    bkQuery(idx.bk, qt, qt.length <= 4 ? 1 : 2, near);
    for (const [tok, d] of near) {
      for (const id of idx.tokenOwners.get(tok) ?? []) add(id, d === 1 ? 1 : 0.5);
    }
  }
  return out;
}
