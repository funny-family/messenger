const mongoose = require('../../../lib/mongoose');

const blackTokenSchema = new mongoose.Schema({
  token: {
    type: String
  },
  expiresAt: {
    type: Date,
    required: true
  }
}, {
  id: false,
  versionKey: false
});

module.exports = mongoose.model('BlackTokens', blackTokenSchema);