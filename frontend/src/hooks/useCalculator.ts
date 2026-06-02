import { useCallback, useState } from 'react'
import * as api from '../api/client'
import { ApiError } from '../api/errors'
import { parseOperand } from '../lib/parseOperand'
import { isUnaryOperation, type Operation } from '../types/operation'

type BinaryOp = (a: number, b: number) => Promise<number>

const binaryOperations: Record<
  Exclude<Operation, 'sqrt'>,
  BinaryOp
> = {
  add: api.add,
  subtract: api.subtract,
  multiply: api.multiply,
  divide: api.divide,
  power: api.power,
  percentage: api.percentage,
}

export function useCalculator() {
  const [operation, setOperationState] = useState<Operation>('add')
  const [operandA, setOperandA] = useState('')
  const [operandB, setOperandB] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const isUnary = isUnaryOperation(operation)

  const setOperation = useCallback((op: Operation) => {
    setOperationState(op)
    setResult(null)
    setError(null)
  }, [])

  const submit = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    setResult(null)

    const a = parseOperand(operandA)
    if (a === null) {
      setError('Please enter a valid number for the first operand')
      setIsLoading(false)
      return
    }

    try {
      if (isUnary) {
        const value = await api.sqrt(a)
        setResult(value)
        return
      }

      const b = parseOperand(operandB)
      if (b === null) {
        setError('Please enter a valid number for the second operand')
        return
      }

      const value = await binaryOperations[operation as Exclude<Operation, 'sqrt'>](a, b)
      setResult(value)
    } catch (e) {
      setError(e instanceof ApiError ? e.message : 'Unexpected error')
    } finally {
      setIsLoading(false)
    }
  }, [operandA, operandB, operation, isUnary])

  return {
    operation,
    setOperation,
    operandA,
    setOperandA,
    operandB,
    setOperandB,
    result,
    error,
    isLoading,
    submit,
    isUnary,
  }
}
