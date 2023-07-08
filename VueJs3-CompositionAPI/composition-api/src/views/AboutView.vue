<template>
  <div class="about">
    <h1>Counter can Be Usefull everyware</h1>
    <p>{{ store.state.counter }}</p>
  </div>
</template>

<script>
import { inject } from 'vue';

export default {
  setup() {
    //Se crea una constante llamada store a la cual se le asigna la injeccion de el store
    const store = inject('store')

    return {
      store
    }
  }
}
</script>