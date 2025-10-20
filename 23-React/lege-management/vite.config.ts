import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			babel: {
				plugins: [['babel-plugin-react-compiler']],
			},
		}),
		tailwindcss(),
	],
	resolve: {
		alias: {
			// 这里配置意义是Vite 需要知道：这个路径对应哪个实际文件
			// ./src > 推荐：明确相对路径  ;  src > 可以，但不够明确
			'@': path.resolve(__dirname, './src'),
		},
	},
});
