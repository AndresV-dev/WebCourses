import express from "express"
//import path from "path"
//import {fileURLToPath} from "url"
import dotenv from 'dotenv'
dotenv.config()

// al querer acceder al __dirname en un archivo que no esa en la raiz del proyecto, debemos crearla manualmente ya que esta variable no esta diusponible en archivos dentro de carpetas para eso usamos las libreroas de path y url creando 2 variables para asi construir la variable __dirname
//const __filename = fileURLToPath(import.meta.url)
//const __dirname = path.dirname(__filename)

// se crea la aplicacion obteniendo el contenido y funciones de la funcion express() 
const app = express()

app.get('/', (req, res) => {

})
// podemos crear objetos json y enviarlos al cliente, ya sea un objeto creado o una consulta de base de datos
app.get('/user', (req, res) => {
    res.json({
        name: "Andres",
        lastname: "Vargas",
        age: "26",
        points: [1,2,3],
        address: {
            "city": "New York",
            "street": "some street 123"
        }
    })
})

app.get('/isAlive', (req, res) => {
    //este sendStatus cuando es requerida por el cliente, el cliente solo recibira el codigo de pagina, que en este caso es 204-NoContent esto le hara saber al cliente que el server esta arriba pero el cliente no necesita mandarlo a una ruta diferente ya que solo es una consulta de un status
    res.sendStatus(204)
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

app.get('/weather', (req, res) => {
    res.send('<h1>The Current Weather is Nice</h1>')
})
// metodo get es para obtener informacion
app.get('/products', (req, res) => {
    res.send('<h1>Obteniendo Producto</h1>')
})
// metodo post es para cuando queremos crear un nuevo objeto
app.post('/products', (req, res) => {
    res.send('<h1>Creando Producto</h1>')
})
// metodo put es para actualizar el objeto completo si no va alguna key se setteara a null
app.put('/products', (req, res) => {
    res.send('<h1>Actualizando Producto</h1>')
})
// metodo delete es para eliminar algun objeto
app.delete('/products', (req, res) => {
    res.send('<h1>Borrando Producto</h1>')
})
// metodo patch es para actualizar una parte de un objeto
app.patch('/products', (req, res) => {
    res.send('<h1>Actualizando una parte del producto</h1>')
})

// para manejar una ruta de error tenemos la opcion de proporcionarle el error que queremos que despliegue si llega a esta ruta, en este caso si no esta accediendo a cualquier ruta de arriba accedera por defecto a esta, indicando un error 404 asi como un mensaje de no se encontro la pagina, esto se puede reemprasar por un archivo html con res.sendFile
app.get((req, res) => {
    res.status(404).send('<h1>No se encontro la pagina Solicitada</h1>')
})
// puerto por el que accederan a el
// al deployear un proyecto el servicio puede o no darte un puerto por el cual desplegarlo, para accesar a el dinamicamente de utiliza la funcion process.env.PORT si esta es null se correra por el puerto default 3000
app.listen(process.env.PORT || 3000)
console.log('Server on Port: ' + (process.env.PORT || 3000))

/*
metodo que envia un archivo al cliente 

// get('ruta', parametros (funcion flecha))
app.get('/', (req, res) => {
    //res.sendFile envia al cliente un archivo en este caso un html pora que el navegador lo visualize
    res.sendFile('./public/index.html', {
        root: process.env.dirname
    })
    res.send('<h1>Hello World</h1>')
})
*/