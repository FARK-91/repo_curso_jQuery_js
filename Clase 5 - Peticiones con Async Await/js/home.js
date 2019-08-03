
/*Clase #5: Funciones asincronas*/

(async function load(){
  // await
  // La funcionalidad de await solo funciona cuando es invocada desde una funcion
  // asincrona.
  // await siempre va a retornar una promesa.

  async function getData(url){
    const response = await fetch(url)
    const data = await response.json()
    return data;
  }

  //Para el ejercicio: traemos datos de categorias de peliculas.

  const actionList = await getData('https://yts.lt/api/v2/list_movies.json?genre=action')
  const dramaList = await getData('https://yts.lt/api/v2/list_movies.json?genre=drama')
  const amationList = await getData('https://yts.lt/api/v2/list_movies.json?genre=animation')

  console.log('actionList', actionList)
  console.log('terrorList', dramaList)
  console.log('amationList', amationList)

  // De forma no Asincrona
  // let terrorList;
  // getData('https://yts.lt/api/v2/list_movies.json?genre=terror')
  //   .then(function(data){
  //     terrorList = data
  //     console.log('terrorList', data)
  //   })

})()
