import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useCalculator } from './useCalculator'
import { ApiError } from '../api/errors'

const add = vi.fn()
const divide = vi.fn()

const sqrt = vi.fn()

vi.mock('../api/client', () => ({
  add: (...args: unknown[]) => add(...args),
  subtract: vi.fn(),
  multiply: vi.fn(),
  divide: (...args: unknown[]) => divide(...args),
  power: vi.fn(),
  sqrt: (...args: unknown[]) => sqrt(...args),
  percentage: vi.fn(),
}))

describe('useCalculator', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('submits add operation successfully', async () => {
    add.mockResolvedValue(5)

    const { result } = renderHook(() => useCalculator())

    act(() => {
      result.current.setOperandA('2')
      result.current.setOperandB('3')
    })

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.result).toBe(5)
    expect(result.current.error).toBeNull()
    expect(add).toHaveBeenCalledWith(2, 3)
  })

  it('shows validation error for empty operand', async () => {
    const { result } = renderHook(() => useCalculator())

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.error).toMatch(/valid number/)
    expect(result.current.result).toBeNull()
  })

  it('shows API error message', async () => {
    divide.mockRejectedValue(
      new ApiError(422, 'DIVISION_BY_ZERO', 'division by zero'),
    )

    const { result } = renderHook(() => useCalculator())

    act(() => {
      result.current.setOperation('divide')
      result.current.setOperandA('10')
      result.current.setOperandB('0')
    })

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.error).toBe('division by zero')
  })

  it('clears result when operation changes', () => {
    const { result } = renderHook(() => useCalculator())

    act(() => {
      result.current.setOperation('sqrt')
    })

    expect(result.current.error).toBeNull()
  })

  it('submits sqrt operation with one operand', async () => {
    sqrt.mockResolvedValue(4)

    const { result } = renderHook(() => useCalculator())

    act(() => {
      result.current.setOperation('sqrt')
      result.current.setOperandA('16')
    })

    await act(async () => {
      await result.current.submit()
    })

    expect(result.current.result).toBe(4)
    expect(sqrt).toHaveBeenCalledWith(16)
  })
})
