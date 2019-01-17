export function createRange (start, end) {
  return Array.from({ length: end - start + 1 }, (x, i) => i + start)
}
