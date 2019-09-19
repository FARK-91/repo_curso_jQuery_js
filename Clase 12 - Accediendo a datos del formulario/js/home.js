
/*Clase 12 - Accediendo a datos del formulario*/

(async function load(){

  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }

  const $form = document.getElementById('form')
  const $home = document.getElementById('home')
  const $featuringContainer = document.getElementById('featuring')
  const initApi = 'https://yts.lt/api/v2/'

  function featuringTemplate(peli){
    return(`<div class="featuring">
              <div class="featuring-image">
                <img src="${peli.medium_cover_image}" width="70" height="100" alt="">
              </div>
              <div class="featuring-content">
                <p class="featuring-title">Pelicula encontrada</p>
                <p class="featuring-album">${peli.title}</p>
              </div>
            </div>`)
  }

  function setAttributes($element, attributes){
    for (const attribute in attributes){
      $element.setAttribute(attribute, attributes[attribute])
    }
  }

  $form.addEventListener('submit', async (event) => {
    event.preventDefault();
    // anadimos la clase search-active solo cuando el usuario haga una busqueda.
    $home.classList.add('search-active')
    // Se crea un loader para la busqueda de peliculas por el formulario.
    const $loader = document.createElement('img');
    setAttributes($loader,{
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)
    // Buscamos la pelicula escrita por el usuario, en el API.
    // Con la funcion FormData podemos acceder a los datos de un formulario
    // expresado en HTML, para este caso capturamos lo que escriba el usuario
    // en el buscador.
    const data = new FormData($form);
    const peli = await getData(`${initApi}list_movies.json?limit=1&query_term=${data.get('name')}`)
    // debugger
    const HTMLString = featuringTemplate(peli.data.movies[0])
    $featuringContainer.innerHTML = HTMLString;
  })


  const actionList = await getData(initApi+'list_movies.json?genre=action')
  const dramaList = await getData(initApi+'list_movies.json?genre=drama')
  const amationList = await getData(`${initApi}list_movies.json?genre=animation`)


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

  function createTemplate(HTMLString){
    const $html = document.implementation.createHTMLDocument();
    $html.body.innerHTML = HTMLString;
    return $html.body.children[0]
  }

  function addEventClick($element){
    $element.addEventListener('click', () => {
      showModal()
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

  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList.data.movies ,$dramaContainer)
  const $animationContainer = document.querySelector('#animation');
  renderMovieList(amationList.data.movies ,$animationContainer)

  const $modal = document.getElementById('modal')
  const $modalOverlay = document.getElementById('overlay');
  const $hideModal = document.querySelector('#hide-modal');

  const $modalImage = $modal.querySelector('img')
  const $modaltitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  function showModal(){
    $modalOverlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
  }

  $hideModal.addEventListener('click', hideModal);

  function hideModal(){
    $modalOverlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }


})()
