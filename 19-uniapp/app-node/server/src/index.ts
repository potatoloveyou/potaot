// supervisor --inspect

const Koa = require('koa');
// https://www.koajs.com.cn/
const app = new Koa();

const cors = require('@koa/cors'); // 引入 CORS 中间件
app.use(
	cors({
		origin: 'http://localhost:5173', // 设置允许的前端源
		allowMethods: ['GET', 'POST', 'PUT', 'DELETE'], // 允许的 HTTP 方法
		allowHeaders: ['Content-Type', 'Authorization'], // 允许的请求头
	}),
);

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
