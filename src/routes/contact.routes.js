const express = require('express');
const contactController = require('../controllers/contactController');
const models = require('../../models')

const router = express.Router();

router.post('/', contactController.createNewContact);
router.get('/:id', contactController.getOneContact);
router.get('/', contactController.getAllContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);

module.exports = router;
