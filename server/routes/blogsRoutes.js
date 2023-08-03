const express = require('express');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();
const { getBlogs, getMyBlogs, getBlog, postBlog, updateBlog, deleteBlog } = require('../controllers/blogsController');

router.get('/my-blogs', validateToken, getMyBlogs);
router.post('/', validateToken, postBlog);
router.put('/my-blogs/:id', validateToken, updateBlog);
router.delete('/my-blogs/:id', validateToken, deleteBlog);
router.get('/:id', getBlog); // This route should be placed after the other specific routes
router.get('/', getBlogs);

module.exports = router;
