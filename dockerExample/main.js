import express from 'express';
import mysql from 'mysql2/promise';

const app = express();

const pool = await mysql.createPool({
    host: 'db', // el host debe estar referenciado al nombre que tenemos en el archivo de configuracion de docker-compose
    port: '3306', // el puerto debe ser el que tenga internamente la base de datos, dentro del contenedor, en este caso el default 3306
    user: 'root',
    password: 'test1',
    database: 'testdb'
    })
    
app.get('/', (req, res) => {
    res.send('Hello World');
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
    pool.query(sql, (err, rows, result) => {
        if(err)
            res.send(err);

        res.send(rows);
    })
})


app.get('/users', async (req, res) => {
    const sql = 'Select * from users;';

    const [rows, fields] = await pool.query(sql);

    console.log(fields);
    res.send(JSON.stringify(rows));
})

app.get('/users/:id', async (req, res) => {
    const sql = 'Select * from users where id = ' + req.params.id;
    // Se guardan los datos de la consulta en una constante
    const [rows, fields] = await pool.query(sql);

    const jsonUser = {
        id: rows[0].id,
        usuario: rows[0].name,
        email: rows[0].email
    }

    res.json(jsonUser);
})

app.listen(3000);
console.log('Server on port', 3000);