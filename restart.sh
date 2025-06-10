#!/bin/bash

# Kill any existing node processes
killall node 2>/dev/null

# Wait a moment for processes to close
sleep 2

# Start the development server
npm run dev 