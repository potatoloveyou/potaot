// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: '2024-04-03',
	devtools: { enabled: true },

	// 配置全局样式（nuxt中~表示根）
	// 但是只能初始化样式，不能初始化变量
	// css: ['~/assets/css/base.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					// additionalData: `@import "~/assets/css/base.scss";`,
					additionalData: `@use "~/assets/css/base.scss" as *;`,
				},
			},
		},
	},

	// 运行时的全局变量
	runtimeConfig: {
		// 基础路径（既能在服务端获取到也可在客户端获取到）
		public: {
			baseUrl: 'http://localhost:3000',
		},

		// 正常变量只能在服务端获取到
		count: 1,

		isServer: '1111',
	},

	modules: ['@element-plus/nuxt'],
});
