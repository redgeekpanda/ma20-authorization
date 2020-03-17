const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const { basicExampleRouter } = require('./basic-example');
const { jwtExampleRouter } = require('./jwt-example');

const app = new Koa();

app.use(bodyParser());

const router = new Router();
router.use('/basic', basicExampleRouter.routes());
router.use('/jwt', jwtExampleRouter.routes());

app.use(router.allowedMethods());
app.use(router.routes());

app.listen(8000);
