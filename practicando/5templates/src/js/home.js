

(async function load(){

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


	const $actionContainer = document.querySelector('#action')
	const $dramaContainer = document.getElementById('drama')
	const $animationContainer = document.querySelector('#animation')

	const $featuringContainer = document.getElementById('featuring')
	const $form = document.getElementById('form')
	const $home = document.querySelector('#home')

	const $modal = document.getElementById('modal')
	const $overlay = document.getElementById('overlay')
	const $hideModal = document.getElementById('hide-modal')

	const $modalTitle = $modal.querySelector('h1')
	const $modalImage = $modal.querySelector('img')
	const $modalDescription = $modal.querySelector('p')

	// TEMPLATES
	// 1er paso para la creacion de HTML desde JS

	// Utilizamos Templates Literals

	function videoItemTemplate(src, title){
		return (
			`<div class="primaryPlaylistItem">
	        	<div class="primaryPlaylistItem-image">
	              <img src="${src}">
	            </div>
	            <h4 class="primaryPlaylistItem-title">
	              ${title}
	            </h4>
	        </div>`
		)
	}

	//Pasamos nuevos datos para sustituir en el template

	console.log(videoItemTemplate('src/images/covers/bitcoin.jpg', 'New Bitcoin'))
	
})()