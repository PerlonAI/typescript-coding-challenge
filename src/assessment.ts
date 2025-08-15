/**
 * Typescript Coding Assessment (60 minutes total)
 *
 * Goal: assess correctness-first thinking, debugging skill, data-structure choice,
 * and clear code. Keep code tidy and add brief comments where helpful.
 *
 * Time guide (non-binding):
 * - Part 1: 12 min
 * - Part 2: 20 min
 * - Part 3: 10 min
 * - Part 4: 13 min
 * - ELI5:   5 min
 *
 * Scoring rubric
 * - Correctness (40%): passes assertions; follows specs.
 * - Code quality (25%): clarity, types, naming, small functions.
 * - Complexity (20%): avoids unnecessary O(N^2); picks suitable structures.
 * - Tests (10%): leave assertions intact; add small extras if time allows.
 * - Communication (5%): concise comments; no walls of text.
 */

// =============================================================================
// Lightweight test helpers (replace console-logs with assertions)
// =============================================================================
function assertEqual<T>(name: string, got: T, expected: T) {
  const g = JSON.stringify(got);
  const e = JSON.stringify(expected);
  if (g !== e) throw new Error(`${name} FAILED\nGot: ${g}\nExp: ${e}`);
}
function assertTrue(name: string, cond: boolean) {
  if (!cond) throw new Error(`${name} FAILED`);
}

// =============================================================================
// PART 1: TREND CHANGE DETECTOR (12 minutes)
// =============================================================================
/**
 * Find indices where the numeric sequence switches between trends.
 *
 * Trend rules:
 * - "Up" means strictly increasing when compared (a[i] < a[i+1]).
 * - "Down" means strictly decreasing when compared (a[i] > a[i+1]).
 * - "Flat" (equal neighbours) extends the current trend; it does NOT cause a change by itself.
 *
 * Indexing rule:
 * - Return the 0-based index of the FIRST element of the new trend
 *   (i.e., the right side of the boundary where the flip occurs).
 *   Example: [1,2,3,2,1] flips from up→down between 3 and 2; return [3].
 *
 * Requirements:
 * - Time: O(N). Single pass preferred.
 * - Space: O(1) extra (excluding the output array).
 * - Input values are finite numbers (no NaN/Infinity).
 * - Output indices must be unique and strictly increasing.
 */
export function findTrendChangePoints(_nums: number[]): number[] {
  // TODO: implement single-pass O(N) solution per the spec
  return [];
}

// Part 1 property-style tests (non-leaky: verify invariants, not exact indices)
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

    // sanity: indices valid and strictly increasing
    assertTrue("cps array", Array.isArray(cps));
    let last = -1;
    for (const i of cps) {
      assertTrue("index in range", i >= 0 && i < nums.length);
      assertTrue("strictly increasing indices", i > last);
      last = i;
    }

    // segments must each be monotone (non-decreasing OR non-increasing)
    const segs = segmentsFromChangePoints(nums, cps);
    for (const seg of segs) {
      assertTrue(
        "segment monotone",
        isNonDecreasing(seg) || isNonIncreasing(seg)
      );
    }
  }
}

// =============================================================================
// PART 2: SYSTEM DESIGN – SMART PARKING (20 minutes)
// =============================================================================
/**
 * Deterministic layout & rules (so all candidates are comparable):
 * - Floors 1..5, Spots 1..20 each.
 * - On EVERY floor: spots 1–8: 'compact', 9–16: 'standard', 17–20: 'large'.
 * - Car-size compatibility:
 *   - compact car: may park in compact/standard/large
 *   - standard car: may park in standard/large
 *   - large car: may park in large only
 * - Preference & tie-breakers: prefer the lowest floor; within a floor, the lowest spot number.
 * - Preferred floor: try that floor first; if no compatible spot, fall back to global best.
 * - Identity: cars are identified by carId. A carId cannot be parked twice. Remove by carId.
 * - Error semantics: parkCar returns null if carId already parked or no compatible spot.
 *                    removeCar returns false if carId not found.
 * - Performance target (not mandatory but nice): O(log N) park/remove using indexed sets or heaps.
 */

export type SpotSize = "compact" | "standard" | "large";
export type CarSize = "compact" | "standard" | "large";
export type SpotLocation = [number, number]; // [floor, spot]

export interface ParkingSpot {
  floor: number;
  spot: number;
  size: SpotSize;
  carId?: string; // occupied if present
}

