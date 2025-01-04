package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.62

import (
	"context"
	"fmt"
	"graphql/graph/model"

	"github.com/google/uuid"
	"github.com/pquerna/otp/totp"
)

// CreateUser is the resolver for the createUser field.
func (r *mutationResolver) CreateUser(ctx context.Context, input model.NewUserInput) (*model.User, error) {
	key, _ := totp.Generate(totp.GenerateOpts{
		AccountName: input.Username,
	})

	secret := key.Secret()
	user := &model.User{
		ID:       uuid.New(),
		Username: input.Username,
		Password: input.Password,
		Totp:     &secret,
	}

	r.UsersList = append(r.UsersList, user)
	return user, nil
}

// Login is the resolver for the login field.
func (r *mutationResolver) Login(ctx context.Context, input model.LoginInput) (bool, error) {
	panic(fmt.Errorf("not implemented: Login - login"))
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	return r.UsersList, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
