/*Clase #4: Peticiones a API con jQuery y Vanilla*/

/*Con jQuery*/

$.ajax('https://randomuser.me/api/',{
  method: 'GET',
  success: function(data){
    console.log(data)
  },
  error: function(error){
    console.log(error)
  }
})

/*Con Vanilla*/

fetch('https://randomuser.me/api/dd')
  .then(function(response){
    console.log('Desde Vanilla')
    // console.log(response)
    return response.json()
  })
  .then(function(data){
    console.log('user', data.results[0].name.first)
  })
  .catch(function(){
    console.log('Algo fallo :(')
  })
