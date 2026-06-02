package calculator

import "errors"

var (
	ErrDivisionByZero = errors.New("division by zero")
	ErrInvalidOperand = errors.New("invalid operand")
)
