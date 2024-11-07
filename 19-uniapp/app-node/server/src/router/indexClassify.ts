const Router = require('@koa/router');
// https://github.com/koajs/router
const router = new Router();

// 中间件，解析post请求的参数
const bodyParser = require('koa-bodyparser');

// 首页分类
router.get('/index_list/data/:index', bodyParser(), async (ctx, next) => {
	try {
		let { index } = ctx.request.params; // 获取路径参数
		let { offset } = ctx.request.query; // 获取查询参数

		switch (index) {
			case '2':
				ctx.body = {
					code: 0,
					index,
					offset,
					data: [
						{
							type: 'bannerList',
							imgUrl: '../../../static/imgs/banner2.jpg',
						},
						{
							type: 'iconsList',
							data: [
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
							],
						},
						{
							type: 'hotList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
						{
							type: 'shopList',
							data: [
								{
									bigImgUrl: '../../../static/imgs/banner3.jpg',
									data: [
										{
											id: 1,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '299',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 2,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '399',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 3,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 4,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 5,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 6,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
									],
								},
								{
									bigImgUrl: '../../../static/imgs/banner3.jpg',
									data: [
										{
											id: 1,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '299',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 2,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '399',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 3,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 4,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 5,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 6,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
									],
								},
							],
						},
						{
							type: 'commodityList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 4,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
					],
				};
				break;
			case '3':
				ctx.body = {
					code: 0,
					index,
					offset,
					data: [
						{
							type: 'bannerList',
							imgUrl: '../../../static/imgs/banner2.jpg',
						},
						{
							type: 'iconsList',
							data: [
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '服饰内衣' },
							],
						},
						{
							type: 'hotList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
						{
							type: 'shopList',
							data: [
								{
									bigImgUrl: '../../../static/imgs/banner3.jpg',
									data: [
										{
											id: 1,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '299',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 2,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '399',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 3,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 4,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 5,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 6,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
									],
								},
								{
									bigImgUrl: '../../../static/imgs/banner3.jpg',
									data: [
										{
											id: 1,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '299',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 2,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '399',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 3,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 4,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 5,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 6,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
									],
								},
							],
						},
						{
							type: 'commodityList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 4,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
					],
				};
				break;
			default:
				ctx.body = {
					code: 0,
					index,
					offset,
					data: [
						{
							type: 'bannerList',
							imgUrl: '../../../static/imgs/banner2.jpg',
						},
						{
							type: 'iconsList',
							data: [
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
								{ imgUrl: '../../../static/imgs/xxmLogo.png', name: '运动户外' },
							],
						},
						{
							type: 'hotList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
						{
							type: 'shopList',
							data: [
								{
									bigImgUrl: '../../../static/imgs/banner3.jpg',
									data: [
										{
											id: 1,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '299',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 2,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '399',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 3,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 4,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 5,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 6,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
									],
								},
								{
									bigImgUrl: '../../../static/imgs/banner3.jpg',
									data: [
										{
											id: 1,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '299',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 2,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '399',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 3,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 4,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 5,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
										{
											id: 6,
											imgUrl: '../../static/imgs/classify1.jpg',
											name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
											pprice: '499',
											oprice: '699',
											discount: '5.2',
										},
									],
								},
							],
						},
						{
							type: 'commodityList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 4,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
					],
				};
				break;
		}

		switch (offset) {
			case '2':
				ctx.body = {
					code: 0,
					data: [
						{
							type: 'commodityList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 4,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
					],
				};
				break;
			case '3':
				ctx.body = {
					code: 0,
					data: [
						{
							type: 'commodityList',
							data: [
								{
									id: 1,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '299',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 2,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '399',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 3,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
								{
									id: 4,
									imgUrl: '../../static/imgs/classify1.jpg',
									name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
									pprice: '499',
									oprice: '699',
									discount: '5.2',
								},
							],
						},
					],
				};
				break;

			default:
				// ctx.body = {
				// 	code: 0,
				// 	data: [
				// 		{
				// 			type: 'commodityList',
				// 			data: [
				// 				{
				// 					id: 1,
				// 					imgUrl: '../../static/imgs/classify1.jpg',
				// 					name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
				// 					pprice: '299',
				// 					oprice: '699',
				// 					discount: '5.2',
				// 				},
				// 				{
				// 					id: 2,
				// 					imgUrl: '../../static/imgs/classify1.jpg',
				// 					name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
				// 					pprice: '399',
				// 					oprice: '699',
				// 					discount: '5.2',
				// 				},
				// 				{
				// 					id: 3,
				// 					imgUrl: '../../static/imgs/classify1.jpg',
				// 					name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
				// 					pprice: '499',
				// 					oprice: '699',
				// 					discount: '5.2',
				// 				},
				// 				{
				// 					id: 4,
				// 					imgUrl: '../../static/imgs/classify1.jpg',
				// 					name: '阿德杀杀毒哈师大哈拉少等哈拉萨大叔大撒打算手打阿是、婶',
				// 					pprice: '499',
				// 					oprice: '699',
				// 					discount: '5.2',
				// 				},
				// 			],
				// 		},
				// 	],
				// };
				break;
		}
	} catch (error) {}
});

module.exports = router;
