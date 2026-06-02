# ADR 0007: Docker deployment layout

## Status

Accepted (amended — API host port 5001 on macOS)

## Context

Frontend and backend need to communicate in Docker without CORS issues. macOS AirPlay Receiver commonly binds host port 5000.

## Decision

- Two services: Go backend + nginx frontend
- Host ports: app **8080**, direct API **5001** (5001 avoids macOS AirPlay on 5000)
- nginx proxies `/api/` to `backend:8080`
- Docker frontend build uses empty `VITE_API_URL` (relative paths)
- Multi-stage Dockerfiles: alpine (backend), nginx (frontend)

## Consequences

- Reviewer opens one URL for the app
- curl examples use port 5001
