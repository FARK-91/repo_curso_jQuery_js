
/*Clase #7: Creacion de Templates*/

(async function load(){

  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }

  // Creando el Template desde Vanilla

  function videoItemTemplate(movie){
    return(`<div class="primaryPlaylistItem">
      <div class="primaryPlaylistItem-image">
        <img src="${movie.medium_cover_image}">
      </div>
      <h4 class="primaryPlaylistItem-title">
        ${movie.title}
      </h4>
    </div>`)
  }

  const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama')
  const amationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation')

  console.log(actionList);

  // debugger
  actionList.data.movies.forEach((movie) => {
    // debugger
    const HTMLString = videoItemTemplate(movie)
    console.log(HTMLString);
  })

  // Con jquery: Asignamos el selector a una variable
  // const $home = $('.home')

  // Con Vanilla
  // Almacenamos todos los elementos que van a cambiar en el DOM.
  const $modal = document.getElementById('modal')
  const $actionContainer = document.querySelector('#action');
  const $dramaContainer = document.getElementById('drama');
  const $animationContainer = document.querySelector('#animation');
  const $modalOverlay = document.getElementById('overlay');
  const $hideModal = document.querySelector('#hide-modal');

  // Para buscar dentro de un elemento HTML ya capturado
  const $modalImage = $modal.querySelector('img')
  const $modaltitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  // Apuntamos al formulario featuring container
  const $featuringContainer = document.getElementById('featuring')
  const form = document.getElementById('form')
  const $home = document.getElementById('home')



})()
