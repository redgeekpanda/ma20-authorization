const Router = require('koa-router');

const { users } = require('./users');
const { getHash } = require('./utils');

const router = new Router();

router.get(
  '/info',
  async (ctx, next) => {
    const tokenHeader = ctx.get('Authorization');
    console.log({ tokenHeader });

    if (!tokenHeader) {
      return ctx.throw(401, 'No token provided.');
    }

    const [tokenType, token] = tokenHeader.split(' ');
    console.log({ tokenType, token });

    if (tokenType !== 'Basic' || !token) {
      return ctx.throw(401, 'No token provided.');
    }

    let login;
    let password;
    try {
      [login, password] = Buffer.from(token, 'base64')
        .toString()
        .split(':');
    } catch (e) {
      console.log(e);
      return ctx.throw(401, 'Invalid token.');
    }
    console.log({ login, password });

    if (!login || !password) {
      return ctx.throw(401, 'Invalid token.');
    }

    const user = users.find(u => login === u.login);

    if (user && getHash(password) === user.passwordHash) {
      return next();
    }

    return ctx.throw(401, 'Invalid token.');
  },
  ctx => {
    ctx.body = '(Sensitive information)';
  },
);

module.exports = {
  basicExampleRouter: router,
};
