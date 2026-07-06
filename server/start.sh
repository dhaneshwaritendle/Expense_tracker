#!/bin/bash

# Exit immediately if any command fails
set -e

echo " [STARTUP] Starting deployment lifecycle..."

# Step 1: Run Prisma Migrations
echo " [DATABASE] Running Prisma database migrations..."
if npx prisma migrate deploy; then
    echo " [DATABASE] Migrations applied successfully."
else
    echo " [DATABASE] Migration failed!"
    exit 1
fi

# Step 2: Generate Prisma Client (Good safety fallback for production)
echo "  [PRISMA] Generating Prisma client..."
npx prisma generate
echo " [PRISMA] Client generated successfully."

# Step 3: Boot Server
echo " [SERVER] Booting up Express application..."
exec npm start
