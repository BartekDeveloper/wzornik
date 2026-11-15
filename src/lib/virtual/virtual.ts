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
  offsets: number[],
  gap: number,
  overscan = 5,
): VirtualRange {
  if (count <= 0) return { start: 0, end: 0, padTop: 0, padBottom: 0, total: 0 };
  const total = Math.max(0, offsets[count]! - gap);
  const visStart = Math.max(0, scrollTop);
  const visEnd = visStart + Math.max(1, viewportHeight);

  // binary search: first item whose bottom edge is below the visible start
  let lo = 0;
  let hi = count;
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (offsets[mid + 1]! <= visStart) lo = mid + 1;
    else hi = mid;
  }
  let start = Math.max(0, lo - overscan);

  let end = start;
  while (end < count && offsets[end]! < visEnd) end++;
  end = Math.min(count, end + overscan);

  return {
    start,
    end,
    padTop: offsets[start]!,
    padBottom: Math.max(0, total - offsets[end]!),
    total,
  };
}
