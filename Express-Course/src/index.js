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

// get('ruta', parametros (funcion flecha))
app.get('/', (req, res) => {
    res.sendFile('./public/index.html', {
        root: process.env.dirname
    })
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

// puerto por el que accederan a el
// al deployear un proyecto el servicio puede o no darte un puerto por el cual desplegarlo, para accesar a el dinamicamente de utiliza la funcion process.env.PORT si esta es null se correra por el puerto default 3000
app.listen(process.env.PORT || 3000)
console.log('Server on Port: ' + (process.env.PORT || 3000))