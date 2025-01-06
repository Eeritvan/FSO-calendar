package auth

import (
	"fmt"

	"golang.org/x/crypto/bcrypt"
)

func GeneratePasswordHash(password string) ([]byte, error) {
	hashedPassword, pwErr := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if pwErr != nil {
		return nil, fmt.Errorf("error hashing password: %v", pwErr)
	}
	return hashedPassword, nil
}

func ValidatePassword(hash string, password string) error {
	decryptErr := bcrypt.CompareHashAndPassword([]byte(hash), []byte(password))
	if decryptErr != nil {
		return fmt.Errorf("incorrect password")
	}
	return nil
}
