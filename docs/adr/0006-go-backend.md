# ADR 0006: Go backend architecture

## Status

Accepted

## Context

Go HTTP frameworks (chi, gin) vs stdlib; domain layer shape.

## Decision

- stdlib `net/http.ServeMux` (Go 1.22+ method patterns)
- Pure package functions in `calculator` with sentinel errors
- Single `Handler` struct with shared JSON helpers
- Handler maps domain errors to HTTP status codes

## Consequences

- Zero third-party dependencies
- Clean separation: domain has no HTTP imports
