const api = require("./api");

exports.getAll = () => api.fetchCategories();

exports.getById = id => api.getCategoryById(id);

exports.add = category => api.addCategory(category);

exports.update = category => api.updateCategory(category);

exports.remove = id => api.removeCategory(id);
