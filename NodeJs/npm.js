/**
 * npm es un comando utilizado para la instalacion de paquetes externos (creados por node o por desarrolladores de la comunidad)
 * Al instalar modulos de terceros utiliza el commando "npm install {module_name}" al ejecutarlo se crearan o actualizaran 3 archivos
 * 1.- node_modules (aqui si almacenan los archivos con el codigo que se utiliza para ejecutar las operaciones propias del modulo)
 * 2.- package_lock.json (aqui se guarda una lista con las referencias de modulos asi como las referencias de modulos que este pueda utilizar ("modulos" que usan otros modulos del mismo creador) normalmente nunca se toca directamente)
 * 3.- package.json (se guarda la informacion de los modulos, nombre, version, etc) en caso de no tener la carpeta node_modules con el commando "npm install" instalara los modulos contenidos en el package.json 
 */
/**
 * npm commands
 * npm i bootstrap .- i es una abreviacion de install
 * npm i axios bootstrap tailwind .- al poner el nombre de un modulo despues de otro indica que se quiere instalar mas de 1 modulo
 * npm remove axios .- elimina el modulo
 * npm i nodemon -D .- "-D" indica que esta dependencia se usara solo en desarrollo, esto quiere decir que el proyecto no depende de si este modulo esta instalado o no, si el modulo a instalar es pieza clave en el proyecto (si no esta dará error) se debera de instalar sin '-D'.  La D es mayuscula si no lo instalara en devDependencies
 */
/**
 * npx es un ejecutador de paquetes con este programa podemos descargar modulos y ejecutarlos de inmediato sin tener que guardarlos en el proyecto
 * npx commands
 * npx cowsay hello world
 */

//importamos el modulo que instalamos
require('colors')

console.log('Hello World'.bgCyan)
console.log('andys.com'.bgBlue)
console.log('google.com'.rainbow)
console.log('testText'.america)