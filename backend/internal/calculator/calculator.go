package calculator

import "math"

func Add(a, b float64) (float64, error) {
	return a + b, nil
}

func Subtract(a, b float64) (float64, error) {
	return a - b, nil
}

func Multiply(a, b float64) (float64, error) {
	return a * b, nil
}

func Divide(a, b float64) (float64, error) {
	if b == 0 {
		return 0, ErrDivisionByZero
	}
	return a / b, nil
}

func Power(a, b float64) (float64, error) {
	return math.Pow(a, b), nil
}

func Sqrt(a float64) (float64, error) {
	if a < 0 {
		return 0, ErrInvalidOperand
	}
	return math.Sqrt(a), nil
}

// Percentage computes a% of b: (a / 100) * b.
func Percentage(a, b float64) (float64, error) {
	return (a / 100) * b, nil
}
