const express = require("express");
const validateToken = require("../middleware/validateTokenHandler");
const {
  getBlogs,
  getMyBlogs,
  getBlog,
  postBlog,
  updateBlog,
  deleteBlog,
} = require("../controllers/blogsController");

const router = express.Router();

router.get("/my-blogs", validateToken, getMyBlogs);
router.post("/", validateToken, postBlog);
router.put("/:id", validateToken, updateBlog);
router.delete("/:id", validateToken, deleteBlog);

router.get("/:id", getBlog);
router.get("/", getBlogs);

module.exports = router;
