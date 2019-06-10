import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const instance = new Vuex.Store({
  state:{
    isLogin:false
  },
  mutations:{
    updateIsLogin(state,isLogin){
      state.isLogin = isLogin
    }
  }
})

export default instance