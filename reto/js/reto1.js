
/*Clase #17: Reto*/

// DevFree: Paso 1) Crear funcion asincrona que cargue con el DOM
(async function load(){
  // Paso 2) Crear funcion asincrona que haga peticion al API externo
  async function getUserData(url){
    const response = await fetch(url)
    const data = await response.json()

    if (data.info.results > 0){
      return data
    }
    throw new Error('No se encontró ningun resultado');
  }

  // Paso 10) Se crea nuevo HTML
  function userItemTemplate(user){
    return(`<h2 class="sidebarPlaylist-title">Playlist de amigos</h2>
    <ul class="playlistFriends">
      <li class="playlistFriends-item">
        <a href="#">
          <img src="${user.picture.thumbnail}" alt="echame la culpa" />
          <span>
            ${user.name.first} ${user.name.last}
          </span>
        </a>
      </li>
    </ul>`)
  }

  // Paso 11) Se pasa el nuevo HTML de string a formato de etiqueta HTML.
  function createTemplate(HTMLString){
    console.log(HTMLString);
    const $html = document.implementation.createHTMLDocument();
    $html.body.innerHTML = HTMLString;
    return $html.body.children[1]
  }

  // Paso 7) Se crea funcion para renderizar datos
  function renderUserList(list, $container){
    console.log($container);
    // Paso 8) Se remueve el o los elementos que se van a sustituir.
    $container.children[1].remove();
    // Paso 9) Se itera sobre el Array de datos y al mismo tiempo se crea el
    // nuevo HTML en formato string para luego transformarlo en un template
    // real de HTML.
    list.forEach((user) => {
      const HTMLString = userItemTemplate(user);
      const playListElement = createTemplate(HTMLString);
      // Paso 12) Se sustituye el viejo HTML por el nuevo.
      $container.append(playListElement);
    })
  }

  // Paso 3) Crear variable estatica para el API
  const STATIC_API = 'https://randomuser.me/api'
  // Paso 4) Destructurar el objeto de la consulta para solo traer el array
  // necesario.
  const { results: $userList} = await getUserData(`${STATIC_API}?results=8`)
  // Paso 5) Crear variables que apuntan a los elementos que cambiaran en el DOM
  const $playListContainer = document.querySelector('#musicPlayList')
  // Paso 6) Se hace llamado a primera funcion, para renderizar los nuevos datos.
  renderUserList($userList, $playListContainer)

})()
