import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
7;2

// 自动导入 Element Plus 按需引入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

// 引入 tailwindcss
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	// 加载环境变量
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			vue(),
			AutoImport({
				resolvers: [ElementPlusResolver()],
			}),
			Components({
				resolvers: [ElementPlusResolver()],
			}),
			tailwindcss(),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		/**
		 * 开发服务器配置
		 */
		server: {
			// 开发服务器端口
			port: 5173,
			// 自动打开浏览器
			// open: true,
			proxy: {
				'/api': {
					// 目标服务器地址
					target: env.VITE_DEV_API_BASE_URL,
					// 是否改变请求头中的 Origin 为目标服务器地址
					changeOrigin: true,
					// 重写请求路径
					rewrite: (path) => path.replace(/^\/api/, ''),
				},

				// 代理Websocket
				'/ws': {
					target: env.VITE_DEV_API_BASE_URL,
					changeOrigin: true,
					// 是否代理 WebSocket 连接
					ws: false,
					rewrite: (path) => path.replace(/^\/ws/, ''),
				},
			},
		},
	};
});
