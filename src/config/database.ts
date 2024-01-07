// src/config/database.ts
import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'auver2_db',
    multipleStatements: true, // ToDo allow this for only creating the database
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
    } else {
        console.log('Connected to MySQL');
    }
});

// Update schema
const schema = `
    CREATE TABLE IF NOT EXISTS boards (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        userName VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        boardId INT,
        FOREIGN KEY (boardId) REFERENCES boards(id)
    );

    CREATE TABLE IF NOT EXISTS labels (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL,
        boardId INT,
        FOREIGN KEY (boardId) REFERENCES boards(id)
    );
`;

db.query(schema, (err) => {
    if (err) {
        console.error('Error creating tables:', err);
    } else {
        console.log('Tables created/updated successfully');
    }
});

export default db;
