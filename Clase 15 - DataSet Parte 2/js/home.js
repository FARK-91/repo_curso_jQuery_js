
/*Clase #15: DataSet parte 2*/

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

  // Destructuramos el objeto que devuelve la peticion
  const { data: { movies: actionList } } = await getData(initApi+'list_movies.json?genre=action')
  const { data: { movies: dramaList } } = await getData(initApi+'list_movies.json?genre=drama')
  const { data: { movies: amationList } } = await getData(`${initApi}list_movies.json?genre=animation`)

  function videoItemTemplate(movie, category){
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
  renderMovieList(actionList ,$actionContainer, 'action')

  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList ,$dramaContainer, 'drama')
  const $animationContainer = document.querySelector('#animation');
  renderMovieList(amationList ,$animationContainer, 'animation')

  const $modal = document.getElementById('modal')
  const $modalOverlay = document.getElementById('overlay');
  const $hideModal = document.querySelector('#hide-modal');

  const $modalImage = $modal.querySelector('img')
  const $modaltitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  // Despliegue de la funcion findById para manipular listas de peliculas, segun
  // categoria enviada por el usuario.
  function findById(list, id){
    return list.find((movie) => {
      // Fucion parseInt(id, 10) para converir variables a numero entero en base 10
      return movie.id === parseInt(id, 10)
    })
  }

  // Despliegue de la funcion findMovie
  function findMovie(id, category){
    // Filtramos segun la categoria de peliculas, para saber en cual lista vamos
    // a buscar los datos.
    switch (category){
      case 'action' : {
        return findById(actionList, id)
      }
      case 'drama' : {
        return findById(dramaList, id)
      }
      // Para categoria de animacion
      default : {
        return findById(amationList, id)
      }
    }
  }

  function showModal($element){
    $modalOverlay.classList.add('active');
    $modal.style.animation = 'modalIn .8s forwards';
    const id = $element.dataset.id;
    const category = $element.dataset.category;
    // DevFree: Llamamos funcion encargada de conseguir los datos de las pelis
    const data = findMovie(id, category)
    $modalImage.setAttribute('src', data.medium_cover_image);
    $modaltitle.textContent = data.title
    $modalDescription.textContent = data.description_full;
  }

  $hideModal.addEventListener('click', hideModal);

  function hideModal(){
    $modalOverlay.classList.remove('active');
    $modal.style.animation = 'modalOut .8s forwards';
  }


})()
