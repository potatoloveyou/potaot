const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

// 连接数据库
const { ObjectId, users } = require('../mongo.ts');

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 中间件，解析post请求的文件
const multer = require('@koa/multer');
// 默认存储在内存中，上传大文件时需要配置存储位置
// const upload = multer({ dest: 'uploads/' });

// 原生node的path模块(用于处理路径)
const path = require('path');

const getToken = require('../middleware/getToken.ts');

// 处理文件后缀
const storage = multer.diskStorage({
	// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
	// destination若是一个函数，则需要负责创建文件夹
	destination: (req, file, cb) => {
		// 存储位置
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		// console.log(file);
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });

// 个人面板 必须登录
router.get('/profile', bodyParser(), getToken, async (ctx, next) => {
	let user = ctx.state.user;
	ctx.body = {
		state: 200,
		msg: 'success',
		text: '更新成功',
		user: await users.findOne(
			{ _id: new ObjectId(user._id) },
			{
				// 不包含password字段。0表示不返回该字段
				projection: { password: 0 },
			},
		),
	};
});

// 更新个人面板 必须登录 携带文件头像
router.put('/profile', bodyParser(), getToken, upload.single('avatar'), async (ctx, next) => {
	console.log(ctx.request.body, ctx.request.file);
	try {
		let user = ctx.state.user;
		let { gender, signature } = ctx.request.body;
		let res = await users.updateOne(
			{
				_id: new ObjectId(user._id),
			},
			{
				$set: { gender, signature, avatar: ctx.request.file.filename },
			},
		);
		ctx.body = { state: 200, msg: 'success', text: '更新成功', res };
	} catch (error) {
		ctx.body = { state: 401, msg: 'error', text: '更新失败' };
	}
});

module.exports = router;
