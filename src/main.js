
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';

Vue.use(ElementUI);
// 1.3 导入全局样式
import './less/index.less';
import axios from 'axios';
axios.defaults.baseURL = 'http://127.0.0.1:8899';
axios.defaults.withCredentials = true;
Vue.prototype.$http = axios;
Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
