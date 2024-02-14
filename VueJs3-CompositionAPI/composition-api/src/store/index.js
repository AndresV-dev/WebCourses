
import { reactive, readonly } from "vue"

// declaramos un objeto state
const state = reactive({
        counter: 0,
        colorCode: 'red'
    })
// Se declara un objeto con los métodos
const methods = { 
     increaseCounter(){
        state.counter++
      },
    decreaseCounter(){
        state.counter--
      },
    setColorCode(colorCode){
    state.colorCode = colorCode
    }
}

const getters = {
    counterScuared() {
        return state.counter * state.counter
    }
}

// Se exporta el objeto state y el objeto methods
export default{
    // Se exporta el objeto state como readonly
    state: readonly(state),
    methods,
    getters
}