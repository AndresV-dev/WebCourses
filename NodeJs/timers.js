
// Ejecuta repetidamente procesos o logica cada cierto tiempo se maneja en milisegundos 2000 = 2 seg
setInterval(() => {
    console.log("hello world")
}, 2000)

// Ejecuta procesos o logica despues del tiempo definido en el timeout en este caso se maneja en milisegundos 5000 = 5 seg
setTimeout(() => {
    console.log('hola despues de 5 secs')
}, 5000)