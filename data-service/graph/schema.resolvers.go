package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.
// Code generated by github.com/99designs/gqlgen version v0.17.63

import (
	"context"
	"data-service/graph/model"
	"fmt"

	"github.com/google/uuid"
)

// CreateEvent is the resolver for the createEvent field.
func (r *mutationResolver) CreateEvent(ctx context.Context, input model.NewEvent) (*model.Event, error) {
	event := &model.Event{
		ID:    "example-event-id-123",
		Title: input.Title,
		Date:  input.Date,
		User:  uuid.New(),
	}
	r.eventsList = append(r.eventsList, event)

	return event, nil
}

// Events is the resolver for the events field.
func (r *queryResolver) Events(ctx context.Context) ([]*model.Event, error) {
	return r.eventsList, nil
}

// EventsRange is the resolver for the eventsRange field.
func (r *queryResolver) EventsRange(ctx context.Context, input *model.Range) ([]*model.Event, error) {
	fmt.Println(input.Start)
	fmt.Println(input.End)

	for index, item := range r.eventsList {
		fmt.Println(index, item.Date)
	}

	return nil, nil
}

// Mutation returns MutationResolver implementation.
func (r *Resolver) Mutation() MutationResolver { return &mutationResolver{r} }

// Query returns QueryResolver implementation.
func (r *Resolver) Query() QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
