# ADR 0009: Request logging with slog

## Status

Accepted

## Context

Backend could have no logging, plain `log`, or structured logging.

## Decision

- `middleware/logging.go` using stdlib `log/slog`
- Info for 2xx responses, Warn for 4xx/5xx
- Log method, path, status, duration_ms

## Consequences

- Useful for Docker debugging without external dependencies
- No Prometheus/metrics (out of scope)
