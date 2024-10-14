// 验证token
const jwt = require('jsonwebtoken');

// 验证token,并解析token获取用户信息
const getToken = async (ctx, next) => {
	let token = ctx.header.authorization?.replace('Bearer ', '');
	try {
		// 验证token是否有效,'shhhhh'是密钥
		let decoded = jwt.verify(token, 'shhhhh');
		ctx.state.user = decoded;
		await next();
	} catch (error) {
		ctx.body = { state: 401, msg: 'error', text: 'token无效或过期，请重新登录' };
	}
};

module.exports = getToken;
