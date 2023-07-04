<template>
  <div class="home">
    <p>Hola</p>
    <img alt="Vue logo" src="../assets/logo.png">
    <div class="counter"> {{ counter }} </div>
    <div class="buttons">
      <button @click="decreaseCounter()">-</button>
      <button @click="increaseCounter()">+</button>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'HomeView',
  setup() {
    let counter = ref(0);

    const increaseCounter = () => {
      counter.value++
    }
    const decreaseCounter = () => {
      counter.value--
    }

    return {
      counter,
      increaseCounter,
      decreaseCounter
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