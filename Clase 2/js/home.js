console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

/*Clase #2: Promesas*/

const getUser = new Promise(function(resolve, reject){
  // Llamar a un API
  setTimeout(function(){
    // Luego de 3 segundos se ejecuta esta funcion.
    resolve(`Todo bien Yeih :)`);
    // reject(`Se callo el server :(`);
  }, 5000)
})

/*Otra promesa para demostracion de Promise.all y Promise.race*/
const getUserOther = new Promise(function(resolve, reject){
  // Llamar a un API
  setTimeout(function(){
    // Luego de 3 segundos se ejecuta esta funcion.
    resolve(`Todo bien Yeih en 3seg :)`);
    // reject(`Se callo el server en 3seg :(`);
  }, 3000)
})

// getUser
//   .then(function(msg){
//     console.log(msg);
//   })
//   .catch(function(msg){
//     console.log(msg);
//   })

/*Para ejecutar promesas de forma masiva podemos usar dos herramientas distintas*/

/*Promise.all: ejecuta todas las promesas dentro del Array*/
// Promise.all([
//   getUser,
//   getUser,
// ])
/*Promise.race: ejecuta solo la primera promesa que se ejecute dentro del Array*/
Promise.race([
  getUser,
  getUserOther,
])
/*Al igual que las promesas normales, esta modalidad tambien devuelve una,
  resouesta exitosa o fallida.*/
.then(function(msg){
  console.log(msg);
})
.catch(function(msg){
  console.log(msg);
})
