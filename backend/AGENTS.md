# AGENTS.md — Backend

## Layout

```
internal/calculator/   pure functions + sentinel errors
internal/handler/      single Handler struct, JSON helpers
internal/middleware/   CORS, slog request logging
cmd/server/            route wiring
```

## Rules

- Router: stdlib `net/http.ServeMux` only — no chi/gin
- Domain must not import `net/http`
- Table-driven tests on calculator; `httptest` for handlers
- Error codes: `DIVISION_BY_ZERO`, `INVALID_OPERAND`, `INVALID_REQUEST`
- Logging: `middleware/logging.go` with `log/slog` — no Prometheus/metrics

## Commands

```bash
go test ./...                          # from backend/
go run ./cmd/server                    # listens on :8080
```
