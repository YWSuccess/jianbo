import Vue from 'vue'
import axios from './_axios'
import VueCookies from 'vue-cookies'
import router from './router'
import store from './vuex/store'
import App from './App'

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
