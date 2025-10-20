// router.tsx
import { createBrowserRouter, redirect } from 'react-router-dom';
// import Layout from './components/Layout';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Profile from './pages/Profile';
// import ErrorPage from './pages/ErrorPage';

// 模拟身份验证检查函数
const checkAuth = async () => {
	// 在实际应用中，这里可能是从 localStorage 或 API 检查 token
	const token = localStorage.getItem('authToken');
	return !!token;
};

// 模拟获取用户数据
const fetchUserData = async () => {
	// 实际应用中，这里会调用 API
	return { name: 'John Doe', role: 'user' };
};

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				loader: async () => {
					// 根路径重定向到首页
					return redirect('/home');
				},
			},
			{
				path: 'home',
				element: <Home />,
				loader: async () => {
					// 可在此加载首页数据
					const data = await fetchHomeData();
					return { data };
				},
			},
			{
				path: 'login',
				element: <Login />,
				loader: async ({ request }) => {
					// 如果已登录，访问登录页时重定向到仪表板
					const isAuthenticated = await checkAuth();
					if (isAuthenticated) {
						return redirect('/dashboard');
					}
					return null;
				},
			},
			{
				path: 'dashboard',
				element: <Dashboard />,
				loader: async ({ request }) => {
					// 保护路由：未登录时重定向到登录页
					const isAuthenticated = await checkAuth();
					if (!isAuthenticated) {
						// 携带来源信息，登录后可回跳
						const url = new URL(request.url);
						return redirect(`/login?redirect=${encodeURIComponent(url.pathname)}`);
					}

					// 已登录用户，加载仪表板数据
					const userData = await fetchUserData();
					return { userData };
				},
			},
			{
				path: 'profile',
				element: <Profile />,
				loader: async () => {
					// 保护路由：未登录时重定向到登录页
					const isAuthenticated = await checkAuth();
					if (!isAuthenticated) {
						return redirect('/login');
					}

					try {
						const profileData = await fetchProfileData();
						return { profileData };
					} catch (error) {
						// 数据加载失败时重定向到错误页或首页
						return redirect('/home');
					}
				},
			},
			{
				path: 'admin',
				loader: async () => {
					// 基于用户角色的重定向
					const isAuthenticated = await checkAuth();
					if (!isAuthenticated) {
						return redirect('/login');
					}

					const userData = await fetchUserData();
					if (userData.role !== 'admin') {
						// 非管理员用户重定向到无权限页面或首页
						return redirect('/home');
					}

					// 管理员用户正常加载路由
					return { userData };
				},
				// 注意：这里可以懒加载管理员组件
				lazy: () => import('./pages/Admin'),
			},
			{
				path: 'old-path',
				loader: async () => {
					// 旧路径重定向到新路径
					return redirect('/new-path');
				},
			},
			{
				path: 'new-path',
				element: <Home />, // 实际的新路径组件
			},
		],
	},
	{
		path: '*',
		loader: async () => {
			// 404 处理：捕获未匹配路径
			return redirect('/home');
		},
	},
]);

// 模拟 API 调用
async function fetchHomeData() {
	return { title: 'Welcome', content: 'Home page content' };
}

async function fetchProfileData() {
	return { email: 'user@example.com', preferences: {} };
}
