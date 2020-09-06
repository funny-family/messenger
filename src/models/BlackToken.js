const mongoose = require('@/lib/mongoose');

const blackTokenSchema = new mongoose.Schema({
  token: {
    type: String
  },
  creation_date: {
    type: Date,
    default: Date.now,
    expires: 30
  }
}, {
  id: false,
  versionKey: false
});

module.exports = mongoose.model('BlackTokens', blackTokenSchema);
