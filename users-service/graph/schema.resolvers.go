package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.63

import (
	"context"
	"users-service/graph/model"
	"users-service/internal/auth"
	"users-service/internal/users"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.UserCredentialsInputInput) (*model.LoginResponse, error) {
	if err := users.ValidateUserInput(input.Username, input.Password); err != nil {
		return nil, err
	}

	hashedPassword, err := auth.GeneratePasswordHash(input.Password)
	if err != nil {
		return nil, err
	}

	user, err := users.CreateUser(ctx, r.DB, input.Username, hashedPassword)
	if err != nil {
		return nil, err
	}

	token, err := auth.GenerateJWT(user.Username)
	if err != nil {
		return nil, err
	}

	return &model.LoginResponse{
		Username: user.Username,
		Token:    token,
	}, nil
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, input model.LoginInput) (*model.LoginResponse, error) {
	user, err := users.QueryUser(ctx, r.DB, input.Username)
	if err != nil {
		return nil, err
	}

	if err := auth.ValidatePassword(user.Password, input.Password); err != nil {
		return nil, err
	}

	if err := auth.ValidateTotp(user.Totp, input.Totp); err != nil {
		return nil, err
	}

	token, err := auth.GenerateJWT(user.Username)
	if err != nil {
		return nil, err
	}

	return &model.LoginResponse{
		Username: user.Username,
		Token:    token,
	}, nil
}

// ToggleTotp is the resolver for the toggleTotp field.
func (r *mutationResolver) ToggleTotp(ctx context.Context, input model.UserCredentialsInputInput) (bool, error) {
	user, err := users.QueryUser(ctx, r.DB, input.Username)
	if err != nil {
		return false, err
	}

	if *user.Totp == "" {
		if err := auth.ValidatePassword(user.Password, input.Password); err != nil {
			return false, err
		}

		totpSecret, err := auth.GenerateTotpKey(input.Username)
		if err != nil {
			return false, err
		}

		if users.UpdateUserTotp(ctx, r.DB, user.Username, totpSecret); err != nil {
			return false, err
		}
	} else {
		if users.UpdateUserTotp(ctx, r.DB, user.Username, ""); err != nil {
			return false, err
		}
	}

	return true, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

type mutationResolver struct{ *Resolver }
