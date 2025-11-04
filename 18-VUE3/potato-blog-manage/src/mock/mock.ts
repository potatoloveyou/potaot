// @ts-ignore  // 临时忽略类型声明缺失，确保构建通过
import Mock from 'mockjs';
const Random = Mock.Random;

// 总览数据
export const overView = Mock.mock({
	code: 200,
	data: {
		file: Random.float(60, 100, 3, 2) + 'M',
		'article|0-50': 0,
		'gallery|0-50': 0,
		'diary|0-50': 0,
	},
});

// 访问量
export const visit = Mock.mock({
	code: 200,
	'data|30': [
		{
			// 随机生成一个日期
			data: '@datetime(MM-dd)',
			count: '@integer(0, 500)',
		},
	],
});
