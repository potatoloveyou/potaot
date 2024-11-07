// supervisor --inspect

const Koa = require('koa');
// https://www.koajs.com.cn/
const app = new Koa();

const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = 'get 方式123';
});

// 引入路由 使用路由
const indexList = require('./router/indexList.ts');
router.use(indexList.routes());

const indexClassify = require('./router/indexClassify.ts');
router.use(indexClassify.routes());

app.use(router.routes());
app.listen(8080);
