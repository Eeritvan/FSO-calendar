package users

import "fmt"

var (
	ErrInvalidPassword = fmt.Errorf("password must be at least 8 characters long")
	ErrInvalidUsername = fmt.Errorf("username must be at least 3 characters long")
	ErrUserExists      = fmt.Errorf("username already exists")
)

func ValidateUserInput(username string, password string) error {
	if len(username) < 3 {
		return ErrInvalidUsername
	}
	if len(password) < 8 {
		return ErrInvalidPassword
	}
	return nil
}
