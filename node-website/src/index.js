import express from "express"

// se crea la aplicacion obteniendo el contenido y funciones de la funcion express() 
const app = express()

// get('ruta', parametros (funcion flecha))
app.get('/', (req, res) => {
    res.send('<h1>Bienvenido Papu</h1>')
})

app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

// puerto por el que accederan a el
// al deployear un proyecto el servicio puede o no darte un puerto por el cual desplegarlo, para accesar a el dinamicamente de utiliza la funcion process.env.PORT si esta es null se correra por el puerto default 3000
app.listen(process.env.PORT || 3000)
console.log('Server on Port: 3000')