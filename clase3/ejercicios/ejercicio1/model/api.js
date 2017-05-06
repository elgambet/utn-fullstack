const readJSON = require("read-json");
const writeJSON = require("write-json");
const path = require("path");
const uuid = require("uuid");

const booksFile = path.resolve(__dirname, "../data/books.json");
const categoriesFile = path.resolve(__dirname, "../data/categories.json");

const fetch = filename => {
  return new Promise((resolve, reject) =>
    readJSON(filename, (error, categories) => {
      if (error) {
        return reject(error);
      }

      resolve(categories);
    })
  );
};

const writeFile = (path, data) => {
  return new Promise((resolve, reject) =>
    writeJSON(path, data, error => {
      if (error) {
        return reject(error);
      }

      resolve(data);
    })
  );
};

const getById = (filename, id) => {
  return fetch(filename).then(elements =>
    elements.find(element => element.id == id)
  );
};

const add = (filename, element) => {
  return fetch(filename).then(elements => {
    element.id = uuid.v4();
    elements.push(element);
    return writeFile(filename, elements).then(() => element);
  });
};

const update = (filename, element) => {
  return fetch(filename).then(elements => {
    const index = elements.findIndex(el => element.id == el.id);
    if (index >= 0) {
      elements[index] = element;
      return writeFile(filename, elements).then(() => element);
    }
    return Promise.error("not found");
  });
};

const remove = (filename, id) => {
  return fetch(filename).then(elements => {
    elements = elements.filter(element => element.id != id);
    return writeFile(filename, elements);
  });
};

const getQuery = query => {
  try {
    return JSON.parse(query);
  } catch (err) {
    console.log("El string recibido no es un JSON");
    return {};
  }
};

exports.fetchBooks = query => {
  return fetch(booksFile).then(books => {
    // Recibimos parámetros de búsqueda
    query = getQuery(query);
    // Recibimos un id o un array
    if (query.category && query.category.id) {
      // Si es un id, creamos un array de un único elemento
      if (typeof query.category.id == "string") {
        query.category.id = { $in: [query.category.id] };
      }
      books = books.filter(
        book =>
          book.categories &&
          book.categories.some(category =>
            query.category.id["$in"].includes(category)
          )
      );
      return books;
    }
    return books;
  });
};

exports.getBookById = id => getById(booksFile, id);

exports.addBook = book => add(booksFile, book);

exports.updateBook = book => update(booksFile, book);

exports.removeBook = id => remove(booksFile, id);

exports.fetchCategories = () => fetch(categoriesFile);

exports.getCategoryById = id => getById(categoriesFile, id);

exports.addCategory = category => add(categoriesFile, category);

exports.updateCategory = category => update(categoriesFile, category);

exports.removeCategory = id => remove(categoriesFile, id);
