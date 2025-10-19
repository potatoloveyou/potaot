import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router/index';

// 引入重置css
import 'reset-css/reset.css';

// 引入tailwindcss
import '@/assets/styles/main.css';

// 引入全局样式
import '@/assets/styles/global.scss';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
