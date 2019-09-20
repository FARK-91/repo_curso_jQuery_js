

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

	function videoItemTemplate(movies){
		return (
			`<div class="primaryPlaylistItem">
	        	<div class="primaryPlaylistItem-image">
	              <img src="${movies.medium_cover_image}">
	            </div>
	            <h4 class="primaryPlaylistItem-title">
	              ${movies.title}
	            </h4>
	        </div>`
		)
	}

	actionList.data.movies.forEach((item) => {
		const videoHTML = videoItemTemplate(item)
		console.log(videoHTML)
	})

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
	
	
})()