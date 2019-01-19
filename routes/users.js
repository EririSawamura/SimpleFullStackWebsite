var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var User = require('../db/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/layout', function(req, res, next) {
  console.log("layout");
  res.render('layout', { title: 'User login page' });
});

router.get('/signin', function(req, res, next) {
  res.render('users/signin', { title: 'Sign in' });
});

router.get('/signup', function(req, res, next) {
  console.log("2333");
  res.render('users/signup', { title: 'Sign up' });
});

router.post('/signin', function(req, res, next) {
  console.log("signin post");
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error) {
        res.redirect('layout');
      } else if (!user || error) {
        res.redirect('layout');
      } else {
        res.render('users/signin', { title: 'Sign in' });
      }
    });
  } else {
    res.redirect('layout');
  }
});

router.post('/signup', function(req, res, next) {
  console.log("gogogogo");
  User.newUser(req.body.username, req.body.password, function(err, user){
    console.log(user);
    res.redirect('layout');
  });
});
module.exports = router;
