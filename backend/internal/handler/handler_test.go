package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestAddReturnsResult(t *testing.T) {
	h := &Handler{}
	req := httptest.NewRequest(http.MethodPost, "/api/v1/add", bytes.NewBufferString(`{"a":2,"b":3}`))
	rec := httptest.NewRecorder()

	h.Add(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status %d, want 200", rec.Code)
	}

	var resp resultResponse
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if resp.Result != 5 {
		t.Fatalf("result %v, want 5", resp.Result)
	}
}

func TestPercentageReturnsResult(t *testing.T) {
	h := &Handler{}
	req := httptest.NewRequest(http.MethodPost, "/api/v1/percentage", bytes.NewBufferString(`{"a":20,"b":150}`))
	rec := httptest.NewRecorder()

	h.Percentage(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status %d, want 200", rec.Code)
	}

	var resp resultResponse
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if resp.Result != 30 {
		t.Fatalf("result %v, want 30", resp.Result)
	}
}

func TestDivideByZeroReturnsErrorBody(t *testing.T) {
	h := &Handler{}
	req := httptest.NewRequest(http.MethodPost, "/api/v1/divide", bytes.NewBufferString(`{"a":10,"b":0}`))
	rec := httptest.NewRecorder()

	h.Divide(rec, req)

	if rec.Code != http.StatusUnprocessableEntity {
		t.Fatalf("status %d, want 422", rec.Code)
	}

	var resp errorResponse
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if resp.Code != "DIVISION_BY_ZERO" {
		t.Fatalf("code %q, want DIVISION_BY_ZERO", resp.Code)
	}
	if resp.Error != "division by zero" {
		t.Fatalf("error %q, want division by zero", resp.Error)
	}
}

func TestSqrtNegativeReturnsInvalidOperand(t *testing.T) {
	h := &Handler{}
	req := httptest.NewRequest(http.MethodPost, "/api/v1/sqrt", bytes.NewBufferString(`{"a":-1}`))
	rec := httptest.NewRecorder()

	h.Sqrt(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status %d, want 400", rec.Code)
	}

	var resp errorResponse
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if resp.Code != "INVALID_OPERAND" {
		t.Fatalf("code %q, want INVALID_OPERAND", resp.Code)
	}
}

func TestInvalidJSONReturnsInvalidRequest(t *testing.T) {
	h := &Handler{}
	req := httptest.NewRequest(http.MethodPost, "/api/v1/add", bytes.NewBufferString(`not json`))
	rec := httptest.NewRecorder()

	h.Add(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("status %d, want 400", rec.Code)
	}

	var resp errorResponse
	if err := json.NewDecoder(rec.Body).Decode(&resp); err != nil {
		t.Fatalf("decode response: %v", err)
	}
	if resp.Code != "INVALID_REQUEST" {
		t.Fatalf("code %q, want INVALID_REQUEST", resp.Code)
	}
}

func TestHealthReturnsOk(t *testing.T) {
	h := &Handler{}
	req := httptest.NewRequest(http.MethodGet, "/health", nil)
	rec := httptest.NewRecorder()

	h.Health(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status %d, want 200", rec.Code)
	}
}
