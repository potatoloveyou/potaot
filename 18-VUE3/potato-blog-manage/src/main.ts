import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router/index';
import { setupRouterGuard } from './router/guard';

// 引入重置css
import 'reset-css/reset.css';

// 引入tailwindcss
import '@/assets/styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);
// 注册路由守卫
// setupRouterGuard(router);

app.mount('#app');
