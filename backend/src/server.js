// BAYG Spin Draw System Backend
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.io = io;
  next();
});

const employeeRoutes = require('./routes/employeeRoutes');
const spinRoutes = require('./routes/spinRoutes');

app.use('/api/employees', employeeRoutes);
app.use('/api/spin', spinRoutes);

// Basic Route
app.get('/', (req, res) => {
  res.send('Spin Draw System Backend is Running');
});

// Socket.io connection
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
  });
});

const PORT = process.env.PORT || 4000;
const HOST = process.env.HOST || '0.0.0.0';

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
