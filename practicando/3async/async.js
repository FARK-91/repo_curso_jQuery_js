
// Funciones asincronas para hacer peticiones

// Forma no convencional

(async function user(){
	const response = await fetch('https://randomuser.me/api')
	const data = await response.json()

	console.log(`Les presento al usuario: ${data.results[0].name.first}`)
	console.log(`Su edad es: ${data.results[0].dob.age}`)
	console.log(`Y su sexo: ${data.results[0].gender}`)
})();

// Forma convencional

(async function usershort(){
	const link = 'https://randomuser.me/api'

	async function request(url){
		response = await fetch(url)
		data = await response.json()
		return data
	}

	const usuario = await request(link)

	console.log(`Les presento al usuario: ${usuario.results[0].name.first}`)
	console.log(`Su edad es: ${usuario.results[0].dob.age}`)
	console.log(`Y su sexo: ${usuario.results[0].gender}`)

})()