const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  postsId: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  context: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})

module.exports = mongoose.model('Post', postSchema);