CREATE TABLE events (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT NOT NULL,
    description TEXT,
    start_time  TIMESTAMP WITH TIME ZONE NOT NULL,
    end_time    TIMESTAMP WITH TIME ZONE NOT NULL
);