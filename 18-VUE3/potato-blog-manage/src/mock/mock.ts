// @ts-ignore  // 临时忽略类型声明缺失，确保构建通过
import { id } from 'element-plus/es/locales.mjs';
import Mock from 'mockjs';
const Random = Mock.Random;

// 总览数据
export const overView = Mock.mock({
	code: 200,
	data: {
		file: Random.float(60, 100, 3, 2) + 'M',
		article: '@integer(0, 50)',
		gallery: '@integer(0, 50)',
		diary: '@integer(0, 50)',
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

// 数据监测
export const survey = Mock.mock({
	code: 200,
	data: {
		device: [
			{
				key: 'mobile',
				name: '移动端',
				value: '@integer(0, 500)',
			},
			{
				key: 'pc',
				name: '电脑端',
				value: '@integer(0, 500)',
			},
		],
		website: [
			{
				key: 'home',
				name: '首页',
				value: '@integer(0, 500)',
			},
			{
				key: 'project',
				name: '项目',
				value: '@integer(0, 500)',
			},
			{
				key: 'diary',
				name: '日记',
				value: '@integer(0, 500)',
			},
			{
				key: 'photo',
				name: '摄影',
				value: '@integer(0, 500)',
			},
		],
	},
});

// 评论
export const comment = Mock.mock({
	code: 200,
	data: {
		total: '@integer(0, 1000)',
		'list|50': [
			{
				user: {
					'id|+1': '@id',
					username: '@name',
					avatar: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
					time: '@datetime(MM-dd)',
				},
				'id|+1': '@id',
				content: '@cparagraph(1, 3)', // 评论内容
				likeCount: '@integer(0, 100)', // 点赞数
				report: '@integer(0, 50)', // 举报数
				'createTime|+1': '@datetime(yyyy-MM-dd HH:mm:ss)', // 创建时间
				'level|1-3': 1,
				limit: '@integer(0, 100)',
				offset: '@integer(0, 100)',
				// reply: {
				// 	total: '@integer(0, 10)',
				// 	'list|5': [

				// 	],
				// },
			},
		],
	},
});

// 本地文件-文章分组
export const localFilesArticleGrouping = Mock.mock({
	code: 200,
	data: {
		count: '@integer(300, 1000)',
		// 'list|4': [
		// 	{
		// 		id: '@id',
		// 		name: '@ctitle(2,4)',
		// 		value: '@integer(0, 100)',
		// 		createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
		// 	},
		// ],
		list: [
			{
				id: 'exclude',
				name: '未分组',
				value: '@integer(0, 100)',
				createTime: '-',
			},
			{
				id: '@id',
				name: '@ctitle(2,4)',
				value: '@integer(0, 100)',
				createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
			},
			{
				id: '@id',
				name: '@ctitle(2,4)',
				value: '@integer(0, 100)',
				createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
			},
			{
				id: '@id',
				name: '@ctitle(2,4)',
				value: '@integer(0, 100)',
				createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
			},
			{
				id: '@id',
				name: '@ctitle(2,4)',
				value: '@integer(0, 100)',
				createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
			},
		],
	},
});

// 文件数据
export const files = Mock.mock({
	code: 200,
	data: {
		count: 9,
		'list|9': [
			{
				id: '@id',
				url: '@url()',
				fileName: '@ctitle(50)',
				format: 'jpeg',
				'subsetId|0-4': 3,
			},
		],
	},
});

// 分组
export const label = Mock.mock({
	code: 200,
	data: {
		count: '@integer(300, 1000)',
		'list|20': [
			{
				id: '@id',
				name: '@ctitle(2,4)',
				createTime: '@datetime(yyyy-MM-dd HH:mm:ss)',
			},
		],
	},
});

// 文章数据
export const articles = Mock.mock({
	code: 200,
	data: {
		count: '@integer(0, 1000)',
		'list|50': [
			{
				id: '@id',
				cover: 'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg', // 文章封面
				title: '@ctitle(4,10)', // 文章标题
				createTime: '@datetime(yyyy-MM-dd)',
				label: '@ctitle(2)/@ctitle(2)/@ctitle(2)', // 文章标签
				introduce: '@cparagraph(1, 4)', // 文章介绍
				region: '@ctitle(2)', // 文章地区
				viewCount: '@integer(0, 1000)', // 文章阅读量
				praiseCount: '@integer(0, 1000)', // 文章点赞数
				commentCount: '@integer(0, 1000)', // 文章评论数
				'state|0-1': 0, // 文章状态 0未发布 1已发布
				subsetId: '@id', // 文章分组
			},
		],
	},
});
