const http = require('http')
const { createReadStream } = require('fs')

http.createServer((req, res) => {
    const fileStream = createReadStream('./data/bigfile.txt', {
        encoding: 'utf-8'
    })

    fileStream.on('data', chunck => {
        // se le envia de parte en parte al front 
        fileStream.pipe(res)
    })

    fileStream.on('error', error => {
        console.log(error)
    })
}).listen(3000)

console.log('Server on Port: ' + 3000)