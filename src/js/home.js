
/*Clase #18: LocalStorage*/

(async function load(){

  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    if (data.data.movie_count > 0){
        return data;
    }
    throw new Error('No se encontró ningun resultado');
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
    try {
      const {
        data:{
          movies: pelis
        }
      } = await getData(`${initApi}list_movies.json?limit=1&query_term=${data.get('name')}`)
      const HTMLString = featuringTemplate(pelis[0])
      $featuringContainer.innerHTML = HTMLString;
    }catch(error){
      alert(error.message);
      $loader.remove()
      $home.classList.remove('search-active')
    }
  })

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
      const HTMLString = videoItemTemplate(movie, category);
      const movieElement = createTemplate(HTMLString);
      $container.append(movieElement);
      const image = movieElement.querySelector('img');
      image.addEventListener('load', (event) => {
        event.srcElement.classList.add('fadeIn');
      })
      addEventClick(movieElement);
    })
  }

  // Creo la funcion que controlara el manejo del localStorage de acuerdo a mis
  // arrays de datos.
  async function cacheExist(category){
    const listName = `${category}List`
    const cacheList = window.localStorage.getItem(listName)
    if (cacheList){
        // Devuelvo las listas a su estado original de arrays con JSON.parse()
        return JSON.parse(cacheList)
    }

    cons data = await getData(`${initApi}list_movies.json?genre=${category}`)
  }

  // const { data: { movies: actionList } } = await getData(initApi+'list_movies.json?genre=action')
  const actionList = await cacheExist('action')
  // DevFree: Guardo los arrays de datos en el local Storage.
  // Conviertiendo el array en string con JSON.stringify()
  window.localStorage.setItem('actionList', JSON.stringify(actionList))
  const $actionContainer = document.querySelector('#action');
  renderMovieList(actionList ,$actionContainer, 'action')

  const { data: { movies: dramaList } } = await getData(initApi+'list_movies.json?genre=drama')
  window.localStorage.setItem('dramaList', JSON.stringify(dramaList))
  const $dramaContainer = document.getElementById('drama');
  renderMovieList(dramaList ,$dramaContainer, 'drama')
  const { data: { movies: amationList } } = await getData(`${initApi}list_movies.json?genre=animation`)
  window.localStorage.setItem('amationList', JSON.stringify(amationList))
  const $animationContainer = document.querySelector('#animation');
  renderMovieList(amationList ,$animationContainer, 'animation')

  const $modal = document.getElementById('modal')
  const $modalOverlay = document.getElementById('overlay');
  const $hideModal = document.querySelector('#hide-modal');

  const $modalImage = $modal.querySelector('img')
  const $modaltitle = $modal.querySelector('h1')
  const $modalDescription = $modal.querySelector('p')

  function findById(list, id){
    return list.find((movie) => {
      return movie.id === parseInt(id, 10)
    })
  }

  function findMovie(id, category){
    switch (category){
      case 'action' : {
        return findById(actionList, id)
      }
      case 'drama' : {
        return findById(dramaList, id)
      }
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
