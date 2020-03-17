const Router = require('koa-router');
const { sign, verify } = require('jsonwebtoken');
const { promisify } = require('util');

const { users } = require('./users');
const { getHash } = require('./utils');

const signAsync = promisify(sign);
const verifyAsync = promisify(verify);

const router = new Router();

const secret = '(very-very-secret-from-dotenv)';

router.post('/register', async ctx => {
  const { login, password } = ctx.request.body;

  if (users.some(u => u.login === login)) {
    return ctx.throw(409, 'Login is already used.');
  }

  const passwordHash = getHash(password);
  users.push({ login, passwordHash });

  const token = await signAsync({ login }, secret, { expiresIn: '1day' });

  ctx.body = { token };
});

router.post('/login', async ctx => {
  const { login, password } = ctx.request.body;

  const passwordHash = getHash(password);

  const user = users.find(u => u.login === login && u.passwordHash === passwordHash);

  if (!user) {
    return ctx.throw(401, 'Invalid credentials.');
  }

  const token = await signAsync({ login }, secret, { expiresIn: '1day' });

  ctx.body = { token };
});

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
    if (tokenType !== 'Bearer' || !token) {
      return ctx.throw(401, 'No token provided.');
    }

    let login;
    try {
      ({ login } = await verifyAsync(token, secret));
      console.log({ login });

      if (login) {
        return next();
      }
    } catch (e) {
      console.log(e);
      return ctx.throw(401, 'Invalid token.');
    }

    return ctx.throw(401, 'Invalid token.');
  },
  ctx => {
    ctx.body = '(Sensitive information)';
  },
);

module.exports = {
  jwtExampleRouter: router,
};
