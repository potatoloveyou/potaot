const base_url = 'https://tea.qingnian8.com/api/bizhi';

export const request = (config: any = {}) => {
	let { url, data = {}, method = 'GET', header = {} } = config;

	url = `${base_url}${url}`;
	header['access-key'] = '940438';
	// header['access-key'] = '411301';



	return new Promise((resolve, reject) => {
		uni.request({
			url,
			data,
			method,
			header,
			success: (res: any) => {
				// 此处判断需根据项目接口返回数据中的状态字段进行修改
				if (res.data.errCode === 0) {
					resolve(res.data);
				} else if (res.data.errCode === 400) {
					uni.showModal({
						// 此处内容也是需要根据接口参数进行修改
						title: '错误提示',
						content: res.data.errMsg,
						showCancel: false,
					});
				} else {
					uni.showToast({
						// 此处内容也是需要根据接口参数进行修改
						title: res.data.errMsg,
						icon: 'none',
					});
					reject(res.data);
				}
			},
			fail: (err) => {},
		});
	});
};
