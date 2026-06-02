import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { CalculatorForm } from './CalculatorForm'
import type { Operation } from '../types/operation'

const defaultProps = {
  operation: 'add' as Operation,
  setOperation: vi.fn(),
  operandA: '',
  setOperandA: vi.fn(),
  operandB: '',
  setOperandB: vi.fn(),
  result: null,
  error: null,
  isLoading: false,
  isUnary: false,
  onSubmit: vi.fn(),
}

describe('CalculatorForm', () => {
  it('renders two operands for binary operations', () => {
    render(<CalculatorForm {...defaultProps} />)

    expect(screen.getByLabelText(/First operand/)).toBeInTheDocument()
    expect(screen.getByLabelText(/Second operand/)).toBeInTheDocument()
  })

  it('renders one operand for sqrt', () => {
    render(
      <CalculatorForm
        {...defaultProps}
        operation="sqrt"
        isUnary
      />,
    )

    expect(screen.getByLabelText(/Value/)).toBeInTheDocument()
    expect(screen.queryByLabelText(/Second operand/)).not.toBeInTheDocument()
  })

  it('displays result and error', () => {
    const { rerender } = render(<CalculatorForm {...defaultProps} result={42} />)
    expect(screen.getByText('Result: 42')).toBeInTheDocument()

    rerender(<CalculatorForm {...defaultProps} error="division by zero" />)
    expect(screen.getByRole('alert')).toHaveTextContent('division by zero')
  })

  it('calls onSubmit when form is submitted', async () => {
    const onSubmit = vi.fn()
    const user = userEvent.setup()

    render(<CalculatorForm {...defaultProps} onSubmit={onSubmit} />)
    await user.click(screen.getByRole('button', { name: 'Calculate' }))

    expect(onSubmit).toHaveBeenCalled()
  })
})
