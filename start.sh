#!/bin/bash

echo "🚀 Starting BAYG Spin Draw System for Replit..."

# Kill any existing node processes
pkill -f node || true

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install

# Generate Prisma client
echo "🔄 Generating Prisma client..."
npx prisma generate

# Run migrations (use db push for Replit)
echo "📊 Setting up database..."
npx prisma db push --force-reset || npx prisma migrate deploy

# Start backend in background
echo "🖥️  Starting backend server on 0.0.0.0:4000..."
PORT=4000 HOST=0.0.0.0 npm run dev &
BACKEND_PID=$!

# Give backend time to start
sleep 3

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

# Start frontend
echo "🌐 Starting frontend server on 0.0.0.0:3000..."
npm run dev &
FRONTEND_PID=$!

# Wait a moment for frontend to start
sleep 3

echo ""
echo "✅ BAYG Spin Draw System is running!"
echo "==============================================="
echo "📍 Frontend (Main): http://0.0.0.0:3000"
echo "📍 Backend API: http://0.0.0.0:4000"
echo "📍 Admin Panel: http://0.0.0.0:3000/admin"
echo "📍 Live Preview: http://0.0.0.0:3000/live"
echo "==============================================="
echo ""
echo "🔗 Replit will show the webview automatically"
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
