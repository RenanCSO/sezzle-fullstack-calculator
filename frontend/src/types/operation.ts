export type Operation =
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'power'
  | 'sqrt'
  | 'percentage'

export const OPERATIONS: { value: Operation; label: string }[] = [
  { value: 'add', label: 'Add' },
  { value: 'subtract', label: 'Subtract' },
  { value: 'multiply', label: 'Multiply' },
  { value: 'divide', label: 'Divide' },
  { value: 'power', label: 'Power' },
  { value: 'sqrt', label: 'Square Root' },
  { value: 'percentage', label: 'Percentage' },
]

export function isUnaryOperation(operation: Operation): boolean {
  return operation === 'sqrt'
}
