import mysql from 'mysql';

const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'auver2_db',
    multipleStatements: true,
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
    DROP TABLE IF EXISTS task_labels;
    DROP TABLE IF EXISTS labels;
    DROP TABLE IF EXISTS task_users;
    DROP TABLE IF EXISTS tasks;
    DROP TABLE IF EXISTS boards;
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS history;

    CREATE TABLE IF NOT EXISTS history
    (
        id          INT PRIMARY KEY AUTO_INCREMENT,
        description VARCHAR(255) NOT NULL,
        createdAt   DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS boards
    (
        id   INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS users
    (
        userName VARCHAR(255) PRIMARY KEY NOT NULL,
        password VARCHAR(255)             NOT NULL
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
        id       INT PRIMARY KEY AUTO_INCREMENT,
        taskId   INT          NOT NULL,
        userName VARCHAR(255) NOT NULL,
        FOREIGN KEY (taskId) REFERENCES tasks (id) ON DELETE CASCADE,
        FOREIGN KEY (userName) REFERENCES users (userName) ON DELETE CASCADE
    );

    INSERT INTO boards (name)
    VALUES ('Board 1'),
           ('Board 2');

    INSERT INTO labels (name, color)
    VALUES ('Label 1', 'Red'),
           ('Label 2', 'Blue'),
           ('Label 3', 'Green');

    INSERT INTO tasks (title, text, boardId)
    VALUES ('Task 1', 'Description for Task 1', 1),
           ('Task 2', 'Description for Task 2', 1),
           ('Task 3', 'Description for Task 3', 2);

    INSERT INTO task_labels (taskId, labelId)
    VALUES (1, 1),
           (1, 2),
           (2, 2),
           (3, 3);

    INSERT INTO history (description)
    VALUES ('Initial data');

`;

db.query(schema, (err) => {
    if (err) {
        console.error('Error creating tables:', err);
    } else {
        console.log('Tables created/updated successfully');
    }
});

db.end();
