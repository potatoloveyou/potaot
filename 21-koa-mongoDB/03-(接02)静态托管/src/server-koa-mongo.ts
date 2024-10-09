const Koa = require('koa');
// https://www.koajs.com.cn/
const app = new Koa();

const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 中间件，解析post请求的文件
const multer = require('@koa/multer');
// 默认存储在内存中，上传大文件时需要配置存储位置
// const upload = multer({ dest: 'uploads/' });

// 处理文件后缀
const storage = multer.diskStorage({
	// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md
	// destination若是一个函数，则需要负责创建文件夹
	destination: (req, file, cb) => {
		// 存储位置
		cb(null, 'uploads');
	},
	filename: (req, file, cb) => {
		console.log(file);
		cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	},
});
const upload = multer({ storage: storage });

// 原生node的path模块(用于处理路径)
const path = require('path');

// 中间件，解析get请求的参数
const querystring = require('querystring');

// 连接数据库
const { ObjectId, users } = require('./mongo.ts');

// 加密
const CryptoJS = require('crypto-js');

// 验证token
const jwt = require('jsonwebtoken');

// 处理静态资源
const KoaStatic = require('koa-static');
// https://github.com/koajs/static

// router.get('/', (ctx, next) => {
// 	ctx.body = 'get 方式';
// });

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

// 登录
router.post('/login', bodyParser(), async (ctx, next) => {
	console.log(ctx.request.body);
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

// 验证token,并解析token获取用户信息
const getToken = async (ctx, next) => {
	let token = ctx.header.authorization?.replace('Bearer ', '');
	try {
		let decoded = jwt.verify(token, 'shhhhh');
		ctx.state.user = decoded;
		await next();
	} catch (error) {
		ctx.body = { state: 401, msg: 'error', text: 'token无效或过期' };
	}
};

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
		index: 'default.html',
	}),
);

app.use(router.routes());

app.listen(8080);