export class ParkingGarage {
  private spots: Map<string, ParkingSpot> = new Map(); // key = `${floor}:${spot}`
  // private _carIndex: Map<string, string> = new Map(); // carId -> spotKey

  constructor() {
    this.initializeGarage();
  }

  // private _key(_floor: number, _spot: number): string { return `${_floor}:${_spot}`; }

  private initializeGarage(): void {
    // TODO: Implement the fixed layout per spec (no answers provided)
    // for floor in 1..5, spot in 1..20, assign sizes as specified and insert into this.spots
  }

  // private _compatible(_car: CarSize, _spot: SpotSize): boolean {
  //   // TODO: Implement compatibility rules from the spec
  //   return false;
  // }

  /**
   * Find optimal spot per rules. Does NOT park the car.
   * - Search order: preferred floor first (if provided), then increasing floors; within a floor, increasing spot.
   * - Additionally, prefer 'standard' over 'large' for standard cars while any standard exists.
   */
  findOptimalSpot(
    _carSize: CarSize,
    _preferredFloor?: number
  ): SpotLocation | null {
    // TODO
    return null;
  }

  /**
   * Park a car by carId. Returns assigned [floor, spot] or null if none.
   * - Reject duplicate carId
   * - Return null if already parked or no compatible spot.
   */
  parkCar(
    _carId: string,
    _carSize: CarSize,
    _preferredFloor?: number
  ): SpotLocation | null {
    // TODO
    return null;
  }

  /**
   * Remove a car by carId. Returns true if a car was removed, false if not found.
   */
  removeCar(_carId: string): boolean {
    // TODO
    return false;
  }

  getOccupancyStatus(): { total: number; occupied: number; available: number } {
    // TODO: Compute totals (avoid O(N) each time if you add counters)
    return { total: this.spots.size, occupied: 0, available: this.spots.size };
  }
}

// Part 2 property-style tests (limit leakage)
export function testParkingSystem(): void {
  const g = new ParkingGarage();
  // Initial totals
  const status0 = g.getOccupancyStatus();
  assertTrue("100 total spots", status0.total === 100);
  assertTrue("initial occupied is 0", status0.occupied === 0);

  // Parking increments occupancy by 1
  const before = g.getOccupancyStatus().occupied;
  const p1 = g.parkCar("car-1", "compact");
  const after = g.getOccupancyStatus().occupied;
  assertTrue(
    "compact parked increments occ",
    p1 !== null && after === before + 1
  );

  // Duplicate park prevented
  const dup = g.parkCar("car-1", "compact");
  assertTrue("duplicate park rejected", dup === null);

  // Remove succeeds then fails
  assertTrue("remove existing returns true", g.removeCar("car-1") === true);
  assertTrue("remove again returns false", g.removeCar("car-1") === false);

  // Standard cars should consume 'standard' (spots 9..16) while any standard exists
  for (let i = 0; i < 5; i++) {
    const sLoc = g.parkCar(`std-${i}`, "standard");
    assertTrue("standard car assigned a spot", sLoc !== null);
    if (sLoc) {
      const [, spot] = sLoc;
      assertTrue(
        "standard uses standard before large",
        spot >= 9 && spot <= 16
      );
    }
  }

  // Large cars should park in large (17..20) when available (first few checks)
  for (let i = 0; i < 3; i++) {
    const lLoc = g.parkCar(`lg-${i}`, "large");
    assertTrue("large car assigned a spot", lLoc !== null);
    if (lLoc) {
      const [, spot] = lLoc;
      assertTrue("large uses large spots", spot >= 17 && spot <= 20);
    }
  }
}

// =============================================================================
// PART 3: DEBUG & OPTIMISE (10 minutes)
// =============================================================================
/**
 * BUGGY FUNCTION — Fix and optimise.
 *
 * SPEC (precise):
 * - Return unique value pairs [a, b] such that a + b = target.
 * - Pairs are order-independent; include [x, x] only if x occurs at least twice.
 * - Do not return duplicates; order pairs as [min, max].
 * - Desired complexity: O(N) time, O(N) space.
 */
export function findUniquePairs(
  arr: number[],
  target: number
): [number, number][] {
  // INTENTIONALLY BUGGY STARTER — REWRITE
  const pairs: [number, number][] = [];
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i]! + arr[j]! === target) {
        pairs.push([arr[i]!, arr[j]!]);
      }
    }
  }
  return pairs;
}

