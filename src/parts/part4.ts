import { assertEqual, assertTrue } from "../test/assert";

/**
 * Part 4: Text Compression (~13 min)
 *
 * 1) compressText — Run-Length Encoding (RLE)
 * - Iterate with for...of (Unicode code points)
 * - Output "<count><char>" (e.g., "aaabb" -> "3a2b")
 * - If not shorter, return original
 *
 * 2) compressWithPatterns — full-string repetition
 * - If text = k * substring, return "k(substring)"; else original
 * - Find smallest period efficiently (prefix/Z-algorithm preferred)
 *
 * 3) compressForFastDecompression / decompressFast
 * - Favor single-pass fast decompression (length-prefixed blocks OK)
 * - Must satisfy round-trip on provided samples
 */
export function compressText(text: string): string {
  // TODO: Implement RLE per spec
  return text;
}

export function compressWithPatterns(text: string): string {
  // TODO: Implement pattern-based compression per spec
  return text;
}

export function compressForFastDecompression(text: string): string {
  // TODO: Emit length-prefixed blocks per your design
  return text;
}

export function decompressFast(compressedText: string): string {
  // TODO: Implement fast single-pass decompressor for your format
  return compressedText;
}

// Tests (do not modify)
export function testCompression(): void {
  assertEqual("RLE example", compressText("aaabbccccdeee"), "3a2b4c1d3e");
  assertEqual("RLE no-benefit", compressText("abc"), "abc");
  assertEqual("RLE run", compressText("aaa"), "3a");

  assertEqual("Pattern triple", compressWithPatterns("abcabcabc"), "3(abc)");
  assertEqual("Pattern none", compressWithPatterns("abcd"), "abcd");

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
