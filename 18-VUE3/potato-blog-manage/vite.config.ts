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

// 引入 tailwindcss
import tailwindcss from '@tailwindcss/vite';

// 引入 rollup可视化分析工具
import { visualizer } from 'rollup-plugin-visualizer';

// 引入 gzip压缩插件
import viteCompression from 'vite-plugin-compression';

// 定义 src 目录路径
const pathSrc = path.resolve(__dirname, 'src');

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
	const env = loadEnv(mode, process.cwd(), ''); // 加载环境变量

	return {
		plugins: [
			vue(),
			AutoImport({
				imports: ['vue'], // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
				resolvers: [
					ElementPlusResolver(), // 自动导入 Element Plus 相关函数，如：ElMessage, ElMessageBox... (带样式)
				],
				dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
			}),
			Components({
				resolvers: [
					ElementPlusResolver(), // 自动导入 Element Plus 组件
				],
				dts: path.resolve(pathSrc, 'components.d.ts'),
			}),
			ElementPlus({}),
			tailwindcss(),
			// 同时开启 gzip 和 brotli 压缩，服务器可以根据客户端支持情况选择发送哪种。
			viteCompression({
				verbose: true, // 是否在控制台输出压缩结果
				disable: false, // 是否禁用压缩
				threshold: 10240, // 压缩阈值，大于 10kb以上文件将压缩
				algorithm: 'gzip', // gzip压缩算法
				ext: '.gz', // 压缩文件后缀
			}),
			viteCompression({
				verbose: true, // 是否在控制台输出压缩结果
				disable: false, // 是否禁用压缩
				threshold: 10240, // 压缩阈值，大于 10kb以上文件将压缩
				algorithm: 'brotliCompress', // brotli压缩算法
				ext: '.br', // 压缩文件
			}),
		],
		/**
		 * 路径别名配置
		 */
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
		 * 打包配置
		 */
		build: {
			outDir: 'dist', // 输出目录
			assetsDir: 'assets', // 静态资源目录
			rollupOptions: {
				output: {
					experimentalMinChunkSize: 20 * 1024, // 大于20k的文件单独打包
					// 手动分块，将稳定且不常更改的模块或三方库分到单独包中
					// id 为模块的路径，可以根据路径判断是否需要分块
					manualChunks(id: string) {
						// 将 node_modules 中的 js 文件和 ts 文件分到 vendor 包中
						if ((id.includes('node_modules') && id.endsWith('.js')) || id.endsWith('.ts')) {
							return 'vendor';
						}
					},
					plugins: [
						// 生成分析报告
						visualizer({
							open: false, // 打包后自动打开报告
							filename: 'dist/stats.html', // 报告文件路径
							gzipSize: true, // 显示 gzip 压缩后的体积
							brotliSize: true, // 显示 brotli 压缩后的体积
						}),
					],
				},
			},
			esbuild: {
				drop: ['console', 'debugger'], // 删除 console 和 debugger 语句
			},
		},

		/**
		 * 开发服务器配置
		 */
		server: {
			port: 5173, // 开发服务器端口
			// open: true, // 自动打开浏览器
			proxy: {
				[env.VITE_DEV_API]: {
					target: env.VITE_DEV_API_BASE_URL, // 目标服务器地址
					changeOrigin: true, // 是否改变请求头中的 Origin 为目标服务器地址
					rewrite: (path) => path.replace(/^\/api/, ''), // 重写请求路径
				},

				// 代理Websocket
				'/ws': {
					target: env.VITE_DEV_API_BASE_URL,
					changeOrigin: true,
					ws: false, // 是否代理 WebSocket 连接
					rewrite: (path) => path.replace(/^\/ws/, ''),
				},
			},
		},
	};
});
