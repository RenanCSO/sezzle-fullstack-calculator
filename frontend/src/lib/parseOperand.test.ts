import { describe, expect, it } from 'vitest'
import { parseOperand } from './parseOperand'

describe('parseOperand', () => {
  it('parses a valid numeric string', () => {
    expect(parseOperand('42')).toBe(42)
    expect(parseOperand('-3.5')).toBe(-3.5)
  })

  it('rejects empty operand', () => {
    expect(parseOperand('')).toBeNull()
    expect(parseOperand('   ')).toBeNull()
  })

  it('rejects non-numeric operand', () => {
    expect(parseOperand('abc')).toBeNull()
  })
})
