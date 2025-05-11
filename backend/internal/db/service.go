package db

import (
	"context"
	"log"
	"os"

	db "github.com/eeritvan/calendar/internal/db/sqlc"
	"github.com/jackc/pgx/v5"
)

func ConnectToDB(ctx context.Context) (*db.Queries, *pgx.Conn, error) {
	dbUrl := os.Getenv("DB_URL")
	conn, err := pgx.Connect(ctx, dbUrl)
	if err != nil {
		log.Fatalln("Connection to db failed:", err)
		return nil, nil, err
	}
	log.Println("Successfully connected to database")

	queries := db.New(conn)

	// initialize schema
	sqlFile, err := os.ReadFile("./schema.sql")
	if err != nil {
		return nil, nil, err
	}
	_, err = conn.Exec(ctx, string(sqlFile))
	if err != nil {
		return nil, nil, err
	}

	return queries, conn, nil
}
