package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

type Event struct {
	ID          int    `json:"id"`
	Date        string `json:"date"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

func main() {
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:5173/",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	calendarEvents := []Event{
		{ID: 1, Date: "2023-10-01", Title: "Event 1", Description: "Description for Event 1"},
		{ID: 2, Date: "2023-10-02", Title: "Event 2", Description: "Description for Event 2"},
	}

	app.Get("/", func(c *fiber.Ctx) error {
		return c.JSON(calendarEvents)
	})

	app.Listen(":3000")
}
