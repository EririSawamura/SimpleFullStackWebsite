var express = require('express');
var mongoose = require("mongoose");
var router = express.Router();
var User = require('../db/user');
//var bcrypt = require('bcrypt');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/signup', function(req, res, next) {
  res.render('users/signup', { title: 'Sign up' });
});

router.get('/layout', function(req, res, next) {
  res.render('/layout', { title: 'User login page' });
});

router.get('/signin', function(req, res, next) {
  res.render('users/signin', { title: 'Sign in' });
});

router.post('/signin', function(req, res, next) {
  if (req.body.username && req.body.password) {
    User.authenticate(req.body.username, req.body.password, function (error, user) {
      if (error) {
        res.render('user/signin', {
          error: true,
          errorMsg: 'This user does not exist. Please try again. '
        });
      } else if (!user || error) {
        res.render('user/signin', {
          error: true,
          errorMsg: 'Username or password is incorrect. Please try again. '
        });
      } else {
        res.render('users/signin', { title: 'Sign in' });
      }
    });
  } else {
    res.render('user/signin', {
      reCaptchaKey: reCaptchaData.PublicKey,
      error: true,
      errorMsg: 'All fields are required. Please try again. '
    });
  }
});

router.post('/signup', function(req, res, next) {
  User.newUser(req.body.username, req.body.password);
  res.render('users/signup', { title: 'Sign up' });
});
module.exports = router;
