package auth

import (
	"fmt"

	"github.com/pquerna/otp/totp"
)

func GenerateTotpKey(username string) string {
	key, _ := totp.Generate(totp.GenerateOpts{
		Issuer:      "void",
		AccountName: username,
	})
	return key.Secret()
}

func ValidateTotp(userTotp *string, inputTotp *string) error {
	if *userTotp != "" {
		if inputTotp == nil {
			return fmt.Errorf("totp required")
		}
		if !totp.Validate(*inputTotp, *userTotp) {
			return fmt.Errorf("incorrect totp")
		}
	}
	return nil
}
