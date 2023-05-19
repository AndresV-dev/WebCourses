const os = require('os')

// Te da informacion acerca del usuario del sistema operativo
console.log(os.userInfo())
// Muestra los milisegundos desde que el equipo se encendio 
console.log(os.uptime())
// Muestra el sistema Operativo en el que se ejecuto el archivo (win32, mac)
console.log(os.platform())
// Muestra la memoria total 
console.log(os.totalmem())
//mmuestra la memoria disponible
console.log(os.freemem())

// muestra una tabla en la cual muestra varios datos
console.table({
    os: os.platform(),
    version: os.release(),
    totalMemory: os.totalmem()
})