// Property-based tests (avoid leaking exact internals; still deterministic)
function isSortedPair(p: [number, number]) {
  return p[0] <= p[1];
}
export function testFindUniquePairs(): void {
  const check = (arr: number[], target: number) => {
    const out = findUniquePairs(arr, target);
    // All pairs sum to target
    assertTrue(
      "all sum to target",
      out.every(([a, b]) => a + b === target)
    );
    // Pairs sorted
    assertTrue("pairs sorted", out.every(isSortedPair));
    // No duplicates
    const seen = new Set(out.map((p) => JSON.stringify(p)));
    assertTrue("unique pairs only", seen.size === out.length);
    // [x,x] only if count(x) >= 2
    const counts = new Map<number, number>();
    for (const v of arr) counts.set(v, (counts.get(v) || 0) + 1);
    assertTrue(
      "self-pairs valid",
      out.every(([a, b]) => a !== b || (counts.get(a) || 0) >= 2)
    );
  };
  check([1, 2, 3, 4], 5);
  check([2, 2, 3], 4);
  check([], 5);
  check([1, 2, 1, 3], 4);
  check([-1, 0, 1, 2, -2], 0);
}

/**
 * After fixing, briefly note bugs you found and your approach (2–4 lines):
 * - BUGS:
 * - FIX:
 * - COMPLEXITY:
 */

// =============================================================================
// PART 4: TEXT COMPRESSION (13 minutes)
// =============================================================================
/**
 * Run-Length Encoding (RLE)
 * SPEC:
 * - Operates on Unicode code points (iterate with `for...of`).
 * - Output format: <count><char> concatenated. E.g., "aaabb" -> "3a2b".
 * - If compression is not shorter, return the original string.
 */
export function compressText(text: string): string {
  // TODO: Implement RLE per spec
  return text;
}

/**
 * Pattern compression — repeated full-string substring only
 * Example: "abcabcabc" → "3(abc)"; if no such repetition, return original.
 * Guidance: find the smallest period via prefix or Z-algorithm; target O(N) (or O(N log N)); avoid O(N^3).
 */
export function compressWithPatterns(text: string): string {
  // TODO: Implement pattern-based compression
  return text;
}

/**
 * Fast-decompression format
 * Design a format prioritising decompression speed over ratio.
 * Suggested: length-prefixed blocks: count#len:literal (concatenated)
 * Example for "aaabb": 3#1:a2#1:b
 */
export function compressForFastDecompression(text: string): string {
  // TODO: Emit length-prefixed blocks per your design
  return text;
}

export function decompressFast(compressedText: string): string {
  // TODO: Implement fast single-pass decompressor for your format
  return compressedText;
}

// Part 4 tests
export function testCompression(): void {
  // Basic tests
  assertEqual("RLE example", compressText("aaabbccccdeee"), "3a2b4c1d3e");
  assertEqual("RLE no-benefit", compressText("abc"), "abc");
  assertEqual("RLE run", compressText("aaa"), "3a");

  // Pattern tests (if implemented)
  assertEqual("Pattern triple", compressWithPatterns("abcabcabc"), "3(abc)");
  assertEqual("Pattern none", compressWithPatterns("abcd"), "abcd");

  // Fast round-trip (format is candidate-defined)
  const samples = [
    "",
    "a",
    "aa",
    "aaa",
    "aaabbccccdeee",
    "abc",
    "abcabcabc",
    "😀😀😀😅",
    "abababababab",
  ];
  for (const s of samples) {
    const rt = decompressFast(compressForFastDecompression(s));
    assertTrue("fast round-trip", rt === s);
  }
}

// =============================================================================
// BONUS: EXPLAIN LIKE I’M 10 (5 minutes)
// =============================================================================
/**
 * Pick your most complex solution and explain it simply (3–6 sentences max).
 *
 * ELI5:
 */

// =============================================================================
// TEST RUNNER (leave commented; uncomment locally to run)
// =============================================================================
export function runAllTests(): void {
  const tests: Array<[string, () => void]> = [
    ["Part 1: Trend Change Detector", testPart1],
    ["Part 2: Smart Parking System", testParkingSystem],
    ["Part 3: Unique Pairs", testFindUniquePairs],
    ["Part 4: Text Compression", testCompression],
  ];
  let passed = 0;
  let failed = 0;
  for (const [name, fn] of tests) {
    try {
      fn();
      console.log(`✅ ${name} passed`);
      passed++;
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.log(`❌ ${name} failed: ${message}`);
      failed++;
    }
  }
  console.log(`\nSummary: ${passed} passed, ${failed} failed.`);
}

// Uncomment to run locally
// runAllTests();
