const { articles, ObjectId } = require('../mongo.ts');

const checkArticlePermission = async (ctx, next) => {
	let id = ctx.request.params.id;
	let user = ctx.state.user;

	let doc = await articles.findOne({ _id: new ObjectId(id) }, { projection: { author: 1 } });

	if (doc && doc.author === user._id) {
		// 如果有权限，继续执行下一个中间件
		await next();
	} else {
		// 如果没有权限，返回错误响应
		ctx.body = {
			state: 401,
			msg: 'error',
			text: '没有权限',
		};
	}
};
module.exports = checkArticlePermission;
