export function createRange (start, end) {
  return Array.from({ length: end - start + 1 }, (x, i) => i + start)
}

export function transpose (array, offset) {
  const table = [...array]
  for (let i = 0; i < offset; i++) {
    table.push(table.shift())
  }
  return table
}
