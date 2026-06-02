# ADR 0002: Percentage semantics

## Status

Accepted

## Context

"Percentage" is ambiguous — it could mean a% of b, b + a%, or "what percent is a of b?"

## Decision

Percentage computes **a% of b**: `(a / 100) * b`.

Example: `{ "a": 20, "b": 150 }` → `{ "result": 30 }`.

## Consequences

- Documented in README, CONTEXT.md, and API examples
- Frontend labels operands as "Percent (a)" and "Of (b)"
