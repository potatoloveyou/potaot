// 队列核心实现
type RequestTask<T = any> = () => Promise<T>;

export class RequestQueue {
	private maxConcurrent: number; // 最大并发数
	private currentCount: number; // 当前进行中的请求数
	private queue: Array<{
		task: RequestTask;
		resolve: (value: any) => void;
		reject: (reason?: any) => void;
	}> = []; // 等待队列

	constructor(maxConcurrent: number = 5) {
		this.maxConcurrent = maxConcurrent;
		this.currentCount = 0;
	}

	// 添加请求到队列
	async add<T>(task: RequestTask<T>): Promise<T> {
		return new Promise<T>((resolve, reject) => {
			// 将任务包装并加入队列
			this.queue.push({
				task,
				resolve,
				reject,
			});

			// 尝试执行下一个任务
			this.next();
		});
	}

	// 执行下一个任务
	private next(): void {
		// 如果达到最大并发数或队列为空，则返回
		if (this.currentCount >= this.maxConcurrent || this.queue.length === 0) {
			return;
		}

		// 从队列中取出任务
		const { task, resolve, reject } = this.queue.shift()!;
		this.currentCount++;

		// 执行任务
		task()
			.then((result) => {
				resolve(result);
			})
			.catch((error) => {
				reject(error);
			})
			.finally(() => {
				this.currentCount--;
				this.next(); // 一个任务完成，执行下一个
			});
	}

	// 获取队列状态
	getStatus() {
		return {
			currentCount: this.currentCount,
			waitingCount: this.queue.length,
			maxConcurrent: this.maxConcurrent,
		};
	}

	// 清空队列
	clear(): void {
		this.queue = [];
	}
}
