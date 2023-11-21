const express = require('express');
const excelController = require("../controllers/excel.controller");
const models = require('../../models')
const upload = require("../middlewares/upload");


const router = express.Router();

router.get('/hello', excelController.getTutorials);
router.post("/upload", upload.single("file"), excelController.upload);

module.exports = router;
