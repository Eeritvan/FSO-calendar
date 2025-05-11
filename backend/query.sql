-- name: CreateEvent :one
INSERT INTO events (name, description, start_time, end_time)
VALUES ($1, $2, $3, $4)
RETURNING id, name, description, start_time, end_time;

-- name: UpdateEvent :one
UPDATE events
SET name = COALESCE(sqlc.narg('name'), name),
    description = COALESCE(sqlc.narg('description'), description),
    start_time = COALESCE(sqlc.narg('start_time'), start_time),
    end_time = COALESCE(sqlc.narg('end_time'), end_time)
WHERE id = $1
RETURNING id, name, description, start_time, end_time;

-- name: DeleteEvent :exec
DELETE FROM events
WHERE id = $1;

-- name: ListEvents :many
SELECT id, name, description, start_time, end_time
FROM events;
