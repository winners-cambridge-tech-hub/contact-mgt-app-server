const express = require('express')
const postController = require('../controllers/post.controllers')

const router = express.Router();

router.get('/', postController.index);

module.exports = router;