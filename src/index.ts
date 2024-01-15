import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import labelRoutes from './routes/labelRoutes';
import boardRoutes from './routes/boardRoutes';
import taskRoutes from './routes/taskRoutes';
import http from 'http';
import { Server } from 'socket.io';
import historyRoutes from './routes/historyRoutes';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
    },
});

const port = 3000;

app.use(cors());
app.use(bodyParser.json());

export const sendDataToClients = <T>(event: string, data: T) => {
    io.emit(event, data);
};


app.use('/users', userRoutes);
app.use('/labels', labelRoutes);
app.use('/boards', boardRoutes);
app.use('/tasks', taskRoutes);
app.use('/history', historyRoutes);

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
