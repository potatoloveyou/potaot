const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		proxy: {
			'': {
				target: 'https://manga.bilibili.com/',
				changeOrigin: true,
				headers: {
					'content-type': 'application/json;charset=UTF-8',
					origin: 'https://manga.bilibili.com',
					referer: 'https://manga.bilibili.com/m',
				},
			},
		},
	},
});
