# C4 Level 2 — Containers

```mermaid
flowchart TB
  subgraph browser [Browser]
    user[User]
  end

  subgraph docker [Docker Compose]
    nginx[Frontend nginx :8080]
    goapi[Go API :5000 host / :8080 internal]
  end

  user -->|"http://localhost:8080"| nginx
  nginx -->|"proxy /api/"| goapi
  user -.->|"curl http://localhost:5000"| goapi
```

| Container | Technology | Port (host) |
|-----------|------------|-------------|
| Frontend | React SPA + nginx | 8080 |
| Backend | Go REST API | 5000 (direct), 8080 (internal) |

Local dev (no Docker): Vite on :5173 → Go on :8080.
