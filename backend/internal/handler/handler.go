package handler

import (
	"encoding/json"
	"net/http"

	"github.com/RenanCSO/sezzle-fullstack-calculator/backend/internal/calculator"
)

type Handler struct{}

type binaryRequest struct {
	A float64 `json:"a"`
	B float64 `json:"b"`
}

type unaryRequest struct {
	A float64 `json:"a"`
}

func (h *Handler) Health(w http.ResponseWriter, _ *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
}

func (h *Handler) Add(w http.ResponseWriter, r *http.Request) {
	h.handleBinary(w, r, calculator.Add)
}

func (h *Handler) Subtract(w http.ResponseWriter, r *http.Request) {
	h.handleBinary(w, r, calculator.Subtract)
}

func (h *Handler) Multiply(w http.ResponseWriter, r *http.Request) {
	h.handleBinary(w, r, calculator.Multiply)
}

func (h *Handler) Divide(w http.ResponseWriter, r *http.Request) {
	h.handleBinary(w, r, calculator.Divide)
}

func (h *Handler) Power(w http.ResponseWriter, r *http.Request) {
	h.handleBinary(w, r, calculator.Power)
}

func (h *Handler) Percentage(w http.ResponseWriter, r *http.Request) {
	h.handleBinary(w, r, calculator.Percentage)
}

func (h *Handler) Sqrt(w http.ResponseWriter, r *http.Request) {
	h.handleUnary(w, r, calculator.Sqrt)
}

func (h *Handler) handleBinary(w http.ResponseWriter, r *http.Request, op func(float64, float64) (float64, error)) {
	var req binaryRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "INVALID_REQUEST", "invalid request body")
		return
	}

	result, err := op(req.A, req.B)
	if err != nil {
		status, code, message := mapCalculatorError(err)
		writeError(w, status, code, message)
		return
	}

	writeJSON(w, http.StatusOK, resultResponse{Result: result})
}

func (h *Handler) handleUnary(w http.ResponseWriter, r *http.Request, op func(float64) (float64, error)) {
	var req unaryRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeError(w, http.StatusBadRequest, "INVALID_REQUEST", "invalid request body")
		return
	}

	result, err := op(req.A)
	if err != nil {
		status, code, message := mapCalculatorError(err)
		writeError(w, status, code, message)
		return
	}

	writeJSON(w, http.StatusOK, resultResponse{Result: result})
}
