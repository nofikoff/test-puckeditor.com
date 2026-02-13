#!/bin/sh
set -e

echo "Running database migrations..."
npx prisma migrate deploy 2>&1 || echo "Warning: migrations failed or no migrations found"

echo "Starting application..."
exec "$@"
