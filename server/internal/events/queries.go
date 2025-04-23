package events

import (
	"context"
	"log"

	"github.com/eeritvan/calendar-server/graph/model"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgconn"
)

type DBConnection interface {
	QueryRow(ctx context.Context, query string, args ...any) pgx.Row
	Exec(ctx context.Context, query string, args ...any) (pgconn.CommandTag, error)
	Query(ctx context.Context, query string, args ...any) (pgx.Rows, error)
}

func DB_CreateEvent(ctx context.Context, db DBConnection, input model.EventInput) (*model.Event, error) {
	var event model.Event
	if err := db.QueryRow(ctx, `
		INSERT INTO events (name, description, start_time, end_time)
		VALUES ($1, $2, $3, $4)
		RETURNING id, name, description, start_time, end_time
	`, input.Name, input.Description, input.StartTime, input.EndTime).Scan(
		&event.ID,
		&event.Name,
		&event.Description,
		&event.StartTime,
		&event.EndTime,
	); err != nil {
		log.Printf("%v", err)
		// todo: better error handling
		return nil, err
	}

	return &event, nil
}

func DB_UpdateEvent(ctx context.Context, db DBConnection, id uuid.UUID, input model.UpdateEventInput) (*model.Event, error) {
	var updatedEvent model.Event
	if err := db.QueryRow(ctx, `
        UPDATE events
        SET name = COALESCE($2, name),
			description = COALESCE($3, description),
			start_time = COALESCE($4, start_time),
			end_time = COALESCE($5, end_time)
        WHERE id = $1
		RETURNING id, name, description, start_time, end_time
	`, id, input.Name, input.Description, input.StartTime, input.EndTime).Scan(
		&updatedEvent.ID,
		&updatedEvent.Name,
		&updatedEvent.Description,
		&updatedEvent.StartTime,
		&updatedEvent.EndTime,
	); err != nil {
		log.Printf("%v", err)
		// todo: better error handling
		return nil, err
	}

	return &updatedEvent, nil
}

func DB_DeleteEvent(ctx context.Context, db DBConnection, id uuid.UUID) (bool, error) {
	if _, err := db.Exec(ctx, `
		DELETE FROM events
		WHERE id = $1
	`, id); err != nil {
		log.Printf("%v", err)
		return false, err
	}
	return true, nil
}

func DB_getAllEvents(ctx context.Context, db DBConnection) ([]*model.Event, error) {
	rows, err := db.Query(ctx, `
		SELECT id, name, description, start_time, end_time
		FROM events
	`)

	if err != nil {
		return nil, err
	}

	var events []*model.Event
	for rows.Next() {
		var event model.Event
		if err := rows.Scan(
			&event.ID,
			&event.Name,
			&event.Description,
			&event.StartTime,
			&event.EndTime,
		); err != nil {
			return nil, err
		}
		events = append(events, &event)
	}
	if err = rows.Err(); err != nil {
		// todo: better error handling
		return nil, err
	}

	return events, nil
}
