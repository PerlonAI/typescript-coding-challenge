import { testPart1 } from "./parts/part1";
import { testParkingSystem } from "./parts/part2";
import { testFindUniquePairs } from "./parts/part3";
import { testCompression } from "./parts/part4";

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
