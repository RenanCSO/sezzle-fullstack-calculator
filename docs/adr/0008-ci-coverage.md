# ADR 0008: CI coverage strategy

## Status

Accepted

## Context

The brief requires unit tests and coverage reports. CI could enforce minimum thresholds.

## Decision

- Parallel GitHub Actions jobs for backend and frontend
- Upload coverage artifacts; do **not** fail on percentage
- Triggers: push and pull_request to `main`

## Consequences

- Reviewers inspect coverage manually
- Avoids flaky threshold failures in a time-boxed project
