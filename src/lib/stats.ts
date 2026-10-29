export function total(values: number[]): number {
  return values.reduce((sum, v) => sum + v, 0)
}

export function average(values: number[]): number {
  return values.length === 0 ? 0 : total(values) / values.length
}