const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
const { createComment, deleteComment } = require('../controllers/commentController');

// Create a new comment for a specific blog post
router.post('/:blogId', validateToken, createComment);

// Delete a comment for a specific blog post
router.delete('/:blogId/:commentId', validateToken, deleteComment);

module.exports = router;
