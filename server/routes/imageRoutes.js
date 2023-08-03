const express = require('express');
const router = express.Router();
const { handleImageUpload } = require('../controllers/imageController');

// Handle image upload
router.post('/', handleImageUpload);

module.exports = router;
