import mysql from 'mysql2/promise'

// Se crea una funcion asyncrona la cual conectara la bd con nuestro servidor
async function connectionDb() {
    // se declara la base de datos, asi como sus credenciales 
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password:'1234',
        database: 'imuebles', 
        ssl: {
            rejectUnauthorized: false
        }
    });
    
    // se Ejecuta una consulta la cual traera el resultado que nos mande la bd
     const result = await connection.query('select * from usuario');
     console.log(result[0])
}

export default connectionDb