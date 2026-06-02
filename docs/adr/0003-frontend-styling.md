# ADR 0003: Frontend styling with CSS Modules

## Status

Accepted

## Context

Styling options included Tailwind, UI libraries, or plain CSS.

## Decision

Use CSS Modules with design tokens in `src/styles/tokens.css`. Clean card layout, no UI library.

## Consequences

- Zero extra styling dependencies
- Scoped styles per component
- Responsive mobile-first layout without framework overhead
