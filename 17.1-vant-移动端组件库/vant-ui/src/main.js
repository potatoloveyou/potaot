import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 方式一：自动按需引入vant组件
// （1）下载 babel-plugin-import 插件：npm install babel-plugin-import --save-dev。
// （2）在 .babelrc 或 babel.config.js 中配置插件：{ "plugins": [["import", { "libraryName": "vant", "style": true }]] }。
// （3）在main.js中自动引入所需组件并注册(需要重启)
import { Button } from 'vant';
Vue.use(Button);

Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
