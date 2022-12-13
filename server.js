const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const methodOverride = require('method-override')
const app = express();
const Post = require('./models/post.js')
const User = require('./models/user.js')

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}))

let PORT = 3000;
if(process.env.PORT){
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
  Post.find({}, (err, foundPosts) => {
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
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err, updatedPost) => {
    res.json(updatedPost)
  })
})

// user auth
// Connections
mongoose.connect('mongodb+srv://kevanks:berserk2018@cluster0.fqh55jt.mongodb.net/?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
 () => {
  console.log('Connected to Mongo');
});

const userController = require('./controllers/user_controller.js')
app.use('/', userController)

app.listen(PORT, () => {
  console.log("Listening...");
})
