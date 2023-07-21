import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

const pool = await mysql.createPool({
    host: 'localhost',
    port: '3606',
    user: 'root',
    password: 'test1',
    database: 'testdb'
    })

app.get('/', (req, res) => {
    res.send('Hello World');
})


app.get('/create/database', (req, res) => {
    const sql = 'CREATE DATABASE testdb';
    pool.query(sql).then(result => {
        res.send(result);
    }).catch(result => {
        res.send(result);
    })
})

app.get('/create/table', (req, res) => {
    const sql = 'CREATE TABLE users (id int AUTO_INCREMENT, name varchar(255), email varchar(255), PRIMARY KEY (id))';
     pool.query(sql).then(result => {
        res.send(result);
    }).catch(result => {
        res.send(result);
    })
})

app.get('/insert/user', async (req, res) => {
    const sql = 'INSERT INTO users (name, email) VALUES ("HolaUser", "user@gmail.com")';
    pool.query(sql).then( result => {
        res.send(result);
    })
})

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users;';
    pool.query(sql).then(result => {
        res.send(result);
    })
})
app.listen(3000);
console.log('Server on port', 3000);