import {Router} from "express";
 
// espress.router nos ayuda a no englobar nuestras rutas en una funcion, y solo declararlas, y este router lo exportamos para asi usarlo en nuestro archivo del Server
const router = Router()

router.get('/view1', (req,res) => {
    const title = 'Pagina Creada desde Express'
    res.render('index', {
        title
    })
})

router.get('/ruta2', (req,res) => {
    res.send('ruta2')                
})

router.get('/ruta3', (req,res) => {
    res.send('ruta3')        
})

export default router;