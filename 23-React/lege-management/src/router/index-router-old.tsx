import App from '@/App';
import Home from '@/views/Home';
import About from '@/views/About';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// 两种路由模式的组件：
// 1. BrowserRouter（History模式）：基于HTML5的路由模式，使用浏览器的历史记录栈来管理路由。
// 2. HashRouter（Hash模式）：基于哈希路由模式，使用URL的哈希值来管理路由。

// Navigate组件：用于导航到指定的路径(重定向)

const baseRouter = () => (
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route index element={<Navigate to='/home' />} />
				<Route path='/home' element={<Home />} />
				<Route path='/about' element={<About />} />
			</Route>
		</Routes>
	</BrowserRouter>
);

export default baseRouter;
