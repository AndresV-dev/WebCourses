// este require hace referencia a una carpeta dentro de la libreria de fs, la cual constiene las mismas funciones que fs solo que ahora no es necesario utilizar la funcion promisify de util, ya que las funciones dentro de la carpeta ya regresan un callback, por lo que se puede omitir la asignacion de promisify y utilizarlas directamente en async/await
const { readFile } = require('fs/promises')
// const { readFile } = require('fs')
const { promisify } = require('util')

// // Las promesas son funciones los cuales ayudan a manejar mejor el codigo sin la necesidad de utilizar callbacks estas utilizan codigo Async
// function getText(pathFile){
//     return new Promise((resolve, reject) => {
//         readFile(pathFile, 'utf-8', (err, data) => {
//             if(err)
//                 reject(err)
            
//             resolve(data)
//         })
//     }) 
// }

// //getText('./data/first.txt')
// //.then((result) => console.log(result))
// //.then(() => getText('./data/second.txt')) //con las promesas puedes mandar llamar a una funcion dentro del 'then' y el siguiente 'then' hara referencia a esa funcion, mostrando asi el result de la segunda llamada del la funcion y el 'catch' podra cachar el error de ambos
// //.then((result) => console.log(result))
// //.catch((error) => console.log(error))


// // Ejemplo Async/await para utilizar una funcion await debemos declararla dentro de una funcion padre, y a esta asignarle la palabra clabe async, indicando que el codigo dentro de la funcion padre sera asyncrono
// async function read(){
//     try{
//         const result = await getText('./data/first.txt')
//         const result2 = await getText('./data/second.txt')
//         const result3 = await getText('./data/third.txt')

//         console.log(result)
//         console.log(result2)
//         console.log(result3)
//     }catch(error) {
//         console.log(error)
//     }
// }

// read()

/* Promisify 
para evitar  crear un metodo que haga un call back, node js tiene funciones las cuales nos ayudan a simplificar esto, 
la funcion promisify la importamos de la libreria de nodeJs 'Util' y le pasamos la funcion de readFile de la libreria 'fs' 
la funcion promisify espera un objeto el cual regrese un call back */

const readFilePromise = promisify(readFile)

async function read() {
    try{

        /* al utilizar promisify estamos simplificando el codigo a que solo debemos promisify en ve de crear una funcion que haga callback
        esta funcion es la que se reemplasara:

        function getText(pathFile){
            return new Promise((resolve, reject) => {
                readFile(pathFile, 'utf-8', (err, data) => {
                    if(err)
                        reject(err)
                    
                    resolve(data)
                })
            }) 
        }

        esta funcion se omitira y solo se tendra que llamar la funcion creada con promisify 

                const result = await readFilePromise('./data/first.txt', 'utf-8')
        */

        const result = await readFilePromise('./data/first.txt', 'utf-8')
        const result2 = await readFilePromise('./data/second.txt', 'utf-8')
        const result3 = await readFilePromise('./data/third.txt', 'utf-8')

        // estas ya no necesitan pasar por la funcion promisify, es la funcion directamente importada de la libreria 'fs/promises'
        const resultfspromises = await readFile('./data/first.txt', 'utf-8')
        const result2fspromises = await readFile('./data/second.txt', 'utf-8')
        const result3fspromises = await readFile('./data/third.txt', 'utf-8')

        console.log(result)
        console.log(result2)
        console.log(result3)
    }catch(error) {
        console.log(error)
    }
}

read()