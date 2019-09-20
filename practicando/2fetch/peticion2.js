// Practicando v1 20-09-2019 11:08


fetch('https://randomuser.me/api')
	.then(function(response){

		return response.json()
	})
	.then(function(data){
		console.log('Recibo el success de la promesa: ',data)
		console.log('Mapeo los datos recibidos: ',data.results[0])
		console.log('Mapeo el array recibido, muestro la direccion del user: ',data.results[0].location.street)
	})