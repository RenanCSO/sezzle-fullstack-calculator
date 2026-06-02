# ADR 0005: ApiError and per-operation client functions

## Status

Accepted

## Context

The frontend API client needed an error handling strategy and module structure.

## Decision

- `ApiError` class with `status`, `code`, `message`; thrown on non-2xx
- One exported function per operation (`add`, `divide`, etc.)
- Display backend error message directly in UI

## Consequences

- Hook uses try/catch with `instanceof ApiError`
- Each function is independently testable
