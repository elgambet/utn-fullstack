/*
* En un archivo ej1.json, guardar todas los nombres de las peliculas en las que aparece
* el personaje Luke Skywalker. 
* 
* 1) Obtener los ids de las peliculas leyendo el json del archivo people.json buscando por id=1 
* 2) Obtener las peliculas del archivo films.json
* 3) Escribir el resultado en un nuevo archivo (ej1.json) con el siguiente formato:
* 
*  ["pelicula1", "pelicula2", ...]
*/

// Inclusión del módulo (core) "fs", necesario para trabajar con el file system
// https://nodejs.org/api/modules.html#modules_core_modules
const fs = require('fs');

// constantes con las ubicaciones de los archivos
const peopleFile = '../data/people.json';
const filmsFile = '../data/films.json';
const ej1File = './ej1.json';

// leer el archivo de personas
fs.readFile(peopleFile, 'utf-8', (err, pdata) => {
	// early return en caso de error
  if (err) {
    return console.log(`No se pudo leer el archivo ${peopleFile}`);
  }

	// obtener el json de personas
  let people = null;
  try {
    people = JSON.parse(pdata);
  } catch (error) {
    return console.log(`No se pudo parsear el archivo ${peopleFile}`);
  }

	// obtener el objeto de luke
  const luke = people.find(character => character.id === '1');

	// leer el archivo de películas
  fs.readFile(filmsFile, (err, fdata) => {
		// early return en caso de error
    if (err) {
      return console.log(`No se pudo leer el archivo ${filmsFile}`);
    }

		// obtener el json de películas
    let films = null;
    try {
      films = JSON.parse(fdata);
    } catch (error) {
      return console.log(`No se pudo parsear el archivo ${filmsFile}`);
    }

		// obtener los nombres de las películas de luke
    const lukeFilms = films
			.filter(film => luke.films.includes(film.id))
			.map(film => film.title);

		// escribir en un archivo
    fs.writeFile(ej1File, JSON.stringify(lukeFilms), err => {
			// early return en caso de error
      if (err) {
        return console.log(`No se pudo escribir el archivo ${ej1File}`);
      }
      console.log('The luke films has been saved!');
    });
  });
});
