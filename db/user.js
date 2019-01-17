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

var User = mongoose.model('User', UserSchema);
//Authenticate user&password to database
UserSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .collation({ locale: 'en', strength: 1 })
    .exec(function (err, user) {
      if (err) {
        console.log(err);
        return callback(err);
      } else if (!user) {
        err = new Error('User not found.');
        return callback(err);
      }
      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
            console.log("Successfuly log in");
            return callback(null, user);
        } else {
            return callback(err);
        }
      })
    });
};

UserSchema.statics.newUser = function(username, password, callback) {
    var UserData = {
      username: username,
      password: password,
    };
    User.create(UserData, function (err, user) {
        if (!err){
            return callback(null, null, user);
        }
    });
};