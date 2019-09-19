
/*Clase #14: DataSet*/

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

    $home.classList.add('search-active')

    const $loader = document.createElement('img');
    setAttributes($loader,{
      src: 'src/images/loader.gif',
      height: 50,
      width: 50,
    })
    $featuringContainer.append($loader)

    const data = new FormData($form);
    const {
      data:{
        movies: pelis
      }
    } = await getData(`${initApi}list_movies.json?limit=1&query_term=${data.get('name')}`)
    const HTMLString = featuringTemplate(pelis[0])
    $featuringContainer.innerHTML = HTMLString;
  })


  const actionList = await getData(initApi+'list_movies.json?genre=action')
  const dramaList = await getData(initApi+'list_movies.json?genre=drama')
  const amationList = await getData(`${initApi}list_movies.json?genre=animation`)

  // Agregamos parametro category
  function videoItemTemplate(movie, category){
    // Agregamos data-id para obtener dinamicamente el id de la pelicula
    // lo mismo para data-category y obtenemos la categoria de la peli.
    return(`<div class="primaryPlaylistItem" data-id="${movie.id}" data-category="${category}">
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
      showModal($element)
    })
  }

  function renderMovieList(list, $container, category){
    $container.children[0].remove();
    list.forEach((movie) => {
      const HTMLString = videoItemTemplate(movie, category)
      const movieElement = createTemplate(HTMLString)
      $container.append(movieElement);
      addEventClick(movieElement)
    })
  }

  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList.data.movies ,$actionContainer, 'action')

  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList.data.movies ,$dramaContainer, 'drama')
  const $animationContainer = document.querySelector('#animation');
  renderMovieList(amationList.data.movies ,$animationContainer, 'animation')

  const $modal = document.getElementById('modal')
  const $modalOverlay = document.getElementById('overlay');
  const $hideModal = document.querySelector('#hide-modal');

  const $modalImage = $modal.querySelector('img')
  const $modaltitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  // Agregamos parametro $element en a la funcion showModal
  function showModal($element){
    $modalOverlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    // Aplico la funcion dataset para obtener todos los data values definidos
    // en el elemento HTML.
    const id = $element.dataset.id;
    const category = $element.dataset.category;
  }

  $hideModal.addEventListener('click', hideModal);

  function hideModal(){
    $modalOverlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }


})()
