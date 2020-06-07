const mongoose = require('mongoose');
const crypto = require('crypto');
const config = require('config');

const emailValidation = {
  validator: email => {
    const emailRexExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    Promise.resolve(emailRexExp.test(email));
  }
};

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    require: [
      true,
      'Username is required!'
    ],
    trim: true
  },
  userEmail: {
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
  userPasswordHash: { // password hash
    type: String,
    require: [
      true,
      'Password is required!'
    ]
  },
  salt: { // password salt
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

userSchema.virtual('userPassword')
  .set(function setPassword(password) {
    if (!password || !String(password).trim()) {
      return this.invalidate('userPassword', 'Password field is empty!');
    }
    this._password = password;
    this.salt = crypto.randomBytes(256).toString('base64');
    this.userPasswordHash = crypto.pbkdf2Sync(
      password,
      this.salt,
      config.crypto.iterations,
      config.crypto.keylen,
      config.crypto.digest
    );
  }())
  .get(function getPassword() {
    return this._password;
  }());

// userSchema.virtual({ // userPassword
//   //
// });

// userSchema.virtual({ // userPasswordConfiramtion
//   //
// });

module.exports = mongoose.model('Users', userSchema);