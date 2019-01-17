var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//Create data types of users
var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },

  password: {
    type: String,
    required: true,
  }
});

//Authenticate user&password to database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .collation({ locale: 'en', strength: 1 })
    .exec(function (err, user) {
      if (err) {
        console.log(err);
        return callback(err, null);
      } else if (!user) {
        err = new Error('User not found.');
        return callback(err, null);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
            console.log("Successfuly log in");
            return callback(null, user);
        } else {
            return callback(err, null);
        }
      })
    });
};

UserSchema.statics.newUser = function(username, password, callback) {
  if (username && password){
    bcrypt.hash(password, 10, function(err, hashpassword){
      var UserData = {
        username: username,
        password: hashpassword,
      };
    });
    User.create(UserData, function (err, user) {
      if (!err){
        return callback(null, user);
      } else{
        return callback(err, null);
      }
    });
  }
  else return callback("parameter_missing", null);
};

var User = mongoose.model('User', UserSchema);
module.exports = User;