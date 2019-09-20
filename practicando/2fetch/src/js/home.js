// PETICIONES CON VANILLA

// Las peticiones se hacen con el metodo fetch y lo que retorna es una promesa.

fetch ('https://randomuser.me/api')
	.then(function(data){
		console.log(data)
		return data.json()
	})
	.then(function(user){
		console.log('User: ', user)
		console.log('name: ', user.results[0].name.first)
		console.log('lastname: ', user.results[0].name.last)
		console.log('phone: ', user.results[0].phone)
	})
	.catch(function(){
		console.log('Algo fallo...!')
	})