import Vue from 'vue'
import axios from './_axios'
import VueRouter from 'vue-router'
import routes from './routes'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$axios = axios
Vue.use(VueRouter)

const router = new VueRouter({
	routes,
	mode:'history'
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
