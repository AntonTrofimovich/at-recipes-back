UPDATE recipes
SET (title, description) = (${title}, ${description})
WHERE id = ${id}
RETURNING *