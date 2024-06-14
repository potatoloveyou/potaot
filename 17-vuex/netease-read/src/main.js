import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { Tab, Tabs } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
