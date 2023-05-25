const http = require('http')

// la funcion de createServer crea un servidor el cual podra recibir peticiones asi como responder a esas peticiones, el listen, es para asignar un puerto por el cual el server va a estar escuchando dichas peticiones

http.createServer((request, response) => {
    // el objecto request, es toda la informacion del cliente, es un objecto muy extenso del cual solo usaremos poca informcion como tal, como por ejemplo request.url el cual nos devuelve la ruta a la que se esta accediendo asi como la ruta /favicon.ico , el cual es el icono que se mostrara la pestaña junto con el nombre de la pagina

    if(request.url === '/about'){
        response.write('Acerca De')
        return response.end()
    }
    //El metodo response.write es para crear una respuesta cuando se llame el server esta respuesta puede ser un String o incluso una pagina html con el cual construir la pagina en el navegador 
    response.write( `<h1>Not Found</h1>
        <p>Esta Pagina No Se Encontró</p>`)
    response.end()
}).listen(3000)

console.log('Servidor En puerto 3000')