const Koa = require('koa');
const app = new Koa();

// 处理静态资源
const KoaStatic = require('koa-static');
// https://github.com/koajs/static
// 设置静态托管
app.use(
	KoaStatic('public', {
		maxage: 3600 * 1000,
		gzip: true,
		index: 'default.html',
	}),
);

// 处理路由
const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

// node原生fs/promises模块
// const fs = require('fs/promises');
// app.use(async (ctx, next) => {
// 	try {
// 		let res = await fs.readFile('public/' + ctx.url);
// 		ctx.body = res;
// 	} catch (error) {
// 		await next();
// 	}
// });

// app.use(async (ctx, next) => {
// 	ctx.body = { name: 'nick', age: 18 };
// });

// router.get("/", func)
// GET方式  /路径  响应函数
router
	.get('/', (ctx, next) => {
		ctx.body = '首页';
	})
	.get('/about', (ctx, next) => {
		ctx.body = 'about 页面 GET';
	})
	.post('/about', (ctx, next) => {
		ctx.body = 'about 页面 POST';
	})
	.get('/user/:id', (ctx, next) => {
		ctx.body = 'user 页面 GET';
		console.log(ctx.params.id);
	});
// GET params传参 /user/123

app.use(router.routes());
app.listen(8080);
