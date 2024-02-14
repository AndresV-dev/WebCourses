import axios from 'axios';

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

    app.get('/posts', async(req, res) => {

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        res.render('posts', {
            posts: response.data
        })
    })
}

export default HomeRoutes;