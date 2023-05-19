const path = require('path')

// el metodo path se utiliza para crear rutas independiente de el sistema operativo en el que se este ejecutando el programa 
const filepath = path.join('/public', 'dist', '/styles','main.css')

// muestra solo el nombre del archivo, con forme a una ruta que se le pasa
console.log(path.basename(filepath))
// muestra el directorio del archivo
console.log(path.dirname(filepath))
//muestra un json con la informacion del archivo ruta, extencion, nombre
console.log(path.parse(filepath))
//muestra uns ruta compuesta por la ruta en la que esta el proyecto añadiedo la carpeta que le pasamos
console.log(path.resolve('dist'))