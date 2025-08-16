# TypeScript Coding Assessment — Candidate Guide (60 min)

## What to edit

- Complete the TODOs in:
  - `src/parts/part1.ts`
  - `src/parts/part2.ts`
  - `src/parts/part3.ts`
  - `src/parts/part4.ts`
- Keep tests intact (they're at the bottom of each part). You may add tiny extras if helpful.

## How to run

- One-shot runner:
  - `npm run build && npm start` (runs `src/index.ts` which executes all tests)
- Live dev:
  - `npm run dev` (watches and runs on changes)

## Scoring

- **Correctness (40%)**: Follows specs; tests pass.
- **Code quality (25%)**: Clear types, names, small functions.
- **Complexity (20%)**: Suitable structures; avoid avoidable O(N^2).
- **Tests (10%)**: Keep our assertions; small focused extras welcome.
- **Communication (5%)**: Concise comments; Part 3 note; Bonus ELI5.

---

## Part 1 — Trend Change Detector (~12 min)

- Implement `findTrendChangePoints(nums: number[]): number[]`
- Trends: up (`a[i] < a[i+1]`), down (`a[i] > a[i+1]`), flat extends current trend
- Return the 0-based index of the first element of the new trend
- Constraints: O(N) time, O(1) extra
- Edge cases: length < 2, all equal, plateaus

## Part 2 — Smart Parking System (~20 min)

- Fixed layout: floors 1..5, spots 1..20; sizes: 1–8 compact, 9–16 standard, 17–20 large
- Compatibility: compact → any; standard → standard/large; large → large only
- Preference: lowest floor/spot; honor preferred floor; standard cars prefer standard while available
- Implement: initialization, `findOptimalSpot`, `parkCar`, `removeCar`, `getOccupancyStatus`

## Part 3 — Debug & Optimize (~10 min)

- Rewrite `findUniquePairs` to spec:
  - Unique pairs `[min, max]` with sum `target`; include `[x,x]` only if `x` appears at least twice
  - Aim O(N) time / O(N) space
- Write a 2–4 line note: bugs, fix, complexity

## Part 4 — Text Compression (~13 min)

- `compressText` (RLE, Unicode-safe via `for...of`, only if shorter)
- `compressWithPatterns` (k×substring → `k(substring)`, find smallest period efficiently)
- `compressForFastDecompression` / `decompressFast` (length-prefixed blocks OK; must round-trip)

## Bonus — Explain Like I'm 10 (~5 min)

- In 3–6 sentences, explain your most complex solution simply.

## Submission checklist

- [ ] All TODOs implemented
- [ ] All tests pass locally (`npm run build && npm start`)
- [ ] No stray logs
- [ ] Part 3 note added
- [ ] Bonus ELI5 written
- [ ] Code is tidy (small functions, clear names)
