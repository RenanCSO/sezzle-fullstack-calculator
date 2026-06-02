package main

import (
	"log"
	"net/http"

	"github.com/RenanCSO/sezzle-fullstack-calculator/backend/internal/handler"
	"github.com/RenanCSO/sezzle-fullstack-calculator/backend/internal/middleware"
)

func main() {
	h := &handler.Handler{}
	mux := http.NewServeMux()

	mux.HandleFunc("GET /health", h.Health)
	mux.HandleFunc("POST /api/v1/add", h.Add)
	mux.HandleFunc("POST /api/v1/subtract", h.Subtract)
	mux.HandleFunc("POST /api/v1/multiply", h.Multiply)
	mux.HandleFunc("POST /api/v1/divide", h.Divide)
	mux.HandleFunc("POST /api/v1/power", h.Power)
	mux.HandleFunc("POST /api/v1/sqrt", h.Sqrt)
	mux.HandleFunc("POST /api/v1/percentage", h.Percentage)

	addr := ":8080"
	log.Printf("listening on %s", addr)
	if err := http.ListenAndServe(addr, middleware.Logging(middleware.CORS(mux))); err != nil {
		log.Fatal(err)
	}
}
