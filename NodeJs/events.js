//event emiter
const EventEmitter = require('events')

const customEmitter = new EventEmitter()

// el .on es como el .addEventListener, es el evento que se quedara escuchando por alguna llamada
customEmitter.on('response', (data, secondData) => {
    console.log(data)
    console.log(secondData)
})

//primero debe de existir el evento y despues se llamara, de lo contrario dara error de no existencia
customEmitter.emit('response', 'Hello World', [1, 2, 3])