package handler

import (
	"encoding/json"
	"errors"
	"net/http"

	"github.com/RenanCSO/sezzle-fullstack-calculator/backend/internal/calculator"
)

type errorResponse struct {
	Error string `json:"error"`
	Code  string `json:"code"`
}

type resultResponse struct {
	Result float64 `json:"result"`
}

func writeJSON(w http.ResponseWriter, status int, payload any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(payload)
}

func writeError(w http.ResponseWriter, status int, code, message string) {
	writeJSON(w, status, errorResponse{Error: message, Code: code})
}

func mapCalculatorError(err error) (int, string, string) {
	switch {
	case errors.Is(err, calculator.ErrDivisionByZero):
		return http.StatusUnprocessableEntity, "DIVISION_BY_ZERO", err.Error()
	case errors.Is(err, calculator.ErrInvalidOperand):
		return http.StatusBadRequest, "INVALID_OPERAND", err.Error()
	default:
		return http.StatusInternalServerError, "INTERNAL_ERROR", "unexpected error"
	}
}
