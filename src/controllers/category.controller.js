
// controllers/categoryController.js
const CategoryService = require('../services/category.service');
const  CategoryDto  = require('../dto/category.dto');
const { CategoryNotFoundError, CategoryError } = require('../exception/category-excepton');
const models = require('../../models');
const CategoryAssembler = require('../dto/category.assembler');

let categoryAssembler = new CategoryAssembler();
const categoryService = new CategoryService();

class CategoryController {
  async createNewCategory(req, res) {
    try {
      // Validate and process request body
      const categoryDto = new CategoryDto(/* Extract necessary data from req.body */);

      // Create new category
      const createdCategory = await categoryService.createNewCategory(categoryDto);

      // Respond with the created category
      const categoryDtoResponse = categoryAssembler.toDTO(createdCategory);
      res.status(201).json(categoryDtoResponse);
    } catch (error) {
      // Handle errors
      if (error instanceof CategoryError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Unexpected error in createNewCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async getAllCategories(req, res) {
    try {
      // Get all categories
      const categories = await categoryService.getAllCategories();

      // Respond with the categories
      const categoryDtos = categories.map(category => categoryAssembler.toDTO(category));
      res.json(categoryDtos);
    } catch (error) {
      // Handle errors
      console.error('Unexpected error in getAllCategories:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getOneCategory(req, res) {
    try {
      const categoryId = req.params.id;

      // Get category by ID
      const category = await categoryService.findOneById(categoryId);

      // Respond with the category
      const categoryDto = categoryAssembler.toDTO(category);
      res.json(categoryDto);
    } catch (error) {
      // Handle errors
      if (error instanceof CategoryNotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Unexpected error in getOneCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.id;
      // Validate and process request body
      const categoryDto = new CategoryDto(/* Extract necessary data from req.body */);

      // Update category
      const updatedCategory = await categoryService.update(categoryId, categoryDto);

      // Respond with the updated category
      const categoryDtoResponse = categoryAssembler.toDTO(updatedCategory);
      res.json(categoryDtoResponse);
    } catch (error) {
      // Handle errors
      if (error instanceof CategoryError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Unexpected error in updateCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async deleteCategory(req, res) {
    try {
      const categoryId = req.params.id;

      // Delete category
      await categoryService.delete(categoryId);

      // Respond with success message
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      // Handle errors
      if (error instanceof CategoryNotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Unexpected error in deleteCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async getContactsByCategoryAndCharacter(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const character = req.params.character;

      // Get contacts by category and character
    

      // Respond with the contacts
      res.json(/* List of contacts based on category and character */);
    } catch (error) {
      // Handle errors
      console.error('Unexpected error in getContactsByCategoryAndCharacter:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new CategoryController();
