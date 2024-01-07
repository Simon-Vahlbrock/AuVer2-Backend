import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql';

const app = express();
const port = 3000;

app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'auver2_db',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
