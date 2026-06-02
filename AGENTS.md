# AGENTS.md

## Project overview

Full-stack calculator: React/TypeScript frontend + Go REST API. Monorepo at repository root.

## Before you edit

- Domain terms: [CONTEXT.md](CONTEXT.md)
- Planning & decisions: [docs/PLAN.md](docs/PLAN.md)
- Architecture: [docs/c4/](docs/c4/)
- ADRs: [docs/adr/](docs/adr/)
- Human setup: [README.md](README.md)
- Prompts log: [PROMPTS.md](PROMPTS.md)

## Commands (run from repo root)

```bash
make dev-backend    # Go API on :8080
make dev-frontend   # Vite on :5173, API at localhost:8080
make test           # Run all tests
make coverage       # Generate coverage reports
make docker-up      # App at :8080, API at :5001
```

## Cross-cutting rules

- Minimize scope; match existing patterns
- No UI libraries; CSS Modules only (see [frontend/AGENTS.md](frontend/AGENTS.md))
- Backend: stdlib `net/http` only (see [backend/AGENTS.md](backend/AGENTS.md))
- Run tests before committing
- Do not commit `.env` or coverage artifacts
