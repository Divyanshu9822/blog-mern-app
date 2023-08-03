const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

const blogSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String, required: true },
  impressions: { type: Number, default: 0 },
  minsRead: {type:Number, required: true},
  date: { type: Date, default: Date.now },
  comments: [Comment.schema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Blog', blogSchema);
