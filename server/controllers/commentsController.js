const Comment = require("../models/commentModel");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.getAllCommentsForBlog = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.aggregate([
      { $sort: { date: -1 } },
      { $match: { _id: new mongoose.Types.ObjectId(req.params.blogId) } },
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

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Failed to fetch comments", error });
  }
});

exports.addComment = asyncHandler(async (req, res) => {
  try {
    const newComment = new Comment({
      blogId: req.params.blogId,
      author: req.user.id,
      content: req.body.content,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Failed to add comment", error });
  }
});

exports.deleteComment = asyncHandler(async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Failed to delete comment", error });
  }
});
