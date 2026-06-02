# PROMPTS.md

AI prompts used during development (Sezzle take-home deliverable).

## Prompt 1 — Planning & grill session

**Date:** 2026-06-02

**Prompt:**

> Build a full-stack calculator application with React frontend and Go backend microservice… Can you grill me on it? Let's use our skills to come up with a plan. We can use C4 model as a way to document the project, update the README.md file, create a PROMPTS.md where we can track prompts we used, update the .gitignore, and so on.

**Outcome:** Created implementation plan via structured grill sessions covering API shape, frontend styling, state management, API client errors, Go handler structure, Docker/nginx ports, CI coverage, and logging. Decisions captured in `docs/PLAN.md` and `docs/adr/`.

## Prompt 2 — Implementation

**Date:** 2026-06-02

**Prompt:**

> go ahead and implement it.

**Outcome:** Scaffolded backend (Go calculator domain, handlers, middleware), frontend (Vite/React, useCalculator hook, CSS Modules UI), Docker compose, GitHub Actions CI, and full documentation.
