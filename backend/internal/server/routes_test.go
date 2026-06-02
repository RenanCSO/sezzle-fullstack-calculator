package main

import (
	"bytes"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/RenanCSO/sezzle-fullstack-calculator/backend/internal/handler"
	"github.com/RenanCSO/sezzle-fullstack-calculator/backend/internal/middleware"
)

func TestServerRoutesAddCalculation(t *testing.T) {
	h := &handler.Handler{}
	mux := http.NewServeMux()
	mux.HandleFunc("POST /api/v1/add", h.Add)

	server := middleware.Logging(middleware.CORS(mux))

	req := httptest.NewRequest(http.MethodPost, "/api/v1/add", bytes.NewBufferString(`{"a":2,"b":3}`))
	rec := httptest.NewRecorder()
	server.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status %d, want 200", rec.Code)
	}
	if body := rec.Body.String(); body != "{\"result\":5}\n" {
		t.Fatalf("body %q, want {\"result\":5}", body)
	}
	if rec.Header().Get("Access-Control-Allow-Origin") != "*" {
		t.Fatalf("expected CORS header")
	}
}
