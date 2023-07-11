
const express = require('express')
const axios = require('axios');
const qs = require('qs');

// Se instala el paquete dotenv para leer las variables de entorno
require('dotenv').config();

const app = express()
const port = 3000

const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
// Se obtiene la clave de la API desde la variable de entorno
const apiKey = process.env.API_KEY;

app.get('/', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  // Se obtienen los parámetros de la consulta
  let query = req.query;
  // Se agrega la clave de la API
  query.appid = apiKey;

  // Se convierte el objeto de consulta a una cadena de texto
  let queryString = qs.stringify(query);

  // Se realiza la consulta a la API
  axios(`${apiUrl}?${queryString}`).then(response => {
      res.send(response.data);
    })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})