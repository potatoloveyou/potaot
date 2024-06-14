module.exports = {
	presets: ['@vue/cli-plugin-babel/preset'],
  // babel自动按需引入插件
	plugins: [
		[
			'import',
			{
				libraryName: 'vant',
				libraryDirectory: 'es',
				style: true,
			},
			'vant',
		],
	],
};
