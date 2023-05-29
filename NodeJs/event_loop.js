const http = require('http')

/**
 * Node es un programa de un solo hilo es decir solo puede ejecutar una tarea a la vez por lo que si llegamos a tener una tarea pesada en alguna de las rutas esta tendra que terminar de procesarse para asi continuar con la siguiente
 */

http.createServer((req, res) => {
    if(req.url === '/'){
        res.write('welcome to the server')
        return res.end()
    }

    // añ tener una tarea pesada en una ruta como este for que simulara una consulta a una bd, al entrar a la paguina tendra que acabar de realizar la tarea antes de poder realizar otra
    if(req.url === '/about'){
        // heavy task
        for(let i = 1; i < 1000; i++){
            console.log(Math.random() * i)
        }
        return res.end('acerca de') // al manmdar un texto dentro del end es lo mismo com osi tuvieramos un res.write return res.end()
    }

    return res.end('Not Found')
}).listen(3000)

console.log('server on port 3000')