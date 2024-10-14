const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

// 验证token
const jwt = require('jsonwebtoken');

// // 连接数据库
const { users } = require('../mongo.ts');

// 加密
const CryptoJS = require('crypto-js');

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 登录
router.post('/login', bodyParser(), async (ctx, next) => {
	let { name, pwd } = ctx.request.body;
	let responseMsg = {};

	let findUser = await users.findOne({ username: name });

	if (findUser) {
		// 去掉密码
		let { password, ...user } = findUser;
		responseMsg =
			findUser.password === CryptoJS.MD5(pwd + 'xyz').toString()
				? { state: 200, msg: 'success', text: '登录成功', token: jwt.sign(user, 'shhhhh') }
				: { state: 401, msg: 'error', text: '密码错误' };
	} else {
		responseMsg = { state: 401, msg: 'error', text: '用户不存在' };
	}

	ctx.body = responseMsg;
});

module.exports = router;
// module.exports = '123';
