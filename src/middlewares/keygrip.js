const Keygrip = require('keygrip');
const config = require('config');

module.exports = new Keygrip([config.secretOrKey], 'sha256');
