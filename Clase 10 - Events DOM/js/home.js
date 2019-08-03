
/*Clase #10: Manipulando Eventos en el DOM*/

(async function load(){

  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }

  const $form = document.getElementById('form')
  $form.addEventListener('submit', (event) => {
    // debugger
    // Para quitar la funcionalidad por defecto del submit de enviar data, cada
    // que le de submit.
    event.preventDefault();
  })

  const initApi = 'https://yts.lt/api/v2/'
  const actionList = await getData(initApi+'list_movies.json?genre=action')
  const dramaList = await getData(initApi+'list_movies.json?genre=drama')
  const amationList = await getData(initApi+'list_movies.json?genre=animation')

  // Creando el Template con datos que vienen del API: desde Vanilla

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

  // Delegando carga de trabajo, se utilizan funciones para poder reutilizarlas
  // en otra parte del codigo donde la necesites.

  function createTemplate(HTMLString){
    const $html = document.implementation.createHTMLDocument();
    $html.body.innerHTML = HTMLString;
    return $html.body.children[0]
  }

  function addEventClick($element){
    $element.addEventListener('click', () => {
      alert('click')
    })
  }

  function renderMovieList(list, $container){
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement);
      addEventClick(movieElement)
    })
  }

  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList.data.movies ,$actionContainer)

  // Almacenamos todos los elementos que van a cambiar en el DOM.
  const $modal = document.getElementById('modal')
  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList.data.movies ,$dramaContainer)
  const $animationContainer = document.querySelector('#animation');
  renderMovieList(amationList.data.movies ,$animationContainer)
  const $modalOverlay = document.getElementById('overlay');
  const $hideModal = document.querySelector('#hide-modal');

  // Para buscar dentro de un elemento HTML ya capturado
  const $modalImage = $modal.querySelector('img')
  const $modaltitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  // Apuntamos al formulario featuring container
  const $featuringContainer = document.getElementById('featuring')
  const $home = document.getElementById('home')


})()
