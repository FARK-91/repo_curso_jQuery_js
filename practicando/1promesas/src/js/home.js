// VARIABLES
console.log('hola mundo!');
const noCambia = "Leonidas";

let cambia = "@LeonidasEsteban"

function cambiarNombre(nuevoNombre) {
  cambia = nuevoNombre
}

// PROMESAS

const getUser = new Promise(function(todoBien, todoMal){
	//Lamar a un API
	setTimeout(function(){
		//pasan 3s
		todoMal('Se acabo el tiempo')
	}, 3000)

})

getUser
	.then(function(){
		console.log('Todo esta bien')
	})
	.catch(function(msg){
		console.log(msg + ' :(')
	})