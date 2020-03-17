const { getHash } = require('./utils');

exports.users = [
  {
    login: 'admin',
    passwordHash: getHash('admin123'),
  },
];
