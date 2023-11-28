// exceptions/category-exceptions.js
class CategoryError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.name = this.constructor.name;
    }
  }
  
  class CategoryNotFoundError extends CategoryError {
    constructor(message = 'Category not found') {
      super(message, 404);
    }
  }
  
  module.exports = {
    CategoryError,
    CategoryNotFoundError,
  };
  