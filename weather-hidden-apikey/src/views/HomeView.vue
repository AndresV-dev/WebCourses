<template>
  <div class="home">
    <h1>Weather App</h1>
    <div class="city">
      <!--Keyup.enter evalua si el usuario dio enter si es asi llama a la funcion getWeather el cual evalua la ciudad que ingreso y le regresa el clima actual-->
      <input v-model="data.city" @keyup.enter="getWeather" type="text" placeholder="Insert a city">
    </div>
    <!-- Solo se mostrara so la variable data tiene informacion del clima actual-->
    <div v-if="data.weather" class="weather">
      <!-- Se redondea la temperatura para mostrar solo enteros-->
      <h1>{{ Math.round(data.weather.main.temp) }}&deg;</h1>
      <h2>{{ data.weather.weather[0].main }}</h2>
      <h3>{{ data.weather.weather[0].description }}</h3>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { reactive } from 'vue'
import axios from 'axios'

export default {
  setup() {
    let data = reactive({
      city: '',
      weather: null
    })
    // Separamos en variables independientes la apikey y la apiUrl
    const apiUrl = 'http://localhost:3000/';

    // Se hace la consulta a la api del clima, y se guarda la informacion en la variable weather dentro de data el cual mostrara el div oculto 
    const getWeather = () => {
      axios(`${apiUrl}?units=metric&q=${data.city}`).then(response => { data.weather = response.data })
    }

    // retornamos las variables data y la funcion getWeather
    return {
      data,
      getWeather
    }
  }
}
</script>

<style>
.city input {
  font-size: 40px;
}

.weather {
  margin-top: 10px;
}

.weather h1 {
  font-size: 80px;
}

.weather h1,
h2,
h3 {
  margin: 0;
}
</style>