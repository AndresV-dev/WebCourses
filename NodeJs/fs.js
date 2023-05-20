const fs = require('fs')

// en los metodos de node que llevan la el Sync se refiere a que son metodos Syncronos es decir que se ejecutaran un methodo en seguida de otro a diferencia de las funciones asyncronas las cuales se pueden ejecutar simultaneamente


/* ------------------------------------------ Funciones fs Synchronous

// Lee el archivo de la ruta pasada, provee la informacion como un buffer, se debera incluir utf-8 para convertirlo en un string normal
const first = fs.readFileSync('./data/first.txt', 'utf-8');
const second = fs.readFileSync('./data/second.txt');

console.log(first)
//  toString() devuelve el buffer en string
console.log(second.toString())
// se declara el contenido que tendra el archivo txt
const tittle = 'Tercer Archivo creado con fs';
// crea y guarda un archivo en la ruta dada, si ya existe sobrescribira el archivo
// al agregar el parametro de opciones, 'flag: "a"' es una bandera con el abrebiado de append = 'a', lo cual añadira el contedico en vez de sobrescribirlo
fs.writeFileSync('./data/third.txt', tittle, {
    flag: 'a'
})
c
*/


// ------------------------------------------- Funciones Asynchronous

// las funciones Asyncronas no se pueden guardar en constantes ya que estas funciones se ejecutan en cierto tiempo y no de inmediato, si quieremos ejecutar una funcion inmediatamente despues de que se ejecute la funcion se le asigna una funcion (funciton() or () => {}) la funcion puede cachar el error o la informacion del archivo
fs.readFile('./data/first.txt', 'utf-8', (error, data) => {
    // se puede asemejar al try catch
    if(error)
        console.log(error)
    
    console.log(data)
    // Si queremos asegurarnos de que una funcion se ejecute en seguida de otro sin usar las funciones Syncronas podemos meter la funcion dentro de la funcion, de esta manera estamos seguros que se ejecutara una ver que lea el archivo first.txt
    fs.readFile('./data/second.txt', 'utf-8', (error, data) => {
        // se puede asemejar al try catch
        if(error)
            console.log(error)
        
        console.log(data)

        fs.writeFile('./data/newFile.txt', 'Archivo Creado desde fs')
    })
})