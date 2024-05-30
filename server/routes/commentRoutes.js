const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

const {
  addComment,
  deleteComment,
} = require("../controllers/commentController");

router.post("/:blogId", validateToken, addComment);

router.delete("/:commentId", validateToken, deleteComment);

module.exports = router;
