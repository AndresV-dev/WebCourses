function UserRoutes(app) {
    app.get('/users', (req,res) => {
        res.render('users')
    })

    app.get('/getUserPhone', (req,res) => {
        res.send('762345732')
    })
}

export default UserRoutes