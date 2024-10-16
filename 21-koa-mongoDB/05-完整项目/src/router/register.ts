const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

// 连接数据库
const { users } = require('../mongo.ts');

// 加密
const CryptoJS = require('crypto-js');

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 注册
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
				// 不包含password字段。0表示不返回该字段
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

module.exports = router;
