CREATE TABLE IF NOT EXISTS recipes
(
    id serial PRIMARY KEY,
    title text NOT NULL,
    description text NOT NULL
)