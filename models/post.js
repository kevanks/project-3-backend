const mongoose = require('mongoose');

const postSchema = new mongoose.Schema ({
  user: String,
  postBody: String,
  imageURL: String,
  linkURL: String,
  likes: Array,
  comments: [{user: String, comment: String}]
} {timestamp: true})

const Post = mongoose.model('Post', postSchema)

module.exports = Post
