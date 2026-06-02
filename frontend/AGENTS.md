# AGENTS.md — Frontend

## Stack

Vite + React + TypeScript. Vitest + React Testing Library for tests.

## Layout

```
src/api/           client.ts (one function per operation), errors.ts
src/hooks/         useCalculator.ts — owns form state + submit
src/components/    CalculatorForm.tsx — presentational
src/styles/        tokens.css, global.css
```

## Rules

- CSS Modules + tokens from `src/styles/tokens.css` — no Tailwind, no UI libraries
- State: `useCalculator` hook owns form state; components stay presentational
- API calls only via `src/api/client.ts`; throws `ApiError`
- Operands stored as strings; validate in hook at submit time
- `VITE_API_URL` for local dev (`http://localhost:8080`); empty in Docker (relative paths)

## Commands

```bash
npm test           # from frontend/
npm run dev        # Vite on :5173
npm run build      # production build
```
