import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

// 全部引入
// import Vant from 'vant';
// import 'vant/lib/index.css';
// Vue.use(Vant);

// // 按需引入
// import { Rate } from 'vant';
// import 'vant/lib/rate/style';
// Vue.use(Rate);

// import { Button } from 'vant';
// import 'vant/lib/button/style';
// Vue.use(Button);

import { Rate, Button } from 'vant';
import 'vant/lib/index.css';
Vue.use(Rate);
Vue.use(Button);


Vue.config.productionTip = false;

new Vue({
	router,
	store,
	render: (h) => h(App),
}).$mount('#app');
