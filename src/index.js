const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const { basicExampleRouter } = require('./basic-example');
const { jwtExampleRouter } = require('./jwt-example');

const app = new Koa();

app.use(bodyParser());

const router = new Router();
router.use('/basic', basicExampleRouter.middleware());
router.use('/jwt', jwtExampleRouter.middleware());

app.use(router.allowedMethods());
app.use(router.middleware());

app.listen(8000);
