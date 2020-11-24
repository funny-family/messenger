const crypto = require('crypto');
const config = require('config');
const { v4: uuidv4 } = require('uuid');
const uniqueValidator = require('mongoose-unique-validator');
const mongoose = require('../connection');

const emailValidation = [
  {
    validator: (email) => {
      const emailRexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return Promise.resolve(emailRexExp.test(email));
    },
    message: 'Invalid email!'
  }
];

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
  uuid_token: {
    type: String,
    default: uuidv4()
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

userSchema.path('username').validate(function () {
  const usernameLength = 4;
  if (this.username && this.username.length < usernameLength) {
    this.invalidate('username', `Username must be at least ${usernameLength} characters!`);
  }
});

userSchema.path('password_hash').validate(function () {
  const passwordLength = 6;
  if (!this._password || !String(this._password).trim()) {
    this.invalidate('password', 'Password is required!');
  }
  if (this._password && this._password.length < passwordLength) {
    this.invalidate('password', `Password must be at least ${passwordLength} characters!`);
  }
  if (!this._password_confirmation || !String(this._password_confirmation).trim()) {
    this.invalidate('password_confirmation', 'Password confirmation is required!');
  }
  if (this._password !== this._password_confirmation) {
    this.invalidate('password_confirmation', 'Passwords must match!');
  }
}, null);

userSchema.plugin(uniqueValidator, {
  message: 'Email is already used!'
});

userSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.password_hash) return false;
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
  delete user.salt;
  delete user.password_hash;
  delete user.validation_token;
  return user;
};

module.exports = mongoose.model('Users', userSchema);
