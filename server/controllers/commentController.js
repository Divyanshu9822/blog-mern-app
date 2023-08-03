const Blog = require('../models/blogModel');
const Comment = require('../models/commentModel');
const asyncHandler = require('express-async-handler')

// Create a new comment for a specific blog post
exports.createComment = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const { commentText } = req.body;
    const { id } = req.user; // Assuming you have the user ID from the token validation middleware

    // Find the blog post by its ID
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Create a new comment object
    const newComment = new Comment({
      user_id: id,
      commentText
    });

    // Save the comment to the blog's comments array
    blog.comments.push(newComment);
    await blog.save();

    res.status(201).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    const { blogId, commentId } = req.params;
    console.log(blogId)
    console.log(commentId)
    const { id } = req.user; // Assuming you have the user ID from the token validation middleware

    // Find the blog post by its ID
    const blog = await Blog.findById(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // Find the comment to be deleted
    const commentToDelete = blog.comments.find(comment => comment._id == commentId);
    if (!commentToDelete) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Ensure that the comment is made by the same user who is trying to delete it
    if (commentToDelete.user_id.toString() !== id) {
      return res.status(403).json({ error: 'You are not authorized to delete this comment' });
    }

    // Remove the comment from the blog's comments array
    blog.comments = blog.comments.filter(comment => comment._id != commentId);
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});




