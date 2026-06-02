# C4 Level 3 — Frontend Components

```mermaid
flowchart LR
  app[App] --> form[CalculatorForm]
  app --> hook[useCalculator]
  hook --> client[api/client.ts]
  client --> api[Go REST API]
```

| Component | Responsibility |
|-----------|----------------|
| `CalculatorForm` | Presentational UI — inputs, operation select, result/error |
| `useCalculator` | Form state, validation, submit orchestration |
| `api/client.ts` | Typed fetch wrapper, one function per operation |
| `api/errors.ts` | `ApiError` class for structured error handling |

Components do not call `fetch` directly.
