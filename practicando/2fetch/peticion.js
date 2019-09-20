
// Consolida que el fetch devuelve una promesa, y ya sabes como funcionan las promesas.

fetch('https://randomuser.me/api')
	.then(function(request){
		return request.json()
	})
	.then(function(data){
		console.log(`Les presento al usuario: ${data.results[0].name.first}`)
		console.log(`Su edad es: ${data.results[0].dob.age}`)
		console.log(`Y su sexo: ${data.results[0].gender}`)
		console.log(`Salto de linea********************`)
	})