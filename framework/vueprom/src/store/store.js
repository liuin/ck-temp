import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mutations from "./mutations.js" //公用mutations
import loginModule from "./modules/login.js" //登录模块


Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    token: '333',
    userInfo: null,
    ajaxLoad: false
  },

  strict: false,

  mutations: mutations,

  modules: {
    login: loginModule
  }

})



export default store;
