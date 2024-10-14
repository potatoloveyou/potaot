const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

const { ObjectId, comments } = require('../mongo.ts');

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 中间件，获取token
const getToken = require('../middleware/getToken.ts');

// 中间件，验证用户权限
const checkArticlePermission = require('../middleware/checkArticlePermission.ts');

// 发布评论
router.post('/comment', bodyParser(), getToken, async (ctx, next) => {
	let user = ctx.state.user;
	let { articleId, content } = ctx.request.body;
	// console.log(user);
	// console.log(articleId, content);

	let res = await comments.insertOne({
		articleId,
		content,
		authorId: user._id,
		createAt: Date.now(),
	});

	ctx.body = res;
});

// 获取某个文章评论
router.get('/comment/:articleId', async (ctx, next) => {
	try {
		let { articleId } = ctx.request.params; // 获取路径参数
		let { limit = 5, offset = 0 } = ctx.request.query; // 获取查询参数
		// console.log(articleId);
		// console.log(limit, offset);

		// 包含作者信息
		// 聚合查询 comments 集合并关联 users 集合
		const commentsJointUsers = await comments
			.aggregate([
				{
					$match: { articleId }, // 匹配文章ID
				},
				{
					$addFields: {
						authorIdObjectId: { $toObjectId: '$authorId' }, // 将 authorId 字段转换为 ObjectId 类型
					},
				},
				{
					$lookup: {
						from: 'users', // 关联的集合
						localField: 'authorIdObjectId', // comments 集合中的字段
						foreignField: '_id', // users 集合中的字段
						as: 'user', // 新增的字段，包含匹配的用户信息
					},
				},
				{
					$unwind: {
						path: '$user', // 将 user 数组展开（因为每篇评论只有一个作者）
						preserveNullAndEmptyArrays: true, // 如果没有匹配到用户，保留评论信息
					},
				},
				{
					$project: {
						'user.password': 0, // 排除用户密码字段
					},
				},
				// {
				// 	$sort: { createAt: -1 }, // 按照 createAt 字段排序
				// },
				{
					$skip: Number(limit) * Number(offset),
				},
				{
					$limit: Number(limit),
				},
			])
			.toArray();
		console.log(commentsJointUsers);

		ctx.body = commentsJointUsers;
	} catch (error) {
		ctx.body = {
			message: '查询失败',
			error,
		};
	}
});

module.exports = router;
