package events

import (
	"context"
	"testing"
	"time"

	"github.com/eeritvan/calendar-server/graph/model"
	"github.com/google/uuid"
	"github.com/pashagolub/pgxmock/v4"
)

func pointer(s string) *string {
	return &s
}

func TestDB_CreateEvent(t *testing.T) {
	mockDB, err := pgxmock.NewConn()
	if err != nil {
		t.Fatalf("failed to create mock: %v", err)
	}
	defer mockDB.Close(context.Background())

	startTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05Z")
	endTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:07:05Z")
	randomUUID, _ := uuid.NewRandom()

	tests := []struct {
		name    string
		input   model.EventInput
		mockFn  func()
		want    *model.Event
		wantErr error
	}{
		{
			name: "event can be successfully created with description",
			input: model.EventInput{
				Name:        "testName",
				Description: pointer("testDesc"),
				StartTime:   startTime,
				EndTime:     endTime,
			},
			mockFn: func() {
				rows := pgxmock.NewRows([]string{"id", "name", "description", "start_time", "end_time"}).
					AddRow(
						randomUUID,
						"testName",
						pointer("testDesc"),
						startTime,
						endTime,
					)
				mockDB.ExpectQuery("INSERT INTO events \\(name, description, start_time, end_time\\) VALUES \\(\\$1, \\$2, \\$3, \\$4\\) RETURNING id, name, description, start_time, end_time").
					WithArgs("testName", pointer("testDesc"), startTime, endTime).
					WillReturnRows(rows)
			},
			want: &model.Event{
				ID:          randomUUID,
				Name:        "testName",
				Description: pointer("testDesc"),
				StartTime:   startTime,
				EndTime:     endTime,
			},
			wantErr: nil,
		},
		{
			name: "event can be successfully created without description",
			input: model.EventInput{
				Name:        "testName",
				Description: (*string)(nil),
				StartTime:   startTime,
				EndTime:     endTime,
			},
			mockFn: func() {
				rows := pgxmock.NewRows([]string{"id", "name", "description", "start_time", "end_time"}).
					AddRow(
						randomUUID,
						"testName",
						(*string)(nil),
						startTime,
						endTime,
					)
				mockDB.ExpectQuery("INSERT INTO events \\(name, description, start_time, end_time\\) VALUES \\(\\$1, \\$2, \\$3, \\$4\\) RETURNING id, name, description, start_time, end_time").
					WithArgs("testName", (*string)(nil), startTime, endTime).
					WillReturnRows(rows)
			},
			want: &model.Event{
				ID:          randomUUID,
				Name:        "testName",
				Description: (*string)(nil),
				StartTime:   startTime,
				EndTime:     endTime,
			},
			wantErr: nil,
		},

		// todo: test errors
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.mockFn()

			result, err := DB_CreateEvent(context.Background(), mockDB, tt.input)
			if err != tt.wantErr {
				t.Errorf("DB_CreateEvent() failed: %v, want %v", err, tt.want)
			}

			if result != nil && tt.want != nil {
				if (result.ID != tt.want.ID) || (result.Name != tt.want.Name) || (result.StartTime != tt.want.StartTime) || (result.EndTime != tt.want.EndTime) {
					t.Errorf("DB_CreateEvent() failed: %v, want %v", result, tt.want)
				}
				if (result.Description == nil) != (tt.want.Description == nil) || (result.Description != nil && *result.Description != *tt.want.Description) {
					t.Errorf("DB_CreateEvent() failed: %v, want %v", result.Description, tt.want.Description)
				}
			}
		})
	}
}

func TestDB_UpdateEvent(t *testing.T) {
	mockDB, err := pgxmock.NewConn()
	if err != nil {
		t.Fatalf("failed to create mock: %v", err)
	}
	defer mockDB.Close(context.Background())

	startTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05Z")
	endTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:07:05Z")

	var startTimePtr *time.Time = nil
	var endTimePtr *time.Time = nil

	randomUUID, _ := uuid.NewRandom()

	tests := []struct {
		name    string
		id      uuid.UUID
		input   model.UpdateEventInput
		mockFn  func()
		want    *model.Event
		wantErr error
	}{
		{
			name: "event can be successfully updated",
			id:   randomUUID,
			input: model.UpdateEventInput{
				Name:        pointer("newName"),
				Description: pointer("newDesc"),
				StartTime:   startTimePtr,
				EndTime:     endTimePtr,
			},
			mockFn: func() {
				rows := pgxmock.NewRows([]string{"id", "name", "description", "start_time", "end_time"}).
					AddRow(
						randomUUID,
						"newName",
						pointer("newDesc"),
						startTime,
						endTime,
					)
				mockDB.ExpectQuery("UPDATE events SET name = COALESCE\\(\\$2, name\\), description = COALESCE\\(\\$3, description\\), start_time = COALESCE\\(\\$4, start_time\\), end_time = COALESCE\\(\\$5, end_time\\) WHERE id = \\$1 RETURNING id, name, description, start_time, end_time").
					WithArgs(randomUUID, pointer("newName"), pointer("newDesc"), startTimePtr, endTimePtr).
					WillReturnRows(rows)
			},
			want: &model.Event{
				ID:          randomUUID,
				Name:        "newName",
				Description: pointer("newDesc"),
				StartTime:   startTime,
				EndTime:     endTime,
			},
			wantErr: nil,
		},

		// todo: test errors
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.mockFn()

			result, err := DB_UpdateEvent(context.Background(), mockDB, tt.id, tt.input)
			if err != tt.wantErr {
				t.Errorf("DB_UpdateEvent() failed: %v, want %v", err, tt.want)
			}

			if result != nil && tt.want != nil {
				if (result.ID != tt.want.ID) || (result.Name != tt.want.Name) || (result.StartTime != tt.want.StartTime) || (result.EndTime != tt.want.EndTime) {
					t.Errorf("DB_UpdateEvent() failed: %v, want %v", result, tt.want)
				}
				if (result.Description == nil) != (tt.want.Description == nil) || (result.Description != nil && *result.Description != *tt.want.Description) {
					t.Errorf("DB_UpdateEvent() failed: %v, want %v", result.Description, tt.want.Description)
				}
			}
		})
	}
}

