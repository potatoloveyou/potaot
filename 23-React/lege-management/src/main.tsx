import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// 引入重置css
import 'reset-css/reset.css';

// UI框架样式
import '@ant-design/v5-patch-for-react-19';

// 引入tailwindcss样式
import '@/assets/styles/main.css';

// 引入全局样式
import '@/assets/styles/global.scss';

// 引入路由,替换顶级组件为baseRouter
// 老写法
// import Router from '@/router/index-router-old';
// 新写法直接引入App组件
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		{/* 老写法，使用Router组件 */}
		{/* <Router /> */}

		{/* 新写法，直接引入App组件 */}
		<App />
	</StrictMode>,
);
