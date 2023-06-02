import fetch from "node-fetch"

// async function loadData() {
//     try{
//         const res = await fetch('https://jsonplaceholder.typicode.com/posts')
//         const data = await res.json()
//         console.log(data)
//     }catch(error){
//         console.log(error)
//     }
// }

// loadData()

// esta sintaxis funciona debido al type module del package.json, si este no esta definido esta sintaxis no funcionara

try{
    const res = await fetch('https://jsonplaceholder.typicode.com/posts')
    const data = await res.json()
    console.log(data)
}catch(error){
    console.log(error)
}