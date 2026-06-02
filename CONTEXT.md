# CONTEXT.md

Domain glossary for the Sezzle full-stack calculator.

## Operation

A mathematical action applied to one or more operands (e.g. add, subtract, divide, square root, percentage).

## Operand

A numeric input to a calculation. Binary operations use operands **a** and **b**; unary operations (square root) use **a** only.

## Calculation

The process of applying an operation to operands and producing a result.

## Result

The numeric output of a successful calculation, returned by the API as `{ "result": <number> }`.

## Percentage (a% of b)

A percentage operation meaning **a percent of b**, computed as `(a / 100) * b`. Example: 20% of 150 = 30.
