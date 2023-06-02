const add = (x, y) => x + y;      // funcion flecha devuelve la Suma de 2 numeros
const substract = (x, y) => x - y;// funcion flecha devuelve la Resta de 2 numeros
const divide = (x, y) => x / y;   // funcion flecha devuelve la Divicion de 2 numeros
const multiply = (x, y) => x * y; // funcion flecha devuelve la Multiplicacion de 2 numeros

// con la implementacio del "type":"module" al package.json se agrega la posibilidad de exportar de una manera diferente lo cual es equivalente a la forma nativa
export default {
    add,
    substract,
    divide,
    multiply    
}

// module.exports = {
//     add,
//     substract,
//     divide,
//     multiply
// }