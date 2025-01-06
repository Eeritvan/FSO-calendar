package users

import (
	"context"
	"fmt"
	"graphql/graph/model"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

func QueryUser(ctx context.Context, db *pgx.Conn, username string) (*model.User, error) {
	var user model.User
	err := db.QueryRow(ctx, `
		SELECT username, password_hash, COALESCE(totp, '')
		FROM users
		WHERE username = $1
	`, username).Scan(&user.Username, &user.Password, &user.Totp)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user information %v", err)
	}
	return &user, nil
}

func UpdateUserTotp(ctx context.Context, db *pgx.Conn, username string, totpSecret *string) error {
	_, err := db.Exec(ctx, `
        UPDATE users 
        SET totp = $2
        WHERE username = $1
	`, username, totpSecret)
	if err != nil {
		return fmt.Errorf("failed to update TOTP: %v", err)
	}
	return nil
}

func CreateUser(ctx context.Context, db *pgx.Conn, username string, password []byte) (*model.User, error) {
	var user model.User
	err := db.QueryRow(ctx, `
		INSERT INTO users (username, password_hash)
		VALUES ($1, $2)
		RETURNING id, username, password_hash, totp
	`, username, password).Scan(
		&user.ID,
		&user.Username,
		&user.Password,
		&user.Totp,
	)

	if err != nil {
		pgErr := err.(*pgconn.PgError)
		switch pgErr.Code {
		case "23505":
			return nil, ErrUserExists
		case "23514":
			return nil, ErrInvalidUsername
		default:
			return nil, fmt.Errorf("error creating user: %v", err)
		}
	}
	return &user, nil
}
