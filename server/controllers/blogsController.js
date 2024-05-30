const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Blog = require("../models/blogModel");

exports.getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      { $sort: { date: -1 } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" },
      {
        $addFields: {
          authorName: "$authorInfo.fullName",
        },
      },
      {
        $project: {
          authorInfo: 0,
        },
      },
    ]);

    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  try {
    const blog = await Blog.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(blogId) } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" },
      {
        $addFields: {
          authorName: "$authorInfo.fullName",
        },
      },
      {
        $project: {
          authorInfo: 0,
        },
      },
    ]);

    if (!blog || blog.length === 0) {
      res.status(404);
      throw new Error("Blog not found");
    }

    await Blog.updateOne(
      { _id: new mongoose.Types.ObjectId(blogId) },
      { $inc: { impressions: 1 } }
    );

    res.status(200).json(blog[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.getMyBlogs = asyncHandler(async (req, res) => {
  const user_id = req.user.id;

  try {
    const blogs = await Blog.aggregate([
      { $match: { author: new mongoose.Types.ObjectId(user_id) } },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "_id",
          as: "authorInfo",
        },
      },
      { $unwind: "$authorInfo" },
      {
        $addFields: {
          authorName: "$authorInfo.fullName",
        },
      },
      {
        $project: {
          authorInfo: 0,
        },
      },
    ]);

    res.status(200).json({ blogs });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.postBlog = asyncHandler(async (req, res) => {
  if (
    !req.body.title ||
    !req.body.content ||
    !req.body.imageUrl ||
    !req.body.summary
  ) {
    res.status(400);
    throw new Error("please fill all fields");
  }

  const blog = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    summary: req.body.summary,
    imageUrl: req.body.imageUrl,
    minsRead: req.body.minsRead,
    author: req.user.id,
  });

  res.status(200).json(blog);
});

exports.updateBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;
  const { title, content, summary, imageUrl } = req.body;

  if (!title || !content || !summary || !imageUrl) {
    res.status(400);
    throw new Error("Please fill all fields");
  }

  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to update this blog");
  }

  blog.title = title;
  blog.content = content;
  blog.summary = summary;
  blog.imageUrl = imageUrl;

  const updatedBlog = await blog.save();

  res.status(200).json(updatedBlog);
});

exports.deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);

  if (!blog) {
    res.status(404);
    throw new Error("Blog not found");
  }

  if (blog.author.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Not authorized to delete this blog");
  }

  await blog.remove();

  res.status(200).json({ message: "Blog deleted successfully" });
});
