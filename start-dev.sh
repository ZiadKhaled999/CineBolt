#!/bin/bash

echo "Killing existing Node processes..."
pkill -f node || true
pkill -f tsx || true

echo "Waiting for processes to close..."
sleep 2

echo "Starting server..."
npm run dev &

echo "Waiting for server to start..."
sleep 3

echo "Starting client..."
cd client && npm run dev 