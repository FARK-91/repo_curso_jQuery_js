// Practicando v1 20/09/2019 11:56

(async function load(){

	const request = await fetch('https://randomuser.me/api')
	const response = await request.json()

	console.log('Datos de Async2.js')
	console.log(response.results[0].email)

})()