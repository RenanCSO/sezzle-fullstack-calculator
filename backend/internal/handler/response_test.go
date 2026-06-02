package handler

import (
	"errors"
	"net/http"
	"testing"

	"github.com/RenanCSO/sezzle-fullstack-calculator/backend/internal/calculator"
)

func TestMapCalculatorError(t *testing.T) {
	status, code, message := mapCalculatorError(calculator.ErrDivisionByZero)
	if status != http.StatusUnprocessableEntity || code != "DIVISION_BY_ZERO" || message != "division by zero" {
		t.Fatalf("unexpected mapping for division by zero: %d %s %s", status, code, message)
	}

	status, code, _ = mapCalculatorError(calculator.ErrInvalidOperand)
	if status != http.StatusBadRequest || code != "INVALID_OPERAND" {
		t.Fatalf("unexpected mapping for invalid operand: %d %s", status, code)
	}

	status, code, _ = mapCalculatorError(errors.New("unknown"))
	if status != http.StatusInternalServerError || code != "INTERNAL_ERROR" {
		t.Fatalf("unexpected mapping for unknown error: %d %s", status, code)
	}
}
