// 引入node.js内置的模块http
const http = require('http');

// 创建一个http服务器
/**
 * 回调函数的参数req和res分别是请求和响应对象
 * req是请求对象，包含了客户端发送过来的所有信息
 * res是响应对象，用来向客户端发送响应信息
 */
const server = http.createServer((req, res) => {
	// 向客户端发送响应信息
	res.writeHead(200, {
		// "content-type": "text/html; charset=UTF-8",
		'content-type': 'text/plain; charset=UTF-8',
		'Access-Control-Allow-Origin': '*',
		// 设置cookie
	});

	// res.end()方法用来向客户端发送响应信息，并结束请求
	res.end(
		JSON.stringify({
			name: 'nick',
			age: 17,
		}),
	);
});

// 开启端口监听
server.listen(8080);