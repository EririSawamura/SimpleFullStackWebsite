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
  res.render('users/signin', { title: 'Sign in' });
});
module.exports = router;
