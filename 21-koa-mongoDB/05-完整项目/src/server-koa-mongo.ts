const Koa = require('koa');
// https://www.koajs.com.cn/
const app = new Koa();

// 处理静态资源
const KoaStatic = require('koa-static');
// https://github.com/koajs/static
// 设置静态托管
app.use(
	KoaStatic('uploads', {
		maxage: 3600 * 1000,
		gzip: true,
		index: 'default.html',
	}),
);

app.use(
	KoaStatic('public', {
		maxage: 3600 * 1000,
		gzip: true,
		index: 'test.html',
	}),
);

const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

router.get('/', (ctx, next) => {
	ctx.body = 'get 方式';
});

// 引入路由 使用路由
// 注册
const registerRouter = require('./router/register.ts');
app.use(registerRouter.routes());

// 登录
const loginRouter = require('./router/login.ts');
app.use(loginRouter.routes());

// 更新用户信息
const profileRouter = require('./router/profile.ts');
app.use(profileRouter.routes());

// 文章
const articleRouter = require('./router/article.ts');
app.use(articleRouter.routes());

// 评论
const commentRouter = require('./router/comment.ts');
app.use(commentRouter.routes());

app.use(router.routes());

app.listen(8080);
