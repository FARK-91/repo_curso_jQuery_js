
/*Clase #17: Reto 2*/


(async function load(){

  async function getMovieData(url){
    const response = await fetch(url)
    const data = await response.json()
    // return data
    // debugger
    if (data.data.movie_count > 0){
      return data
    }
    throw new Error('No se encontró ningun resultado');
  }


  function movieItemTemplate(movie){
    return(`<h2 class="sidebarPlaylist-title">Mi Playlist <span class="btn warning">Escuchar Playlist</span> </h2>
    <ul class="myPlaylist">
      <li class="myPlaylist-item">
        <a href="#">
          <span>
            ${movie.title}
          </span>
        </a>
      </li>
    </ul>`)
  }


  function createTemplate(HTMLString){
    console.log(HTMLString);
    const $html = document.implementation.createHTMLDocument();
    $html.body.innerHTML = HTMLString;
    return $html.body.children[1]
  }


  function renderUserList(list, $container){
    $container.children[1].remove();
    list.forEach((movie) => {
      const HTMLString = movieItemTemplate(movie);
      const playListElement = createTemplate(HTMLString);

      $container.append(playListElement);
    })
  }


  const STATIC_API = 'https://yts.lt/api/v2/'
  // const $movieList = await getMovieData(`${STATIC_API}list_movies.json?limit=9`)
  const { data: { movies: $movieList }} = await getMovieData(`${STATIC_API}list_movies.json?limit=9`)
  const $playListContainer = document.querySelector('#moviePlayList')
  renderUserList($movieList, $playListContainer)

})()
