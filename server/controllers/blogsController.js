const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');

// Get all blogs
exports.getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ date: -1 });
  res.json(blogs);
});

// Get a single blog by ID
exports.getBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  
  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  // Increment the impressions_count field and save the updated document
  blog.impressions += 1;
  await blog.save();

  res.status(200).json(blog);
});

exports.getMyBlogs = asyncHandler(async (req, res) => {
  // Access the user ID from the decoded token (assuming validateTokenHandler middleware has been used before this)
  console.log(req.user)
  const user_id = req.user.id;

  try {
    // Fetch blogs from the database that are owned by the user
    const blogs = await Blog.find({ user_id });

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Post a single blog
exports.postBlog = asyncHandler(async (req, res) => {
  if (!req.body.title || !req.body.content || !req.body.imageUrl || !req.body.summary) {
    res.status(400)
    throw new Error('please fill all fields')
  }

  // console.log(req.user)

  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    summary: req.body.summary,
    imageUrl: req.body.imageUrl,
    minsRead:req.body.minsRead,
    user_id: req.user.id,
  })
  // console.log(blog.user_id);

  res.status(200).json(blog)
});

// Update a blog by ID
exports.updateBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const { title, content, summary, imageUrl } = req.body;

  if (!title || !content || !summary || !imageUrl) {
    res.status(400);
    throw new Error('Please fill all fields');
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { title, content, summary, imageUrl },
    { new: true } // Return the updated blog
  );

  if (!updatedBlog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  res.status(200).json(updatedBlog);
});

// Delete a blog by ID
exports.deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const deletedBlog = await Blog.findByIdAndRemove(blogId);

  if (!deletedBlog) {
    res.status(404);
    throw new Error('Blog not found');
  }

  res.status(200).json({ message: 'Blog deleted successfully' });
});
