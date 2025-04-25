package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/eeritvan/calendar/graph"
	"github.com/eeritvan/calendar/internal/db"
	"github.com/joho/godotenv"
	"github.com/vektah/gqlparser/v2/ast"
)

const defaultPort = "8081"

func healthCheck(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
	if _, err := w.Write([]byte("ok")); err != nil {
		// todo: better error handling
		log.Print("health check failed")
	}
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Printf("Error loading .env file: %v", err)
	}

	ctx := context.Background()

	DB := db.ConnectToDB(ctx)
	if DB != nil {
		if err := db.CheckForTable(DB, ctx); err != nil {
			log.Fatalf("Checking for table failed: %v", err)
		}
		defer func() {
			if err := DB.Close(ctx); err != nil {
				// todo: better error handling
				log.Printf("%v", err)
			}
		}()
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	srv := handler.New(graph.NewExecutableSchema(graph.Config{
		Resolvers: &graph.Resolver{
			DB: DB,
		},
	}))

	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	http.Handle("/healthz", http.HandlerFunc(healthCheck))
	http.Handle("/query", srv)

	log.Fatal(http.ListenAndServe(":"+port, nil))
}
