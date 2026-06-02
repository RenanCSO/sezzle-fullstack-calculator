.PHONY: dev-backend dev-frontend test coverage docker-up docker-down

dev-backend:
	cd backend && go run ./cmd/server

dev-frontend:
	cd frontend && VITE_API_URL=http://localhost:8080 npm run dev

test:
	cd backend && go test ./...
	cd frontend && npm test

coverage:
	cd backend && go test ./... -coverprofile=coverage.out
	cd frontend && npm test -- --coverage

docker-up:
	docker compose up --build

docker-down:
	docker compose down
