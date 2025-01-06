package auth

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

var (
	ErrPasswordHashingFail = fmt.Errorf("error hashing password")
	ErrIncorrectPassword   = fmt.Errorf("incorrect password")
)

func GeneratePasswordHash(password string) ([]byte, error) {
	hashedPassword, pwErr := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if pwErr != nil {
		return nil, ErrPasswordHashingFail
	}
	return hashedPassword, nil
}

func ValidatePassword(hash string, password string) error {
	decryptErr := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if decryptErr != nil {
		return ErrIncorrectPassword
	}
	return nil
}
