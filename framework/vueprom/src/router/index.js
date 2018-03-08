import Vue from 'vue'
import Router from 'vue-router'


const home = r => require.ensure([], () => r(require('../pages/home.vue')));
const code = r => require.ensure([], () => r(require('../pages/code.vue')));
const login = r => require.ensure([], () => r(require('../pages/login.vue')));
const customers = r => require.ensure([], () => r(require('../pages/customers.vue')));
const money = r => require.ensure([], () => r(require('../pages/money.vue')));
const myPoster = r => require.ensure([], () => r(require('../pages/myPoster.vue')));
const person = r => require.ensure([], () => r(require('../pages/person.vue')));
const shareWelcome = r => require.ensure([], () => r(require('../pages/shareWelcome.vue')));

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior(to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  },
  routes: [{
      path: '/login',
      name: 'login',
      component: login
    }, {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/customers',
      name: 'customers',
      component: customers
    },
    {
      path: '/code',
      name: 'code',
      component: code
    },
    {
      path: '/money',
      name: 'money',
      component: money
    },
    {
      path: '/myPoster',
      name: 'myPoster',
      component: myPoster
    },
    {
      path: '/person',
      name: 'person',
      component: person
    },
    {
      path: '/shareWelcome',
      name: 'shareWelcome',
      component: shareWelcome
    }
  ]
})
