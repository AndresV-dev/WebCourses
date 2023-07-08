<template>
  <div class="home">
    <p>Hola</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <!-- Al llamar tabien en la pagina de about el contador, este podra almacenar si incrementamos o no en la home page, y
    tambien lo mostrara en esta pagina -->
    <div :style="{ color: store.state.colorCode }" class="counter"> {{ store.state.counter }} </div>
    <div class="counter-scuared">
      {{ store.state.counter }}
      <sup>2</sup> =
      {{ store.getters.counterScuared() }}
    </div>
    <div class="buttons">
      <button @click="store.methods.decreaseCounter()">-</button>
      <button @click="store.methods.increaseCounter()">+</button>
    </div>
    <div>
      <!--Con el v-model podemos asignar una variable guardada en nuestro state para asi dejar al usuario poder asignar un valor modificable, en este caso el color del numero, esto solo si el store esta desprotegido de lo contrario el store debera de estar en readOnly por lo cual no se podra modificar, sin una funcion-->
      <input v-model="colorCode" type="text" name="ChangeColor" id="ChangeColor" placeholder="Enter Color Code">
    </div>
  </div>
</template>

<script>
import { inject, computed } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    const store = inject('store')
    const colorCode = computed({
      get() {
        return store.state.colorCode
      },
      set(color) {
        store.methods.setColorCode(color)
      }
    })

    console.log(store.methods)
    return {
      store,
      colorCode
    }
  }
}
</script>

<style>
div {
  margin-bottom: 10px;
}

.counter {
  font-size: 80px;
}

.buttons {
  font-size: 40px;
  width: 100px;
  margin: 0 10px;
}
</style>