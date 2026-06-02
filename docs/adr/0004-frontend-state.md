# ADR 0004: useCalculator hook for state

## Status

Accepted

## Context

Form state could live in the component, a reducer, or a custom hook.

## Decision

Extract all form state and submit logic into `useCalculator`. `CalculatorForm` is presentational. Operands stored as strings; validate at submit.

## Consequences

- Hook is testable with `renderHook`
- Operation change clears result/error but keeps operand values
