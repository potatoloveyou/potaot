import axios from 'axios';

// 创建缓存对象
const cache = new Map();

// 判断请求是否可缓存
function isCacheable(config: any) {
	return config.method === 'GET' && !config.url.includes('?');
}

// 生成缓存键
function getCacheKey(config: any) {
	return config.url;
}

// 缓存响应
function cacheResponse(config: any, response: any) {
	const key = getCacheKey(config);
	cache.set(key, response);
	console.log(`Cached response for ${key}`);
}

// 获取缓存的响应
function getCachedResponse(config: any) {
	const key = getCacheKey(config);
	return cache.get(key);
}

// 配置 axios 实例
let config = {
	baseURL: 'https://apis.netstart.cn/douguo',
	// baseURL: process.env.baseURL || process.env.apiUrl || ""
	// timeout: 60 * 1000, // Timeout
	// withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

// 请求拦截器
_axios.interceptors.request.use(
	async (config) => {
		if (isCacheable(config)) {
			const cachedResponse = getCachedResponse(config);
			if (cachedResponse) {
				config.headers.Authorization = cachedResponse.headers.Authorization;
				return cachedResponse;
			}
		}
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	},
);

// 响应拦截器
_axios.interceptors.response.use(
	(response) => {
		if (isCacheable(response.config)) {
			cacheResponse(response.config, response);
		}
		return response;
	},
	function (error) {
		// Do something with response error
		return Promise.reject(error);
	},
);

export default _axios;

// import axios from 'axios';

// let config = {
// 	baseURL: 'https://apis.netstart.cn/douguo',
// 	// baseURL: process.env.baseURL || process.env.apiUrl || ""
// 	// timeout: 60 * 1000, // Timeout
// 	// withCredentials: true, // Check cross-site Access-Control
// };

// const _axios = axios.create(config);

// // 请求拦截器
// _axios.interceptors.request.use(
// 	function (config) {
// 		// console.log("发送请求");
// 		// Do something before request is sent

// 		// 将token放到请求头中
// 		// config.headers = { token: localStorage.getItem("token") };
// 		return config;
// 	},
// 	function (error) {
// 		// Do something with request error
// 		return Promise.reject(error);
// 	},
// );

// // 响应拦截器
// _axios.interceptors.response.use(
// 	function (response) {
// 		// Do something with response data
// 		return response;
// 	},
// 	function (error) {
// 		// Do something with response error
// 		return Promise.reject(error);
// 	},
// );

// export default _axios;
