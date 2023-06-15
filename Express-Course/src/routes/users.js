function UserRoutes(app) {
    app.get('/getUser', (req,res) => {
        res.send('info Del Usuario')
    })

    app.get('/getUserPhone', (req,res) => {
        res.send('762345732')
    })
}

export default UserRoutes;