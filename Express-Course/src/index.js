import express from "express"
import path from "path"
import {fileURLToPath} from "url"
import dotenv from 'dotenv'
import expressRouter from './routes/expressRouter'

dotenv.config()

// al querer acceder al __dirname en un archivo que no esa en la raiz del proyecto, debemos crearla manualmente ya que esta variable no esta diusponible en archivos dentro de carpetas para eso usamos las libreroas de path y url creando 2 variables para asi construir la variable __dirname
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// se crea la aplicacion obteniendo el contenido y funciones de la funcion express() 
const app = express()

// en node para poder recibir el body debemos de utilizar esta instruccion indicandole a el server que recibira json
app.use(express.json())
// este es cuando se recibira un text
app.use(express.text())
// esre cuando se espere un form
app.use(express.urlencoded({extended: false}))
// este use indica las rutas creadas en el archivo expressRouter, las cuales pueden ser accedidas
app.use(expressRouter);
// ----------------------------------- Rutas creadas en un archivo aparte -----------------------------------
import HomeRoutes from './routes/home'
import UserRoutes from './routes/users'

// Inicializa las rutas definidas en el archivo de HomeRoutes, las cuales van a poder ser accedidas
HomeRoutes(app);
// Inicializa las rutas definidas en el archivo de UserRoutes, las cuales van a poder ser accedidas
UserRoutes(app); 
// -------------------------Routes creadas en el archivo donde se configura el server  --------------------------------------------
app.get('/', (req, res) => {
    //res.sendFile envia al cliente un archivo en este caso un html pora que el navegador lo visualize
    res.sendFile('./public/index.html', {
        root: __dirname
    })
})
// para dinamizar las rutas de express se colocan como ":variable", y para poder manejarlas se accede con "req.params.variable"
app.get('/hello/:name', (req, res) => {
    console.log(req.params)
    // para hacer estas comillas `` con teclado español -> alt + diagonal(arriba de enter)
    res.send(`hola ${req.params.name}`)
})

//tambien podemos aceptar parametros enteros solo que para manejarlos debemos convertirlos a enteros esto lo hacemos con la funcion parseInt() esto solo funciona para strings numericos si intentamos con un string con alguna letra dara error
app.post('/suma/:x/:y', (req, res) => {
    // tambien podemos guardar los parametros de ruta en variables con un destructuring como sabemos que las variables vienen en el objeto de req.params solo lo igualamos y de la parte de declaracion colocamos en un array el nombre de las variables, y estas las podremos usar sin el prefijo de req.params
    const {x,y} = req.params;

    res.send(`Result ${parseInt(x) + parseInt(y)}`)
//    res.send( `Result: ${parseInt(req.params.x) + parseInt(req.params.y)}`)
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

// el cliente tambien nos puede mandar datos desde algun formulario, para esto usamos el metodo post 
app.post('/user', (req, res) => {
    console.log(req.body)
    res.send('Nuevo usuario Creado')
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
// el metodo .all indica que esta ruta puede acceder desde cualquier metodo get, post, delete, patch, etc. 
app.all('/info', (req, res) => {
    res.send('server Info')
})
// para manejar una ruta de error tenemos la opcion de proporcionarle el error que queremos que despliegue si llega a esta ruta, en este caso si no esta accediendo a cualquier ruta de arriba accedera por defecto a esta, indicando un error 404 asi como un mensaje de no se encontro la pagina, esto se puede reemprasar por un archivo html con res.sendFile
app.get((req, res) => {
    res.status(404).send('<h1>No se encontro la pagina Solicitada</h1>')
})

app.use('/public', express.static(path.join(__dirname, './public')))
app.use('/uploads', express.static(path.join(__dirname, './uploads')))

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