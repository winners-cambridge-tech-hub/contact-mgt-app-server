const express = require('express');
const contactController = require('../controllers/contact.controller');
const models = require('../../models')
const upload = require("../middlewares/upload");

const router = express.Router();




router.post('/', contactController.createNewContact);



router.get('/:id', contactController.getOneContact);
router.get('/', contactController.getAllContact);
router.put('/:id', contactController.updateContact);
router.delete('/:id', contactController.deleteContact);
router.post("/upload", upload.single("file"), contactController.uploadContacts);

module.exports = router;
