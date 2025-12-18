#!/bin/bash

echo "Starting Mobile Recharge Application..."
echo ""

echo "Installing dependencies..."
npm run install-all

echo ""
echo "Starting development servers..."
echo "Backend will run on http://localhost:3001"
echo "Frontend will run on http://localhost:5173"
echo ""

# Start backend in background
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "Both servers are running..."
echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user interrupt
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait