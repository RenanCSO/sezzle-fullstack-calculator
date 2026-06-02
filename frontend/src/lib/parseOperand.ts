/**
 * Parses an operand string into a finite number, or null when invalid/empty.
 */
export function parseOperand(value: string): number | null {
  if (value.trim() === '') {
    return null
  }
  const parsed = parseFloat(value)
  if (!Number.isFinite(parsed)) {
    return null
  }
  return parsed
}
