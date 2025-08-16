import { assertTrue } from "../test/assert";

/**
 * Part 3: Debug & Optimize — Unique Pairs (~10 min)
 *
 * Spec:
 * - Return unique pairs [a, b] with a + b = target
 * - Pairs are order-independent; within each pair output [min, max]
 * - Include [x, x] only if x occurs at least twice
 * - Aim for O(N) time / O(N) space
 *
 * Short note required (2–4 lines): bugs you found, fix, complexity
 */
export function findUniquePairs(
  _arr: number[],
  _target: number
): [number, number][] {
  // TODO: Rewrite to meet the spec (O(N) time/space)
  return [];
}

// Tests (do not modify)
function isSortedPair(p: [number, number]) {
  return p[0] <= p[1];
}
export function testFindUniquePairs(): void {
  const check = (
    arr: number[],
    target: number,
    expectedPairs: [number, number][]
  ) => {
    const out = findUniquePairs(arr, target);
    assertTrue(
      "all sum to target",
      out.every(([a, b]) => a + b === target)
    );
    assertTrue("pairs sorted", out.every(isSortedPair));
    const seen = new Set(out.map((p) => JSON.stringify(p)));
    assertTrue("unique pairs only", seen.size === out.length);
    const counts = new Map<number, number>();
    for (const v of arr) counts.set(v, (counts.get(v) || 0) + 1);
    assertTrue(
      "self-pairs valid",
      out.every(([a, b]) => a !== b || (counts.get(a) || 0) >= 2)
    );

    // Check that we found the expected number of pairs
    assertTrue(
      `expected ${expectedPairs.length} pairs, got ${out.length}`,
      out.length === expectedPairs.length
    );

    // Check that all expected pairs are present
    const expectedSet = new Set(expectedPairs.map((p) => JSON.stringify(p)));
    const actualSet = new Set(out.map((p) => JSON.stringify(p)));
    for (const expected of expectedSet) {
      assertTrue(`missing expected pair ${expected}`, actualSet.has(expected));
    }
  };

  check([1, 2, 3, 4], 5, [
    [1, 4],
    [2, 3],
  ]);
  check([2, 2, 3], 4, [[2, 2]]); // 2+2=4, and we have two 2s
  check([], 5, []);
  check([1, 2, 1, 3], 4, [[1, 3]]);
  check([-1, 0, 1, 2, -2], 0, [
    [-2, 2],
    [-1, 1],
  ]);
}

/**
 * After fixing, briefly note (below or in comments):
 * - BUGS:
 * - FIX:
 * - COMPLEXITY:
 */
