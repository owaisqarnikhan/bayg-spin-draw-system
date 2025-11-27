import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import employeeRoutes from './routes/employeeRoutes';
import spinRoutes from './routes/spinRoutes';

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

app.use((req: any, res, next) => {
    req.io = io;
    next();
});

app.use('/api/employees', employeeRoutes);
app.use('/api/spin', spinRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Spin Draw System Backend is Running');
});

// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { io };
