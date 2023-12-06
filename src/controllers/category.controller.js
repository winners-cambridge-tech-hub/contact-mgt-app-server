
const CategoryService = require('../services/category.service');
const {ContactService} = require('../services/contact.service')
const CategoryDto = require('../dto/category.dto');
const { CategoryNotFoundError, CategoryError } = require('../exception/category-excepton');
const Api404Error = require("../exception/api404Error")
const models = require('../../models');

const CategoryAssembler = require('../dto/category.assembler');

const categoryAssembler = new CategoryAssembler();

const categoryService = new CategoryService();

const contactService = new ContactService();

class CategoryController {
  async createNewCategory(req, res) {
    try {
      // Validate and process request body
      const { name } = req.body; // Extract necessary data from req.body
      const categoryDto = new CategoryDto(name);

      // Create new category
      const createdCategory = await categoryService.createNewCategory(categoryDto);

      // Respond with the created category
      const categoryDtoResponse = CategoryAssembler.toDTO(createdCategory);
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


  async associateContactWithCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;
      const contactId = req.params.contactId;

      // Validate if the category and contact exist
      const category = await categoryService.getCategoryById(categoryId);

      if (!category) {
          throw new Api404Error(`Category id: ${categoryId} does not exist.`);
      }

      // Validate if the contact exists
      const contact = await contactService.getOneContact(contactId);
      if (!contact) {
          throw new Api404Error(`Contact id: ${contactId} does not exist.`);
      }
      // Associate contact with category
      await categoryService.associateContactWithCategory(categoryId, contactId).then(result => {
        res.status(200).json({ message: 'Contact associated with category successfully' ,result })
  
      })
    
    } catch (error) {
      console.error('Error in associateContactWithCategory:', error);
      if (!category) {
        throw new CategoryNotFoundError('Category not found', 404);
    }
    if (!contact) {
      throw new ContactNotFoundError('Contact not found', 404);
  }
    }
  }

  async getAllCategories(req, res) {
    try {
      // Get all categories
      const categories = await categoryService.getAllCategories();

      // Respond with the categories
      const categoryDtos = categories.map(category => CategoryAssembler.toDTO(category));
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
      const category = await categoryService.getCategoryById(categoryId);

      // Respond with the category
      const categoryDto = CategoryAssembler.toDTO(category);
      res.json(categoryDto);
    } catch (error) {
      // Handle errors
      if (error instanceof CategoryNotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } 
      else if (error instanceof CategoryError) {
        res.status(500).json({ error: error.message });
      }
      else {
        console.error('Unexpected error in getOneCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }

  async updateCategory(req, res) {
    try {
      const categoryId = req.params.id;
      // Validate and process request body
      const { name } = req.body;
      const categoryDto = new CategoryDto(name);

      // Update category
      const updatedCategory = await categoryService.updateCategory (categoryDto, categoryId);

      // Respond with the updated category
      const categoryDtoResponse = CategoryAssembler.toDTO(updatedCategory);
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
      await categoryService.deleteCategory(categoryId);

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

  async getContactsByCategory(req, res) {
    try {
      const categoryId = req.params.categoryId;

      // Get category by ID
      const category = await models.Category.findByPk(categoryId, {
        include: {
          model: models.Contact,
          attributes: ['id', 'first_name', 'last_name', 'email'], 
        },
      });

      if (!category) {
        throw new Api404Error(`Category id: ${categoryId} does not exist.`);
      }

      // Extract contacts from the category
      const contacts = category.Contacts || [];
      const result = {
        category: {
          id: category.id,
          name: category.name,
        },
        contacts: contacts,
      };
      // Respond with the contacts
      res.json(result);
    } catch (error) {
      // Handle errors
      if (error instanceof CategoryNotFoundError) {
        res.status(error.statusCode).json({ error: error.message });
      } else {
        console.error('Unexpected error in getContactsByCategory:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  }
}

module.exports = new CategoryController();
