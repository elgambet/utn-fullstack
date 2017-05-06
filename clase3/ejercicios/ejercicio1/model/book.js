const api = require("./api");

exports.getAll = query => api.fetchBooks(query);

exports.getById = id => api.getBookById(id);

exports.getByCategoryId = id =>
  api
    .fetchBooks()
    .then(books => books.filter(book => book.categories.includes(id)));

exports.add = book => api.addBook(book);

exports.update = book => api.updateBook(book);

exports.remove = id => api.removeBook(id);
