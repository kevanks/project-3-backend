const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const Post = require('./models/post.js')

app.use(express.json());
app.use(cors());

let PORT = 3000;
if (process.env.PORT) {
  PORT = process.env.PORT
}

// Routes
// Create Route
app.post('/', (req, res) => {
  Post.create(req.body, (err, createdPost) => {
    res.json(createdPost)
  })
})

// Index Route
app.get('/', (req, res) => {
  Post.find({}).sort({ updatedAt: -1 }).exec((err, foundPosts) => {
    res.json(foundPosts)
  })
})

// Delete Route
app.delete('/:id', (req, res) => {
  Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
    res.json(deletedPost)
  })
})

// Update Route
app.put('/:id', (req, res) => {
  Post.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedPost) => {
    res.json(updatedPost)
  })
})

// Connections
mongoose.connect('mongodb+srv://kevanks:berserk2018@cluster0.fqh55jt.mongodb.net/?retryWrites=true&w=majority', () => {
  console.log('Connected to Mongo');
});


app.listen(PORT, () => {
  console.log("Listening...");
})
