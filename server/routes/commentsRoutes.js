const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

const {
  addComment,
  deleteComment,
  getAllCommentsForBlog,
} = require("../controllers/commentsController");

router.post("/:blogId/comments/", validateToken, addComment);
router.delete("/:blogId/comments/:commentId", validateToken, deleteComment);
router.get("/:blogId/comments/", validateToken, getAllCommentsForBlog);

module.exports = router;
