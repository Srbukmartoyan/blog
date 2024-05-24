const express = require('express');
const upload = require('../config/multerConfig.js');
const FileUploadController = require('../controller/FileUploadController.js');

const router = express.Router();

router.post('/', upload.single('post-img'), FileUploadController.uploadFile);

module.exports = router;
