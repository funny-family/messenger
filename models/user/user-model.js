const mongoose = require('mongoose');

const emailValidation = {
  validator: email => {
    const emailRexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Promise.resolve(emailRexExp.test(email));
  }
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [
      true,
      'Username is required!'
    ],
    trim: true
  },
  email: {
    type: String,
    require: [
      true,
      'Email is required!'
    ],
    trim: true,
    unique: true,
    lowercase: true,
    validate: emailValidation
  },
  password_hash: {
    type: String,
    require: [
      true,
      'Password is required!'
    ]
  },
  salt: {
    type: String,
    require: true
  },
  validation_token: {
    type: String
  }
}, {
  id: false,
  versionKey: false
});

module.exports = mongoose.model('Users', userSchema);