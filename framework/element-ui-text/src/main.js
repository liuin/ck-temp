
//import $ from 'jquery'
import Vue from 'vue'
//import 'element-ui/lib/theme-default/index.css'

import VueRouter from "vue-router";  
Vue.use(VueRouter);

import Item from './item.vue'
import App from './App.vue'
import Page2 from './page2.vue'
import Page3 from './page3.vue'

Vue.config.silent = true; //取消 Vue 所有的日志与警告。
Vue.config.devtools = false;

Vue.component(Item.name, Item);

// 定义组件, 也可以像教程之前教的方法从别的文件引入
//import secondcomponent from './component/secondcomponent.vue'

const routes = [
  { path: '/page2', component: Page2 },
  { path: '/page3', component: Page3 }
]

// 创建一个路由器实例
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes:routes
})





new Vue({
  el: '#app',
  render: function  (h) {
    return h(App);
  },
  router
})




