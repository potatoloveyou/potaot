// 包装层，使用队列包装请求
import { RequestQueue } from '@/utils/RequestQueue.ts';
import request from '@/api/request.ts'; // 你已有的带拦截器的 axios 实例

// 创建请求队列
const requestQueue = new RequestQueue(5);

// 包装原有的请求方法，加入队列控制
export const queuedRequest = {
	request: <T = any>(config: any): Promise<T> => {
		return requestQueue.add(() => request.request(config));
	},

	get: <T = any>(url: string, config?: any): Promise<T> => {
		return requestQueue.add(() => request.get(url, config));
	},

	post: <T = any>(url: string, data?: any, config?: any): Promise<T> => {
		return requestQueue.add(() => request.post(url, data, config));
	},

	put: <T = any>(url: string, data?: any, config?: any): Promise<T> => {
		return requestQueue.add(() => request.put(url, data, config));
	},

	delete: <T = any>(url: string, config?: any): Promise<T> => {
		return requestQueue.add(() => request.delete(url, config));
	},

	// 获取队列状态
	getQueueStatus: () => requestQueue.getStatus(),

	// 清空队列
	clearQueue: () => requestQueue.clear(),
};

export default queuedRequest;
