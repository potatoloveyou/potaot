const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

const { users, articles, ObjectId } = require('../mongo.ts');

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 中间件，获取token
const getToken = require('../middleware/getToken.ts');

// 中间件，验证用户权限
const checkArticlePermission = require('../middleware/checkArticlePermission.ts');

// 列出所有文章
router.get('/article', async (ctx, next) => {
	try {
		// 获取分页参数
		// limit: 每页显示多少条
		// offset: 从第几条开始显示(offset为limit的倍数)
		let { limit = 2, offset = 0 } = ctx.request.query;

		// 没有包含作者信息
		/**
		 * limit: 每页显示多少条
		 * skip: 从第几条开始显示
		 */
		// const cursor = articles
		// 	.find()
		// 	.limit(Number(limit))
		// 	.skip(Number(limit) * Number(offset));
		// const cursor = articles.find();

		// ctx.body = {
		// 	// pages: Math.ceil((await articles.count()) / Number(limit)),
		// 	pages: Math.ceil((await articles.countDocuments({}, { hint: '_id_' })) / Number(limit)),
		// 	current: Number(offset) + 1,
		// 	list: await cursor.toArray(),
		// };

		// 包含作者信息
		// 聚合查询 articles 集合并关联 users 集合
		const paginatedArticles = await articles
			.aggregate([
				{
					$addFields: {
						authorObjectId: { $toObjectId: '$author' }, // 将 author 字段转换为 ObjectId 类型
					},
				},
				{
					$lookup: {
						from: 'users', // 关联的集合
						localField: 'authorObjectId', // 使用转换后的 authorObjectId 字段
						foreignField: '_id', // users 集合中的字段
						as: 'user', // 新字段，存放关联的用户信息
					},
				},
				{
					$unwind: {
						path: '$user', // 将 user 数组展开（因为每篇文章只有一个作者）
						preserveNullAndEmptyArrays: true, // 如果没有匹配到用户，保留文章信息
					},
				},
				{
					$project: {
						title: 1,
						content: 1,
						author: 1,
						createdAt: 1,
						'user.username': 1,
						'user._id': 1,
						'user.avatar': 1,
					},
				},
				{
					$sort: { createdAt: -1 }, // 按照 createdAt 字段降序排序
				},
				{
					$skip: Number(limit) * Number(offset),
				},
				{
					$limit: Number(limit),
				},
			])
			.toArray();
		console.log(paginatedArticles);

		ctx.body = {
			// pages: Math.ceil((await articles.count()) / Number(limit)),
			pages: Math.ceil((await articles.countDocuments({}, { hint: '_id_' })) / Number(limit)),
			current: Number(offset) + 1,
			list: paginatedArticles,
		};
	} catch (error) {
		ctx.body = {
			message: '查询失败',
			error,
		};
	}
});

// 发布文章
router.post('/article', bodyParser(), getToken, async (ctx, next) => {
	let user = ctx.state.user;
	let { title, content } = await ctx.request.body;
	let res = await articles.insertOne({
		title,
		content,
		author: user._id,
		createdAt: Date.now(),
	});
	ctx.body = res;
});

// 某个文章详情
router.get('/article/:id', async (ctx, next) => {
	ctx.body = '文章详情';
});

// 更新某个文章
router.put('/article/:id', getToken, async (ctx, next) => {
	console.log(ctx.request.params.id);
	console.log(ctx.state.user);
});

// 删除某个文章
router.delete('/article/:id', getToken, checkArticlePermission, async (ctx, next) => {
	let id = ctx.request.params.id;
	ctx.body = {
		state: 200,
		msg: 'success',
		text: '删除成功',
		res: await articles.deleteOne({ _id: new ObjectId(id) }),
	};
});

module.exports = router;
