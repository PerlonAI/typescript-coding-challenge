import { assertTrue } from "../test/assert";

/**
 * Part 1: Trend Change Detector (~12 min)
 *
 * Implement:
 *   export function findTrendChangePoints(nums: number[]): number[]
 *
 * Trend rules:
 * - "Up": a[i] < a[i+1]
 * - "Down": a[i] > a[i+1]
 * - "Flat": equal neighbors extend current trend; does NOT cause change by itself.
 *
 * Indexing:
 * - Return the 0-based index of the FIRST element of the new trend (right side of the boundary).
 *   Example: [1,2,3,2,1] flips up→down between 3 and 2; return [3].
 *
 * Constraints:
 * - Time: O(N) single pass preferred; Space: O(1) extra (output array excluded)
 * - Output indices strictly increasing and unique
 */
export function findTrendChangePoints(_nums: number[]): number[] {
  // TODO: Implement per spec (O(N), O(1) extra).
  return [];
}

// Helpers and tests (do not modify)
function isNonDecreasing(a: number[]): boolean {
  for (let i = 0; i + 1 < a.length; i++) if (a[i]! > a[i + 1]!) return false;
  return true;
}
function isNonIncreasing(a: number[]): boolean {
  for (let i = 0; i + 1 < a.length; i++) if (a[i]! < a[i + 1]!) return false;
  return true;
}
function segmentsFromChangePoints(nums: number[], cps: number[]): number[][] {
  const segs: number[][] = [];
  let start = 0;
  for (const cp of cps) {
    segs.push(nums.slice(start, cp));
    start = cp;
  }
  segs.push(nums.slice(start));
  return segs.filter((s) => s.length > 0);
}
export function testPart1(): void {
  const cases = [
    [],
    [1],
    [2, 3, 4],
    [4, 3, 2],
    [1, 2, 3, 2, 1],
    [5, 4, 3, 3, 4, 5],
    [1, 3, 2, 4, 3, 5],
    [2, 2, 2, 3, 4],
    [3, 4, 5, 5, 5],
    [1, 2, 2, 2, 1],
    [9, 9, 9, 9],
    [10, 9, 8, 8, 8, 7, 8, 9, 9, 9, 7],
  ];
  for (const nums of cases) {
    const cps = findTrendChangePoints(nums);
    assertTrue("cps array", Array.isArray(cps));
    let last = -1;
    for (const i of cps) {
      assertTrue("index in range", i >= 0 && i < nums.length);
      assertTrue("strictly increasing indices", i > last);
      last = i;
    }
    const segs = segmentsFromChangePoints(nums, cps);
    for (const seg of segs) {
      assertTrue(
        "segment monotone",
        isNonDecreasing(seg) || isNonIncreasing(seg)
      );
    }
  }
}
