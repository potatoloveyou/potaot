module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset',

    // vant自动按需引入组件
		'import',
		{
			libraryName: 'vant',
			libraryDirectory: 'es',
			style: true,
		},
		'vant',
	],
};
