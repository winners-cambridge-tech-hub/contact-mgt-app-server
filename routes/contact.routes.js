const express = require('express');
const contactController = require('../controllers/contactController');
const models = require('../models');

const router = express.Router();

router.post('/', contactController.create);
router.get('/:id', contactController.getOneContact);
router.get('/', contactController.getAllContact);
router.patch('/:id', contactController.update);
router.delete('/:id', contactController.destroy);

module.exports = router;
