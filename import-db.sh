#!/bin/bash
set -e

DUMP_FILE="${1:-dump.sql}"

if [ ! -f "$DUMP_FILE" ]; then
  echo "Error: dump file '$DUMP_FILE' not found"
  echo "Usage: ./import-db.sh [dump.sql]"
  exit 1
fi

echo "Waiting for PostgreSQL to be ready..."
until docker compose exec -T puckeditor-postgres pg_isready -U "${POSTGRES_USER:-puck}" -d "${POSTGRES_DB:-puck_cms}" > /dev/null 2>&1; do
  sleep 2
done
echo "PostgreSQL is ready."

echo "Clearing existing data..."
docker compose exec -T puckeditor-postgres psql -U "${POSTGRES_USER:-puck}" -d "${POSTGRES_DB:-puck_cms}" <<'SQL'
TRUNCATE TABLE "_PostCategories", "_PostTags", posts, pages, tags, categories, users CASCADE;
SQL

echo "Importing $DUMP_FILE..."
docker compose exec -T puckeditor-postgres psql -U "${POSTGRES_USER:-puck}" -d "${POSTGRES_DB:-puck_cms}" < "$DUMP_FILE"

echo "Done. Database cleared and imported successfully."
