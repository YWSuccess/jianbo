import Vue from 'vue'
import axios from './_axios'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
import router from './router'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$axios = axios

Vue.use(VueRouter)

Vue.use(VueCookies)

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
