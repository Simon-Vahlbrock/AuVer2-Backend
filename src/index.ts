import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import labelRoutes from './routes/labelRoutes';

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/labels', labelRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
