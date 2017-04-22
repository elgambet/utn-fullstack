/**
* Refactor ej2. 
* 
* 1) Cambiar la API de readJSON y writeJSON para retornar promises.
* 2) Modificar el flow principal del programa usando promises en lugar de callbacks anidados
*/

// Inclusión del módulo (core) "fs", necesario para trabajar con el file system
// https://nodejs.org/api/modules.html#modules_core_modules
const fs = require('fs');

// constantes con los nombres de los archivos
const peopleFile = 'people.json';
const filmsFile = 'films.json';
const ej3File = 'ej3.json';

/**
 * Leer un archivo y retornar un json a partir de su contenido
 * @param {string} fileName 
 */
const readJSON = fileName => {
  return new Promise((resolve, reject) => {
    fs.readFile(`../data/${fileName}`, (err, data) => {
      if (err) {
				// early return en caso de error
        // Return a promise rejected
        const error = new Error(`No se pudo leer el archivo ${peopleFile}`);
        return reject(error);
      }

			// obtener el json
      let parsed = null;
      try {
        parsed = JSON.parse(data);
      } catch (error) {
        const error = new Error(`No se pudo parsear el archivo ${fileName}`);
				// early return en caso de error
        // Return a promise rejected
        return reject(error);
      }

      // Return a promise resolved
      return resolve(parsed);
    });
  });
};

/**
 * Recibe un objeto y lo escribe en un archivo en forma de json
 * @param {string} fileName 
 * @param {object} dataObject
 */
const writeJSON = (fileName, dataObject) => {
  // JSON.stringify no genera errores, por lo que no es necesario el Try Catch
  const data = JSON.stringify(dataObject);

  return new Promise((resolve, reject) => {
    fs.writeFile(`./${fileName}`, data, err => {
      if (err) {
        const error = new Error(`No se pudo escribir el archivo ${fileName}`);
				// early return en caso de error
        // Return a promise rejected
        return reject(error);
      }

      // Continuation Passing Style (success, empty data)
			// Return a promise resolved
      return resolve(null);
    });
  });
};

let luke = null;
let lukeFilms = null;

// obtener el array de personas
readJSON(peopleFile)
  .then(people => {
		// obtener el objeto de luke
    luke = people.find(character => character.id === '1');
		// obtener el array de películas
    return readJSON(filmsFile);
  })
  .then(films => {
		// obtener los nombres de las películas de luke
    lukeFilms = films.filter(film => luke.films.includes(film.id)).map(film => film.title);
		// escribir en un archivo
    return writeJSON(ej3File, lukeFilms);
  })
  .then(() => {
    console.log('The luke films has been saved!');
  })
  .catch(err => {
    console.log(err);
  });