const crypto = require('crypto');

exports.getHash = str =>
  crypto
    .createHash('sha256')
    .update(str)
    .digest('base64');
