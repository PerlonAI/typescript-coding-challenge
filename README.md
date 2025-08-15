# Mid-Level Full-Stack Coding Assessment — Candidate Guide (60 min)

This guide explains each part of the coding exercise, what’s expected, and the key constraints. Read it fully before you start.

---

## What you’ll deliver

- Edit the provided **TypeScript** file and complete the TODOs.
- Keep your code **clear, small, and well-named**. Add brief comments where they genuinely help.
- Leave the built-in tests intact. You may add tiny extra tests if helpful.

## How to run tests

- At the bottom of the file there’s a `runAllTests()` function.
  Uncomment it locally to execute all sections, or call the individual `test*` functions.

## Time & scoring

- **Total time:** 60 minutes (per-section times are guidance, not hard limits).
- **Scoring**

  - **Correctness (40%)** – Follows specs; tests pass.
  - **Code quality (25%)** – Clear types, naming, structure; helpful comments.
  - **Complexity (20%)** – Uses appropriate data structures/algorithms; avoids avoidable `O(N^2)`.
  - **Tests (10%)** – Keeps our assertions; small, focused extras welcome.
  - **Communication (5%)** – Concise explanations where requested (e.g., Part 3 note, Bonus ELI5).

---

# Part 1 — Trend Change Detector (\~12 min)

### Your task

Implement:

```ts
export function findTrendChangePoints(nums: number[]): number[];
```

### What it should do

Return the **indices** where a numeric sequence switches trend between **non-decreasing** and **non-increasing** (and vice versa).

- **Trend definitions**

  - **Up**: strictly increasing when compared (`a[i] < a[i+1]`).
  - **Down**: strictly decreasing when compared (`a[i] > a[i+1]`).
  - **Flat**: equal neighbors extend the current trend and **do not** cause a change by themselves.

- **Indexing rule**

  - Return the **0-based index of the first element of the new trend** (the right side of the flip).
  - Example (illustrative): `[1, 2, 3, 2, 1]` flips up→down between `3` and `2`; return `[3]`.

### Requirements

- **Time:** `O(N)` (single pass preferred).
- **Space:** `O(1)` extra (output array doesn’t count).
- **Input:** finite numbers (no `NaN`/`Infinity`).
- **Output:** indices must be **unique** and **strictly increasing**.

### Edge cases to consider

- Length `< 2` → `[]`.
- Entire array equal → `[]`.
- Leading/trailing flats (e.g., `[2,2,2,3,...]` or `[...,5,5,5]`).
- Plateaus between trends (e.g., `[1,2,2,2,1]` → the change index is the **first element after the plateau** that begins the new trend).

**Tip:** Keep a small state machine: current trend (unknown/up/down), last non-equal value, and append an index only when the trend actually flips.

---

# Part 2 — Smart Parking System (\~20 min)

### Context

Design a tiny in-memory parking system with deterministic behavior so every candidate is comparable.

### Fixed layout

- **Floors:** `1..5`, **Spots per floor:** `1..20` (total 100).
- **Spot sizes per floor:**
  `1–8: 'compact'`, `9–16: 'standard'`, `17–20: 'large'`.

### Compatibility rules

- `compact` car → may park in `compact`/`standard`/`large`
- `standard` car → may park in `standard`/`large`
- `large` car → may park in `large` only

### Preference & tie-breakers

- Prefer **lowest floor**, then **lowest spot**.
- **Preferred floor** (optional param): try that floor first; if no compatible spot, fall back to global best.
- While any **standard** spots exist, **standard cars** should consume **standard** (not large).

### Identity & errors

- Cars are identified by `carId`.
- `parkCar(carId, size, preferredFloor?)` → `[floor, spot]` or `null` if `carId` already parked or no compatible spot exists.
- `removeCar(carId)` → `true` if removed; `false` if not found.

### Performance

A simple scan is fine here. If you prefer, you can maintain indices/queues for faster lookup—keep it readable.

### What to implement

- Garage initialization with the exact distribution above.
- `findOptimalSpot`, `parkCar`, `removeCar`, `getOccupancyStatus`.

---

# Part 3 — Debug & Optimize: Unique Pairs (\~10 min)

You’re given a deliberately buggy `findUniquePairs` implementation. Rewrite it to meet the spec:

### Spec

- Return **unique** pairs `[a, b]` where `a + b = target`.
- Pairs are order-independent; **within each pair**, output `[min, max]`.
- Include `[x, x]` **only** if `x` appears **at least twice** in the array.
- Aim for **`O(N)` time / `O(N)` space** (e.g., frequency map or set-based approach).
- Make output **deterministic** (e.g., sort resulting pairs if helpful).

### Short note required

After your fix, write 2–4 lines:

- The bugs you found,
- How you fixed them,
- Your complexity.

---

# Part 4 — Text Compression (\~13 min)

### 1) `compressText` — Run-Length Encoding (RLE)

- Operates on **Unicode code points** (iterate with `for...of`).
- Output: `<count><char>` concatenated.
  Example: `"aaabb"` → `"3a2b"`.
- If compression is **not shorter**, return the **original** string.

### 2) `compressWithPatterns` — Full-string repetition

- If the **entire** string is a repetition of a smaller substring, return `k(substring)`
  Example: `"abcabcabc"` → `"3(abc)"`.
- Otherwise, return the original string.
- Find the **smallest period** efficiently (e.g., prefix function / Z-algorithm).
  Target `O(N)` (or `O(N log N)`); avoid cubic substring scans.

### 3) `compressForFastDecompression` / `decompressFast`

- Design a format that favors **single-pass fast decompression** over compression ratio.
- Any unambiguous length-prefixed block scheme is fine (e.g., `count#len:literal`), as long as `decompressFast(compressForFastDecompression(text)) === text` for valid inputs.
- Our tests check **round-trip** on several sample strings, including some with emoji (Unicode).

---

# Bonus — Explain Like I’m 10 (\~5 min)

Pick your most complex piece (e.g., your trend detector, period detection, or parking allocation) and explain it in **3–6 sentences** in simple, clear language.

---

## Submission checklist

- [ ] All TODOs implemented.
- [ ] Built-in tests pass locally (`runAllTests()`).
- [ ] No stray console logs.
- [ ] Part 3: short “bugs/fix/complexity” note added.
- [ ] Bonus ELI5 written (3–6 sentences).
- [ ] Code is tidy: small functions, meaningful names, brief comments only where useful.

## Pro tips

- Write the simplest correct thing first, then tighten it.
- Prefer early returns and tiny helpers over long branches.
- Watch indexes and off-by-ones (especially in Part 1).
- In text tasks, iterate strings with `for...of` to be Unicode-safe.
