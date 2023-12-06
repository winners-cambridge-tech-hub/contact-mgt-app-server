// routes/category.routes.js
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

router.post('/', categoryController.createNewCategory);
router.get('/', categoryController.getAllCategories);
router.get('/:id', categoryController.getOneCategory);
router.put('/:id', categoryController.updateCategory);
router.delete('/:id', categoryController.deleteCategory);
router.post('/:categoryId/contacts/:contactId', categoryController.associateContactWithCategory);
router.get('/:categoryId/contacts', categoryController.getContactsByCategory);
module.exports = router;
