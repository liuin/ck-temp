// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Axios from 'axios'
import 'lib-flexible'
import Api from './assets/js/api.js'
import store from './store/store.js'
import moment from 'moment'
// import Function from './assets/js/function.js'



import {
  Checkbox,
  CheckboxGroup,
  Field,
  Button,
  Cell,
  CellGroup,
  Icon,
  Loading,
  NavBar,
  Toast,
  PullRefresh,
  Waterfall,
  Popup,
  DatetimePicker,
  Radio
} from "vant";
Vue.use(Checkbox).use(CheckboxGroup);
Vue.use(Field);
Vue.use(Button);
Vue.use(Cell).use(CellGroup);
Vue.use(Icon);
Vue.use(Loading);
Vue.use(NavBar);
Vue.use(PullRefresh);
Vue.use(Waterfall);
Vue.use(Popup);
Vue.use(DatetimePicker);
Vue.use(Radio);




import verify from "vue-verify-plugin";
Vue.use(verify, {
  blur: false
});




// import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
// Vue.use(Vant);

import "./assets/css/reset.css"

Vue.config.productionTip = false
Vue.prototype.$api = Api
Vue.prototype.$moment = moment
Vue.prototype.$toast = Toast

//store.dispatch('setToken','')
router.beforeEach((to, from, next) => {
  Toast.loading({
    mask: true,
    // message: '加载中...',
    duration: 0
  });
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
  Toast.clear()
  // store.commit('ajaxLoadChange', false)
  // setTimeout(() => {
  //   store.commit('setState', [{
  //     ajaxLoad: false
  //   }]) //loading效果
  // }, 300);
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
