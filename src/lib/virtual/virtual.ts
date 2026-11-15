export interface VirtualRange {
  start: number;
  end: number;
  padTop: number;
  padBottom: number;
  total: number;
}

export function computeVirtualRange(
  count: number,
  scrollTop: number,
  viewportHeight: number,
  heightAt: (index: number) => number,
  gap: number,
  overscan = 5,
): VirtualRange {
  if (count <= 0) return { start: 0, end: 0, padTop: 0, padBottom: 0, total: 0 };
  const offsets: number[] = [0];
  for (let i = 0; i < count; i++) {
    offsets.push(offsets[i]! + Math.max(0, heightAt(i)) + gap);
  }
  const total = Math.max(0, offsets[count]! - gap);
  const visStart = Math.max(0, scrollTop);
  const visEnd = visStart + Math.max(1, viewportHeight);
  let start = 0;
  while (start < count && offsets[start]! + Math.max(0, heightAt(start)) <= visStart) start++;
  start = Math.max(0, start - overscan);
  let end = start;
  while (end < count && offsets[end]! < visEnd) end++;
  end = Math.min(count, end + overscan);
  const padTop = offsets[start]!;
  const padBottom = Math.max(0, total - offsets[end]!);
  return { start, end, padTop, padBottom, total };
}
