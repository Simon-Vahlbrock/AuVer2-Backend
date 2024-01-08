import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import userRoutes from './routes/userRoutes';
import labelRoutes from './routes/labelRoutes';
import boardRoutes from './routes/boardRoutes';
import taskRoutes from './routes/taskRoutes';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/labels', labelRoutes);
app.use('/boards', boardRoutes);
app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
