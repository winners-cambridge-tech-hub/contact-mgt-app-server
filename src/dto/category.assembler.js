// assemblers/categoryAssembler.js
const CategoryDTO = require('./category.dto');

class CategoryAssembler {
  static toDTO(category) {
    return new CategoryDTO(category.name);
  }
}

module.exports = CategoryAssembler;
