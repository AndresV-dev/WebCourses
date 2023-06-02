// const { writeFile } = require('fs/promises')

// const cerateBigFile = async () => {
//     writeFile('./data/bigfile.txt', 'HellpWorld'.repeat(1000000))
// }

// cerateBigFile()

const { createReadStream } = require('fs')

// esta funcion lo que crear es un stream del archivo de data, lo que quiere decir que crea un objecto con varios eventos utilizados en on(), como data(divide el archivo en porciones mas pequeñas y las enviara en partes), close(), end(se accionara cuando el archivo termine de ejecutarse), error(se ejecuta si hay un error) 
const stream = createReadStream('./data/bigfile.txt', 'utf-8')

// divide el codigo en partes(chunck) y ejecuta la funcion por cada una, en este ejemplo se muestra la parte del archivo leida
stream.on('data', (chunck) => {
    console.log(chunck)
})

// Se ejecuta cuando se terimne de leer el archivo
stream.on('end', () => {
    console.log('ya termine de leer el archivo')
})

// Se ejecuta cuando se detecto algun error
stream.on('error', (error) => {
    console.log(error)
})