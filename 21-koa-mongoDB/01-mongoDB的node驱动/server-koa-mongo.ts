const Koa = require('koa');
// https://www.koajs.com.cn/
const app = new Koa();

const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 连接数据库
const { users } = require('./mongo.ts');

// 加密
const CryptoJS = require('crypto-js');

router.get('/', (ctx, next) => {
	ctx.body = 'get 方式';
});

// 默认nodejs不接受post方式的请求体，阻止恶意上传占用大量宽带资源，需要使用中间件
router.post('/register', bodyParser(), async (ctx, next) => {
	let responseMsg = {}; // 返回信息
	let { username, password } = ctx.request.body;
	if (username && password) {
		// console.log(username, password);

		// 查找用户名
		let findUser = await users.findOne(
			{ username },
			{
				projection: { password: 0 },
			},
		);

		console.log('findUser', findUser);
		// 若用户不存在findUser为null
		if (findUser) {
			responseMsg = { state: 401, msg: 'error', text: '用户名已存在' };
		} else {
			// 插入数据
			// 密码 存储 一般使用md5 加减盐（防内鬼）
			let res = await users.insertMany([{ username, password: CryptoJS.MD5(password + 'xyz').toString() }]);
			responseMsg = { state: 200, msg: 'success', text: '注册成功', res };
		}

		ctx.body = {
			...responseMsg,
		};
	}
	// ctx.body = 'post 方式';
});

app.use(router.routes());

app.listen(8080);
