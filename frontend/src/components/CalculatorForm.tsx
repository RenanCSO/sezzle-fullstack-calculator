import type { FormEvent } from 'react'
import styles from './CalculatorForm.module.css'
import { OPERATIONS, type Operation } from '../types/operation'

type CalculatorFormProps = {
  operation: Operation
  setOperation: (op: Operation) => void
  operandA: string
  setOperandA: (value: string) => void
  operandB: string
  setOperandB: (value: string) => void
  result: number | null
  error: string | null
  isLoading: boolean
  isUnary: boolean
  onSubmit: () => void
}

function operandALabel(operation: Operation): string {
  if (operation === 'percentage') return 'Percent (a)'
  if (operation === 'sqrt') return 'Value (a)'
  return 'First operand (a)'
}

function operandBLabel(operation: Operation): string {
  if (operation === 'percentage') return 'Of (b)'
  return 'Second operand (b)'
}

export function CalculatorForm({
  operation,
  setOperation,
  operandA,
  setOperandA,
  operandB,
  setOperandB,
  result,
  error,
  isLoading,
  isUnary,
  onSubmit,
}: CalculatorFormProps) {
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Calculator</h1>
      <p className={styles.subtitle}>Full-stack calculator powered by Go API</p>

      <label className={styles.label} htmlFor="operation">
        Operation
      </label>
      <select
        id="operation"
        className={styles.input}
        value={operation}
        onChange={(e) => setOperation(e.target.value as Operation)}
      >
        {OPERATIONS.map((op) => (
          <option key={op.value} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>

      <label className={styles.label} htmlFor="operand-a">
        {operandALabel(operation)}
      </label>
      <input
        id="operand-a"
        className={styles.input}
        type="number"
        step="any"
        value={operandA}
        onChange={(e) => setOperandA(e.target.value)}
        aria-label={operandALabel(operation)}
      />

      {!isUnary && (
        <>
          <label className={styles.label} htmlFor="operand-b">
            {operandBLabel(operation)}
          </label>
          <input
            id="operand-b"
            className={styles.input}
            type="number"
            step="any"
            value={operandB}
            onChange={(e) => setOperandB(e.target.value)}
            aria-label={operandBLabel(operation)}
          />
        </>
      )}

      <button className={styles.button} type="submit" disabled={isLoading}>
        {isLoading ? 'Calculating…' : 'Calculate'}
      </button>

      {result !== null && (
        <output className={styles.result} aria-live="polite">
          Result: {result}
        </output>
      )}

      {error && (
        <p className={styles.error} role="alert">
          {error}
        </p>
      )}
    </form>
  )
}
