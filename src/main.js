import Vue from 'vue'
import axios from 'axios'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$axios = axios


new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
