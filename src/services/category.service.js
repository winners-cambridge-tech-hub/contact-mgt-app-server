// services/category.service.js
const { CategoryDto } = require('../dto/category.dto');
const { CategoryRepository } = require('../repositories/category.repositories');
const { CategoryNotFoundError, CategoryError } = require('../exception/category-excepton');

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  async createNewCategory(categoryDto) {
    try {
      return await this.categoryRepository.save(categoryDto);
    } catch (error) {
        console.error('Error creating  new category:', error);
        throw new CategoryError('Error creating  new category', 500); 
      }
  }

  async getAllCategories(limit, offset) {
    try {
      return await this.categoryRepository.findAll(limit, offset);
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      const category = await this.categoryRepository.findById(id);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(categoryDto, id) {
    try {
      await this.getCategoryById(id);
      return await this.categoryRepository.saveById(categoryDto, id);
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      await this.getCategoryById(id);
      return await this.categoryRepository.delete(id);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CategoryService;
