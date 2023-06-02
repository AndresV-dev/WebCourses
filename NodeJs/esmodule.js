// al agregar el "type":"module" al package.json se podran utilizar los comandos import y export
import math from './math/index.js'

console.log(math.add(2,3))
console.log(math.substract(2,3))
console.log(math.divide(2,3))
console.log(math.multiply(2,3))