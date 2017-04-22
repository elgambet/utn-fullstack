/*
* Refactor ej1.
*
*1) Crear una funcione (readJSON) para leer y parsear los archivos JSON.
*2) Crear una función (writeJSON) para convenrtir objeto a JSON y grabarlo en un archivo.
*/

// Inclusión del módulo (core) "fs", necesario para trabajar con el file system
// https://nodejs.org/api/modules.html#modules_core_modules
const fs = require('fs');

// constantes con los nombres de los archivos
const peopleFile = 'people.json';
const filmsFile = 'films.json';
const ej2File = 'ej2.json';

/**
 * Leer un archivo y retornar un json a partir de su contenido
 * @param {string} fileName 
 * @param {function} callback 
 */
const readJSON = (fileName, callback) => {
	// leer el archivo fileName
  fs.readFile(`../data/${fileName}`, 'utf-8', (err, data) => {
    if (err) {
      // Continuation Passing Style (error) + Early return (undefined)
      const error = new Error(`No se pudo leer el archivo ${peopleFile}`);
      return callback(error);
    }

		// obtener el json
    let parsed = null;
    try {
      parsed = JSON.parse(data);
    } catch (error) {
      const error = new Error(`No se pudo parsear el archivo ${fileName}`);
      // Continuation Passing Style (error) + Early return (undefined)
      return callback(error);
    }

    // Continuation Passing Style (success) + Early return (undefined)
    callback(null, parsed);
  });
};

/**
 * Recibe un objeto y lo escribe en un archivo en forma de json
 * @param {string} fileName 
 * @param {object} dataObject 
 * @param {function} callback 
 */
const writeJSON = (fileName, dataObject, callback) => {
  // JSON.stringify no genera errores, por lo que no es necesario el Try Catch
  const data = JSON.stringify(dataObject);

	// escribir en un archivo
  fs.writeFile(`./${fileName}`, data, err => {
    if (err) {
      const error = new Error(`No se pudo escribir el archivo ${fileName}`);

      // Continuation Passing Style (error) + Early return (undefined)
      return callback(error);
    }

    // Continuation Passing Style (success, empty data)
    callback(null);
  });
};

// obtener el array de personas
readJSON(peopleFile, (err, people) => {
	// early return en caso de error
  if (err) {
    return console.log(err);
  }

	// obtener el objeto de luke
  const luke = people.find(character => character.id === '1');

	// obtener el array de películas
  readJSON(filmsFile, (err, films) => {
		// early return en caso de error
    if (err) {
      return console.log(err);
    }

		// obtener los nombres de las películas de luke
    const lukeFilms = films
			.filter(film => (luke.films.indexOf(film.id) >= 0))
			.map(film => film.title);

		// escribir en un archivo
    writeJSON(ej2File, JSON.stringify(lukeFilms), err => {
			// early return en caso de error
      if (err) {
        return console.log(err);
      }
      console.log('The luke films has been saved!');
    });
  });
});