func TestDB_DeleteEvent(t *testing.T) {
	mockDB, err := pgxmock.NewConn()
	if err != nil {
		t.Fatalf("failed to create mock: %v", err)
	}
	defer mockDB.Close(context.Background())

	randomUUID, _ := uuid.NewRandom()

	tests := []struct {
		name    string
		id      uuid.UUID
		mockFn  func()
		want    bool
		wantErr error
	}{
		{
			name: "event can be successfully deleted",
			id:   randomUUID,
			mockFn: func() {
				mockDB.ExpectExec("DELETE FROM events WHERE id = \\$1").
					WithArgs(randomUUID).
					WillReturnResult(pgxmock.NewResult("UPDATE", 1))
			},
			want:    true,
			wantErr: nil,
		},

		// todo: test errors
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.mockFn()

			result, err := DB_DeleteEvent(context.Background(), mockDB, tt.id)
			if err != tt.wantErr {
				t.Errorf("DB_DeleteEvent() failed: %v, want %v", err, tt.want)
			}

			if result != tt.want {
				t.Errorf("DB_DeleteEvent() failed: %v, want %v", err, tt.want)
			}
		})
	}
}

func TestDB_getAllEvents(t *testing.T) {
	mockDB, err := pgxmock.NewConn()
	if err != nil {
		t.Fatalf("failed to create mock: %v", err)
	}
	defer mockDB.Close(context.Background())

	firstStartTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:04:05Z")
	firstEndTime, _ := time.Parse(time.RFC3339, "2006-01-02T15:07:05Z")

	secondStartTime, _ := time.Parse(time.RFC3339, "2007-01-02T15:04:05Z")
	secondEndTime, _ := time.Parse(time.RFC3339, "2007-02-02T15:07:05Z")

	firstUUID, _ := uuid.NewRandom()
	secondUUID, _ := uuid.NewRandom()

	tests := []struct {
		name    string
		mockFn  func()
		want    []model.Event
		wantErr error
	}{
		{
			name: "events can be successfully fetched with 2 items in it",
			mockFn: func() {
				rows := pgxmock.NewRows([]string{"id", "name", "description", "start_time", "end_time"}).
					AddRow(
						firstUUID,
						"testName",
						pointer("testDesc"),
						firstStartTime,
						firstEndTime,
					).
					AddRow(
						secondUUID,
						"testName2",
						pointer("testDesc2"),
						secondStartTime,
						secondEndTime,
					)
				mockDB.ExpectQuery("SELECT id, name, description, start_time, end_time FROM events").
					WillReturnRows(rows)
			},
			want: []model.Event{
				{
					ID:          firstUUID,
					Name:        "testName",
					Description: pointer("testDesc"),
					StartTime:   firstStartTime,
					EndTime:     firstEndTime,
				},
				{
					ID:          secondUUID,
					Name:        "testName2",
					Description: pointer("testDesc2"),
					StartTime:   secondStartTime,
					EndTime:     secondEndTime,
				},
			},
			wantErr: nil,
		},

		// todo: test errors
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			tt.mockFn()

			results, err := DB_getAllEvents(context.Background(), mockDB)
			if err != tt.wantErr {
				t.Errorf("DB_getAllEvents() failed: %v, want %v", err, tt.want)
			}

			if len(results) != len(tt.want) {
				t.Errorf("DB_getAllEvents() failed: incorrect length: %v, want %v", len(results), len(tt.want))
			}

			for i, result := range results {
				want := tt.want[i]

				if (result.ID != want.ID) || (result.Name != want.Name) || (result.StartTime != want.StartTime) || (result.EndTime != want.EndTime) {
					t.Errorf("DB_getAllEvents() failed: %v, want %v", result, want)
				}
				if (result.Description == nil) != (want.Description == nil) || (result.Description != nil && *result.Description != *want.Description) {
					t.Errorf("DB_getAllEvents() failed: %v, want %v", result.Description, want.Description)
				}
			}
		})
	}
}
