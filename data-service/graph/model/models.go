package model

import "time"

type Event struct {
	ID    string    `json:"id"`
	Title string    `json:"title"`
	User  string    `json:"user"`
	Date  time.Time `json:"date"`
}

type Range struct {
	Start time.Time `json:"start"`
	End   time.Time `json:"end"`
} 