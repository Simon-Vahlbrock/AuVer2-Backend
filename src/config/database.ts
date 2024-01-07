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
    CREATE TABLE IF NOT EXISTS boards
    (
        id   INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users
    (
        userName VARCHAR(255) PRIMARY KEY NOT NULL,
        password VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS labels
    (
        id    INT PRIMARY KEY AUTO_INCREMENT,
        name  VARCHAR(255) NOT NULL,
        color VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS tasks
    (
        id      INT PRIMARY KEY AUTO_INCREMENT,
        title   VARCHAR(255) NOT NULL,
        text    VARCHAR(255) NOT NULL,
        boardId INT          NOT NULL,
        FOREIGN KEY (boardId) REFERENCES boards (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS task_labels
    (
        id      INT PRIMARY KEY AUTO_INCREMENT,
        taskId  INT NOT NULL,
        labelId INT NOT NULL,
        FOREIGN KEY (taskId) REFERENCES tasks (id) ON DELETE CASCADE,
        FOREIGN KEY (labelId) REFERENCES labels (id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS task_users
    (
        id     INT PRIMARY KEY AUTO_INCREMENT,
        taskId INT NOT NULL,
        userName VARCHAR(255) NOT NULL,
        FOREIGN KEY (taskId) REFERENCES tasks (id) ON DELETE CASCADE,
        FOREIGN KEY (userName) REFERENCES users (userName) ON DELETE CASCADE
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
