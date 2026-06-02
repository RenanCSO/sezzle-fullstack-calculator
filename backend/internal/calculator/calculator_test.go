package calculator

import (
	"errors"
	"math"
	"testing"
)

func TestAdd(t *testing.T) {
	got, err := Add(2, 3)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 5 {
		t.Fatalf("got %v, want 5", got)
	}
}

func TestSubtract(t *testing.T) {
	got, err := Subtract(5, 3)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 2 {
		t.Fatalf("got %v, want 2", got)
	}
}

func TestMultiply(t *testing.T) {
	got, err := Multiply(4, 3)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 12 {
		t.Fatalf("got %v, want 12", got)
	}
}

func TestDivide(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		got, err := Divide(10, 2)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if got != 5 {
			t.Fatalf("got %v, want 5", got)
		}
	})

	t.Run("division by zero", func(t *testing.T) {
		_, err := Divide(10, 0)
		if !errors.Is(err, ErrDivisionByZero) {
			t.Fatalf("got error %v, want ErrDivisionByZero", err)
		}
	})
}

func TestPower(t *testing.T) {
	got, err := Power(2, 8)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if got != 256 {
		t.Fatalf("got %v, want 256", got)
	}
}

func TestSqrt(t *testing.T) {
	t.Run("success", func(t *testing.T) {
		got, err := Sqrt(16)
		if err != nil {
			t.Fatalf("unexpected error: %v", err)
		}
		if got != 4 {
			t.Fatalf("got %v, want 4", got)
		}
	})

	t.Run("negative operand", func(t *testing.T) {
		_, err := Sqrt(-1)
		if !errors.Is(err, ErrInvalidOperand) {
			t.Fatalf("got error %v, want ErrInvalidOperand", err)
		}
	})
}

func TestPercentage(t *testing.T) {
	got, err := Percentage(20, 150)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}
	if math.Abs(got-30) > 1e-9 {
		t.Fatalf("got %v, want 30", got)
	}
}
