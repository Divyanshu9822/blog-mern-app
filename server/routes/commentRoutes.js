const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
const { addComment, deleteComment } = require('../controllers/commentController');

// Create a new comment for a specific blog post
router.post('/:blogId', validateToken, addComment);

// Delete a comment for a specific blog post
router.delete('/:blogId/:commentId', validateToken, deleteComment);

module.exports = router;
