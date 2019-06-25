import Vue from 'vue'
import axios from './_axios/_axios'
import VueCookies from 'vue-cookies'
import router from './router/router'
import store from './vuex/store'
import App from './App'

// IE浏览器兼容性处理 
window.Promise = Promise;

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(VueCookies)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})
