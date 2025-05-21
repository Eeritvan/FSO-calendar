package db

import (
	"context"
	"encoding/json"
	"log"
	"os"
	"time"

	sqlc "github.com/eeritvan/calendar/internal/sqlc"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type Event struct {
	ID          uuid.UUID `json:"id"`
	Name        string    `json:"name"`
	Description *string   `json:"description,omitempty"`
	StartTime   time.Time `json:"start_time"`
	EndTime     time.Time `json:"end_time"`
}

type EventNotification struct {
	Type   string `json:"type"`
	Table  string `json:"table"`
	Action string `json:"action"`
	Data   Event  `json:"data"`
}

type DBService struct {
	Queries      *sqlc.Queries
	Conn         *pgx.Conn
	ListenerConn *pgx.Conn
}

func ConnectToDB(ctx context.Context) (*DBService, error) {
	dbUrl := os.Getenv("DB_URL")

	conn, err := pgx.Connect(ctx, dbUrl)
	if err != nil {
		log.Fatalln("Connection to db failed:", err)
		return nil, err
	}

	listenerConn, err := pgx.Connect(ctx, dbUrl)
	if err != nil {
		log.Fatalln("Listener connection to db failed:", err)
		if err := conn.Close(ctx); err != nil {
			log.Fatalln("Failed to close connection:", err)
		}
		return nil, err
	}

	queries := sqlc.New(conn)

	// initialize schema
	sqlFile, err := os.ReadFile("./schema.sql")
	if err != nil {
		return nil, err
	}
	_, err = conn.Exec(ctx, string(sqlFile))
	if err != nil {
		return nil, err
	}

	return &DBService{
		Queries:      queries,
		Conn:         conn,
		ListenerConn: listenerConn,
	}, nil
}

func (s *DBService) Listen(ctx context.Context, channel string, callback func(EventNotification)) error {
	_, err := s.ListenerConn.Exec(ctx, "LISTEN "+channel)
	if err != nil {
		return err
	}

	go func() {
		for {
			notification, err := s.ListenerConn.WaitForNotification(ctx)
			if err != nil {
				log.Printf("Error waiting for notification: %v", err)
				return
			}
			var eventNotification EventNotification
			if err := json.Unmarshal([]byte(notification.Payload), &eventNotification); err != nil {
				log.Printf("Error unmarshaling notification payload: %v", err)
				continue
			}

			eventNotification.Data.StartTime = eventNotification.Data.StartTime.Local()
			eventNotification.Data.EndTime = eventNotification.Data.EndTime.Local()

			callback(eventNotification)
		}
	}()

	return nil
}
