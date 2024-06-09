const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		// proxy: {
		// 	'': {
		// 		target: 'https://manga.bilibili.com/',
		// 		changeOrigin: true,
		// 		headers: {
		// 			'content-type': 'application/json;charset=UTF-8',
		// 			origin: 'https://manga.bilibili.com',
		// 			referer: 'https://manga.bilibili.com/m',
		// 		},
		// 	},
		// },

		proxy: {
			'/wzyd': {
				target: 'https://kohcamp.qq.com',
				changeOrigin: true,
				pathRewrite: function (path, req) {
					return path.replace('/wzyd', '');
				},
				headers: {
					token: 'MaJ6bKsj',
					userId: 443075400,
				},
			},
		},
	},
});
