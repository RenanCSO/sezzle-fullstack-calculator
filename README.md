# Sezzle Full-Stack Calculator

A full-stack calculator with a React (TypeScript) frontend and Go REST API backend. Supports basic and advanced arithmetic operations with input validation, structured error handling, unit tests, and Docker deployment.

## Design

- [Implementation plan](docs/PLAN.md)
- [C4 architecture diagrams](docs/c4/)
- [Architecture decision records](docs/adr/)

## Prerequisites

- Go 1.22+
- Node.js 20+
- Docker & Docker Compose (optional)

## Quick start

### Docker (recommended for reviewers)

```bash
make docker-up
```

- **App:** http://localhost:8080
- **API (direct):** http://localhost:5001

> **macOS note:** Port 5000 is often used by AirPlay Receiver. Docker maps the API to **5001** to avoid that conflict. Disable AirPlay in System Settings → General → AirDrop & Handoff if you prefer port 5000.

### Local development

Terminal 1 — backend:

```bash
make dev-backend
```

Terminal 2 — frontend:

```bash
make dev-frontend
```

- **App:** http://localhost:5173
- **API:** http://localhost:8080

## API examples

All calculation endpoints accept JSON and return `{ "result": <number> }`.

### Add

```bash
curl -s -X POST http://localhost:5001/api/v1/add \
  -H "Content-Type: application/json" \
  -d '{"a": 2, "b": 3}'
# {"result":5}
```

### Subtract

```bash
curl -s -X POST http://localhost:5001/api/v1/subtract \
  -H "Content-Type: application/json" \
  -d '{"a": 5, "b": 3}'
```

### Multiply

```bash
curl -s -X POST http://localhost:5001/api/v1/multiply \
  -H "Content-Type: application/json" \
  -d '{"a": 4, "b": 3}'
```

### Divide

```bash
curl -s -X POST http://localhost:5001/api/v1/divide \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 2}'
```

### Power

```bash
curl -s -X POST http://localhost:5001/api/v1/power \
  -H "Content-Type: application/json" \
  -d '{"a": 2, "b": 8}'
```

### Square root

```bash
curl -s -X POST http://localhost:5001/api/v1/sqrt \
  -H "Content-Type: application/json" \
  -d '{"a": 16}'
```

### Percentage (a% of b)

```bash
curl -s -X POST http://localhost:5001/api/v1/percentage \
  -H "Content-Type: application/json" \
  -d '{"a": 20, "b": 150}'
# {"result":30}
```

### Health check

```bash
curl -s http://localhost:5001/health
# {"status":"ok"}
```

### Error example (division by zero)

```bash
curl -s -X POST http://localhost:5001/api/v1/divide \
  -H "Content-Type: application/json" \
  -d '{"a": 10, "b": 0}'
# HTTP 422
# {"error":"division by zero","code":"DIVISION_BY_ZERO"}
```

## Tests & coverage

```bash
make test       # run all tests
make coverage   # generate coverage reports
```

- Backend: `backend/coverage.out` (after `make coverage`)
- Frontend: `frontend/coverage/` (Vitest lcov)
- CI uploads coverage artifacts on every push/PR to `main`

## Design decisions (summary)

| Area | Decision |
|------|----------|
| API | Per-operation `POST /api/v1/*` endpoints |
| Backend | Go stdlib `net/http`, pure calculator functions, sentinel errors |
| Frontend | React + `useCalculator` hook, CSS Modules, `ApiError` client |
| Docker | nginx frontend (:8080) proxies `/api/` to Go backend (:5001) |
| CI | Parallel jobs, coverage artifacts, no threshold gate |

See [docs/adr/](docs/adr/) for detailed rationale.

## Project structure

```
backend/          Go REST API
frontend/         React SPA
docs/             Plan, C4 diagrams, ADRs
.github/          CI workflow
docker-compose.yml
Makefile
```

## Assumptions

- Percentage means **a% of b** → `(a / 100) * b`
- Floating-point results use JSON numbers (IEEE 754 double precision)
- No authentication required (calculator demo scope)
