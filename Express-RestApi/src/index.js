import express from 'express';
import morgan from 'morgan';

// Se construye el server y se guarda en la variable app
const app = express()
// Se crea un json el cual servira como reemplazo de la base de datos en esta variable se guardaran y eliminaran los datos 
let productos = [
    {
        id: 1,
        name: "laptop",
        price: 123
    }
]

// middleware que muestra la info de las rutas accedidas en la consola
app.use(morgan('dev'))
// middleware propio de express el cual convierte el request en un json para poderlo manejar en las rutas
app.use(express.json())

// ruta getAllProductos devuelve el arrayJson declarado antes, la respuesta que traeriamos de una bd
app.get('/products', (req, res) => {
    // se indica que se le enviara un json al front
    res.json(productos)
})

// ruta de creacion de un producto nuevo
app.post('/products', (req, res) => {
    //copiamos el body el cual tiene las keys necesarias para crear un producto nuevo (name y price) y le agregamos el id dinamicamente con el length del array 
    const newProduct = {...req.body, id: productos.length + 1}
    // agregamos el nuevo producto a la lista
    productos.push(newProduct)
    // mostramos el nuevo producto al front
    res.send(newProduct)
})

// ruta para eliminar un producto mediante un id dado
app.delete('/products/:id', (req, res) => {
    // checamos si el producto existe en nuestra bd
    const productFound = productos.find(p => p.id === parseInt(req.params.id))

    // si no existe le mandamos un codigo de error al front
    if(!productFound)
        return res.status(404).json({
            message: "Product not found"
        })
    
        // si existe utilizamos el metodo filter para crear un array nuevo sin los productos que no cumplan con la condicion en este caso si no tienen el id que le pasa el front lo guardara de lo contrario lo omitira creando un array nuevo sin este
    productos = productos.filter((p) => p.id !== parseInt(req.params.id))
    res.sendStatus(204)
})

//ruta para actualizar un producto
app.put('/products/:id', (req, res) => {
    //se busca si el producto existe  
    const productFound = productos.find(p => p.id === parseInt(req.params.id))
    // se copia las keys del request en una variable
    const newData = req.body

    // si no existe le mandamos un codigo de error al front
    if(!productFound)
        return res.status(404).json({
            message: "Product not found"
        })

    // si existe se realiza un recorrido del array con map indicando que si el id del producto guardado es igual al que le estamos pasando utilizaremos esto {...p, ...newData} para sobreescribir las keys que se le pasen del front de lo contrario el producto queda igual 
    productos = productos.map(p => p.id === parseInt(req.params.id) ? {...p, ...newData} : p)

    res.send("Actualizando Productos")
})

// ruta para obtener un producto por el id
app.get('/products/:id', (req, res) => {
    // checamos si el producto existe en nuestra bd
    const productFound = productos.find((p) => p.id === parseInt(req.params.id))
    //si existe lo mandamos al front si no existe le mandamos un error 404 asi como un mensaje 
    productFound === undefined ? res.status(404).json({message: "No Se Encontro el Producto"}) : res.json(productFound)
})

// indicamos en que puerto se accedera al server
app.listen(3000)
console.log(`Server Running on Port 3000`)