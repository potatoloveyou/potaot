import axios, {
	type AxiosInstance,
	type AxiosRequestConfig,
	type AxiosResponse,
	type InternalAxiosRequestConfig,
	type AxiosError,
} from 'axios';

const config: AxiosRequestConfig = {
  // 通过vite配置，将/api前缀接口代理成后端接口地址
	baseURL: import.meta.env.VITE_DEV_API,
	timeout: 5000,
};

const request: AxiosInstance = axios.create(config);

// 请求拦截器
request.interceptors.request.use(
	(config: InternalAxiosRequestConfig) => {
		// 获取 token 并添加到请求头
		const token = localStorage.getItem('token');
		if (token && config.headers) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

// 响应拦截器
request.interceptors.response.use(
	(response: AxiosResponse) => {
		// 后端统一返回格式假设为 { code: number, data: T, message: string }
		const res = response.data;
		if (res.code !== 200) {
			return Promise.reject(res || '请求失败');
		}
	},
	(error: AxiosError) => {
		return Promise.reject(error);
	},
);

export default request;
