import { fileURLToPath, URL } from 'node:url';
import path from 'path';

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';

// Element Plus 按需导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
// Element Plus 手动导入
import ElementPlus from 'unplugin-element-plus/vite';
// 导入Element Plus icon图标组件
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';

// 引入 tailwindcss
import tailwindcss from '@tailwindcss/vite';

// 定义 src 目录路径
const pathSrc = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	// 加载环境变量
	const env = loadEnv(mode, process.cwd(), '');

	return {
		plugins: [
			vue(),
			AutoImport({
				// 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
				imports: ['vue'],
				resolvers: [
					// 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
					ElementPlusResolver(),
					// Auto import icon components
					// 自动导入图标组件
					IconsResolver({
						prefix: 'Icon',
					}),
				],
				dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
			}),
			Components({
				resolvers: [
					// 自动导入 Element Plus 组件
					ElementPlusResolver(),
					// 自动注册图标组件
					IconsResolver({
						enabledCollections: ['ep'],
					}),
				],
				dts: path.resolve(pathSrc, 'components.d.ts'),
			}),
			ElementPlus({}),
			// 自动安装图标组件
			Icons({
				autoInstall: true,
			}),
			tailwindcss(),
		],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url)),
			},
		},
		/**
		 * 导入全局样式配置
		 */
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `@use "@/assets/styles/global.scss" as *;`,
				},
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
