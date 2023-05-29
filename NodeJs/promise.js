const { readFile } = require('fs')

// Las promesas son funciones los cuales ayudan a manejar mejor el codigo sin la necesidad de utilizar callbacks estas utilizan codigo Async
function getText(pathFile){
    return new Promise((resolve, reject) => {
        readFile(pathFile, 'utf-8', (err, data) => {
            if(err)
                reject(err)
            
            resolve(data)
        })
    }) 
}

//getText('./data/first.txt')
//.then((result) => console.log(result))
//.then(() => getText('./data/second.txt')) //con las promesas puedes mandar llamar a una funcion dentro del 'then' y el siguiente 'then' hara referencia a esa funcion, mostrando asi el result de la segunda llamada del la funcion y el 'catch' podra cachar el error de ambos
//.then((result) => console.log(result))
//.catch((error) => console.log(error))


// Ejemplo Async/await para utilizar una funcion await debemos declararla dentro de una funcion padre, y a esta asignarle la palabra clabe async, indicando que el codigo dentro de la funcion padre sera asyncrono
async function read(){
    try{
        const result = await getText('./data/first.txt')
        const result2 = await getText('./data/second.txt')
        const result3 = await getText('./data/third.txt')

        console.log(result)
        console.log(result2)
        console.log(result3)
    }catch(error) {
        console.log(error)
    }
}

read()