function HomeRoutes(app) {
    app.all('/about', (req, res) => {
        res.send("about page")
    })
    app.get('/dashboard', (req, res) => {
        res.sendFile("Dashboard")
    })
}

export default HomeRoutes;