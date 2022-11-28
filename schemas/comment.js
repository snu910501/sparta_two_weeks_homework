const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
  },
  commentsId: {
    type: Number,
    required: true,
    unique: true,
  },
  context: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Comment', commentSchema)