const express = require('express')
const bcrypt = require('bcrypt')
const user = express.Router()
const User = require('../models/user.js')
const cors = require('cors');

user.use(cors());

user.get('/user', (req, res) => {
  res.json('hello world')
})

user.post('/createaccount', (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  console.log(req.body);
  User.create(req.body, (err, createdUser) => {
    console.log(createdUser);
    if (err) {
      console.log(err);
      res.json(err.message)
    } else {
      console.log('user is created', createdUser);
      res.json(createdUser)
    }
  })
})

user.post('/login', (req, res) => {
  console.log(req.body);
  console.log("login???");
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    if (err) {
      res.json('There was an error. Please try again.')
    } else {
      if (!foundUser) {
        res.json('Username and password do not match. Please try again.')
      } else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        res.json({ username: foundUser.username })
      } else {
        res.json('Username and password do not match. Please try again.')
      }
    }
  })
})

module.exports = user
