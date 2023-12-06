// services/category.service.js
const  CategoryDto  = require('../dto/category.dto');
const { CategoryRepository } = require('../repositories/category.repositories');
const Api404Error  = require("../exception/api404Error")
const { CategoryNotFoundError, CategoryError } = require('../exception/category-excepton');
const { ContactService } = require('./contact.service');

class CategoryService {
  constructor() {
    this.categoryRepository = new CategoryRepository();
    this.contactService = new ContactService(); 
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

  async getCategoryById(categoryId) {
    try {
      const category = await this.categoryRepository.findById(categoryId);
      return category;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(categoryDto, id) {
    try {
      console.log('Updating category. ID:', id, 'DTO:', categoryDto);
      const categoryToUpdate = await this.getCategoryById(id);
      console.log('Category to update:', categoryToUpdate);
  
      const updatedCategory = await this.categoryRepository.update(id, categoryDto);
      console.log('Category updated successfully:', updatedCategory);
  
      return updatedCategory;
    } catch (error) {
      console.error('Error updating category:', error);
      throw new Api404Error(`Category not found: ${error.message}`);
    }
  }
  

  async associateContactWithCategory(categoryId, contactId) {
    try {
      const category = await this.getCategoryById(categoryId);
      const contact = await this.contactService.getOneContact(contactId);
  
      // Associate contact with category
      await category.addContact(contact);
  
      return category;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      await this.getCategoryById(id);
      return await this.categoryRepository.delete(id);
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new CategoryError('Error deleting category', 500);
    }
  }
}

module.exports = CategoryService;
