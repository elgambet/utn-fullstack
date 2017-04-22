/*
* En un archivo ej1.json, guardar todas los nombres de las peliculas en las que aparece el personaje Luke Skywalker. 
* 
* 1) Obtener los ids de las peliculas leyendo el json del archivo people.json buscando por id=1 
* 2) Obtener las peliculas del archivo films.json
* 3) Escribir el resultado en un nuevo archivo (ej1.json) con el siguiente formato:
*    ["pelicula1", "pelicula2", ...]
*/

const fs = require('fs');

fs.readFile('../data/people.json', 'utf-8', (err, data) => {
  if (err) {
    return console.log('No se pudo leer el archivo ../data/people.json');
  }
	
	try{
		const people = JSON.parse(data);
	} catch ( err ) {
		console.log('this is not a json');
	}
	
});