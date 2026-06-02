# ADR 0001: Per-operation API endpoints

## Status

Accepted

## Context

The calculator API could expose a single `POST /calculations` resource or separate endpoints per operation.

## Decision

Use per-operation endpoints: `POST /api/v1/add`, `/subtract`, etc.

## Consequences

- Each endpoint has a typed, predictable request body
- More routes to register and test, but straightforward with Go 1.22+ ServeMux
- Maps naturally to the frontend operation dropdown
