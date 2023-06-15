import express from "express";
 
// espress.router nos ayuda a no englobar nuestras rutas en una funcion, y solo declararlas, y este router lo exportamos para asi usarlo en nuestro archivo del Server
const router = express.Router()

router.get('/ruta1', (req,res) => {
    res.send('ruta1')        
})

router.get('/ruta2', (req,res) => {
    res.send('ruta2')                
})

router.get('/ruta3', (req,res) => {
    res.send('ruta3')        
})

export default app;