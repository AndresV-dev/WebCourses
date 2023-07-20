import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

const pool = mysql.createPool({
    host: 'localhost',
    port: 7777,
    user: 'root',
    password: 'prueba2'
    })

const response = await pool.query('select 1 + 1');

console.log(response);

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.listen(3000);
console.log('Server on port', 3000);