
// FUNCIONES ASINCRONAS

// Para hacer que se autoejecute sin tener que declararla mas abajo como load()
// Puedo envolver la funcion entera entre parentesis y coloco el agrupador de parametros al final ()
// De esta forma:

(async function load(){
	// await
	// como es una funcion asincrona no necesito esperar que se ejecute,
	// lo que quiere decir que no voy a utilizar el .then() como normalmente
	// lo he hecho.

	async function getData(url){
		const response = await fetch(url)
		const data = await response.json()
		return data
	}

	const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
	const dramaList = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama')
	const animationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation')

	console.log('actionList', actionList)
	console.log('terrorList', dramaList)
	console.log('terrorList', animationList)

})()