const base_url = 'http://localhost:8080';

interface Config {
	url: string;
	data?: any;
	method?: string;
	header?: any;
}

export const request = (config: Config) => {
	let { url, data = {}, method = 'GET', header = {} } = config;
	url = `${base_url}${url}`;
	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header,
			// 请求成功的回调函数
			success: (res: any) => {
				if (res.statusCode != 200) {
					return;
				}
				if (res.data.code === 0) {
					resolve(res.data);
				}
			},
			fail: (error) => {
				console.log(error);
			},
		});
	});
};
