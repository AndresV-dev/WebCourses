function HomeRoutes(app) {
    app.get('/', (req, res) => {
        // al usar plantillas ejs podemos pasarle variables ya seab boleanos o tambien objetos
        const isActive = true;
        const users = [
            {
                id: 1,
                name: "andy",
                lastname: "villa"
            },
            {
                id: 2,
                name: "Mario",
                lastname: "Bros"
            }
        ]
        res.render('index', {
            title: 'Titulo Ejemplo',
            isActive,
            users
        })
    })

    app.all('/about', (req, res) => {
        res.render('about')
    })
}

export default HomeRoutes;