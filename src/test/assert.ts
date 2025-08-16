export function assertEqual<T>(name: string, got: T, expected: T) {
  const g = JSON.stringify(got);
  const e = JSON.stringify(expected);
  if (g !== e) throw new Error(`${name} FAILED\nGot: ${g}\nExp: ${e}`);
}

export function assertTrue(name: string, cond: boolean) {
  if (!cond) throw new Error(`${name} FAILED`);
}
