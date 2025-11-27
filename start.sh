#!/bin/bash

echo "🚀 Starting BAYG Spin Draw System..."

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Run migrations
echo "📊 Running database migrations..."
npx prisma migrate deploy || npx prisma db push

# Start backend in background
echo "🖥️  Starting backend server..."
npm run dev &
BACKEND_PID=$!

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Start frontend
echo "🌐 Starting frontend server..."
npm run dev &
FRONTEND_PID=$!

# Wait for both processes
echo "✅ Both servers are running!"
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend: http://localhost:4000"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
