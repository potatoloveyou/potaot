const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
	// console.log('1');
	// await next();
	// console.log('2');
	ctx.body = 'hello w orld';
	console.log(ctx);
	console.log(next);
});

app.listen(3000, () => {
	console.log('server is running on http://localhost:3000');
});
