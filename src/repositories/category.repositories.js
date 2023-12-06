// repositories/category.repository.js
const models = require('../../models');
const CategoryDto  = require('../dto/category.dto');
const { CategoryError, CategoryNotFoundError } = require('../exception/category-excepton');





class CategoryRepository {
  async save(categoryDto) {
    try {

      if (!categoryDto.name || categoryDto.name.trim() === '') {
        throw new CategoryError('Category name cannot be null', 400);
      }
      console.log('Saving category with DTO:', categoryDto);

      const newCategory = await models.Category.create(categoryDto);

      return newCategory;
    } catch (error) {
      // Handle specific database-related errors
      console.error('Error creating a new category:', error); 
      throw new CategoryError('Error creating a new category', 500);
    }
  }


  async findAll() {
    try {
      return await models.Category.findAll();
    } catch (error) {
      throw new CategoryError('Error fetching categories', 500);
    }
  }

  async findById(id) {
    try {
      const category = await models.Category.findByPk(id);
      if (!category) {
        throw new CategoryNotFoundError(`Category not found with id: ${id}`, 404);
      }
    
      return category;
    } catch (error) {
      console.error(`Error finding category by id (${id}):`, error.message);
      throw new CategoryError('Error finding category by id', 500);
    }
  }
  
  async delete(id) {
    try {
      const deletedRowCount = await models.Category.destroy({
        where: {
          id: id
        }
      });

      if (deletedRowCount === 0) {
        throw new CategoryError('Category not found', 404);
      }

      return deletedRowCount;
    } catch (error) {
      console.error('Error deleting category:', error);
      throw new CategoryError('Error deleting category', 500);
    }
  }

  async update(id, categoryDto) {
    try {
      // console.log('Updating category in repository. ID:', id, 'DTO:', categoryDto);
  
      const [updatedRowsCount] = await models.Category.update(
        categoryDto,
        {
          where: { id: id },
        }
      );
  
      if (updatedRowsCount === 0) {
        throw new CategoryNotFoundError(`Category not found with id: ${id}`, 404);
      }
  
      const updatedCategory = await this.findById(id);
  
      // console.log('Updated rows count:', updatedRowsCount);
      // console.log('Updated categories:', updatedCategory);
  
      return updatedCategory; // Return the updated category
    } catch (error) {
      console.error('Error updating category in repository:', error);
      throw new CategoryError('Error updating category', 500);
    }
  }
  
  
  
  
  
}



module.exports = {
  CategoryRepository,
};
