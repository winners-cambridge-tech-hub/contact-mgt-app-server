// repositories/category.repository.js
const models = require('../../models');
const CategoryDto  = require('../dto/category.dto');
const { CategoryError } = require('../exception/category-excepton');




class CategoryRepository {
  async save(categoryDto) {
    try {
      const newCategory = await models.Category.create(categoryDto);
      return newCategory;
    } catch (error) {
      // Handle specific database-related errors
      throw new CategoryError('Error creating a new category', 500);
    }
  }

  // Implement similar error handling for saveById and delete methods
  // ...

  async findAll() {
    try {
      return await models.Category.findAll();
    } catch (error) {
      throw new CategoryError('Error fetching categories', 500);
    }
  }

  async findById(id) {
    try {
      return await models.Category.findByPk(id);
    } catch (error) {
      throw new CategoryError('Error finding category by id', 500);
    }
  }
}

module.exports = {
  CategoryRepository,
};
