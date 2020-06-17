const crypto = require('crypto');
const config = require('config');
const mongoose = require('../../../lib/mongoose');

const emailValidation = {
  validator: email => {
    const emailRexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return Promise.resolve(emailRexExp.test(email));
  },
  message: 'Invalid email!'
};

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [
      true,
      'Username is required!'
    ],
    trim: true
  },
  email: {
    type: String,
    required: [
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
    required: true
  },
  salt: {
    type: String,
    required: true
  },
  validation_token: {
    type: String
  },
  registration_date: {
    type: Date,
    required: true,
    default: Date.now()
  }
}, {
  id: false,
  versionKey: false
});

userSchema.virtual('password')
  .set(function (password) {
    if (!password || !String(password).trim()) {
      return this.invalidate('password', 'Password is required!');
    } else if (password && password.length < 8) {
      return this.invalidate('password', 'Password must be at least 6 characters!');
    }
    this._password = password;
    this.salt = crypto.randomBytes(256).toString('base64');
    this.password_hash = crypto.pbkdf2Sync(
      password,
      this.salt,
      config.crypto.iterations,
      config.crypto.keylen,
      config.crypto.digest
    );
  })
  .get(function () {
    return this._password;
  });

userSchema.virtual('password_confirmation')
  .set(function (password) {
    this._password_confirmation = password;
  })
  .get(function () {
    return this._password_confirmation;
  });

userSchema.path('password_hash').validate(function () {
  if (this._password !== this._password_confirmation) {
    this.invalidate('password_confirmation', 'Passwords must match!');
  }
}, null);

userSchema.methods.checkPassword = function (password) {
  if (!password || !String(password).trim() || !this.password_hash) return false;
  return String(crypto.pbkdf2Sync(
    password,
    this.salt,
    config.crypto.iterations,
    config.crypto.keylen,
    config.crypto.digest
  )) === this.password_hash;
};

userSchema.methods.toJSON = function (userData) {
  const user = this.toObject(userData);
  return user;
};

module.exports = mongoose.model('Users', userSchema);