import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

// vant懒加载组件
import { Lazyload } from 'vant';
// 注册时可以配置额外的选项
app.use(Lazyload, {
	lazyComponent: true,
});

app.mount('#app');

// import { Toast } from 'vant';
// app.use(Toast);
