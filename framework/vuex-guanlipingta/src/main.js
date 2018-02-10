// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js' //全局变量控制
import lodash from 'lodash' //
import api from './assets/js/api.js'


//import api from './assets/js/api.js'   

//引入ElementUI
import myelement from './assets/js/element-ui.js'

//默认样式
import "./assets/css/reset.css"
import "./assets/css/mui.css"

Vue.config.productionTip = false

//Vue.prototype.$api = api;

window.api = Vue.prototype.api = api;
window._ = Vue.prototype._ = lodash;


router.beforeEach((to, from, next) => {


  store.commit('setState', [{
    ajaxLoad: true
  }]) //loading效果


  store.dispatch('progress/startLoad')
  store.commit('setState', [{
    defaultActive: to.path
  }, store.state.leftMenu])

  if (store.getters['login/getToken'] == "") {
    if (to.name != "login") {
      next({
        path: '/login'
      })
    } else {
      next();
    }
  } else {
    if (to.name == "login") {
      next({
        path: '/'
      })
    } else {
      next();
    }
  }
})

router.afterEach((to, from) => {
  store.dispatch('progress/endLoad')

  setTimeout(() => {
    store.commit('setState', [{
      ajaxLoad: false
    }]) //loading效果
  }, 300);
})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
