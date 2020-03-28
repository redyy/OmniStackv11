const crypto = require('crypto');

module.exports = function generatUniqueId() {
  return crypto.randomBytes(4).toString('HEX');
}