import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import mutations from "./mutations.js" //公用mutations
import loginModule from "./modules/login.js" //登录模块
import progress from "./modules/progress.js" //页面地址进度条
import leftMenu from "./modules/leftMenu.js"
import adminGroup from "./modules/adminGroup.js"
import admin from "./modules/admin.js"
import driver from "./modules/driver.js"
import maker from "./modules/maker.js"
import platform from "./modules/platform.js"
import park from "./modules/park.js"
import cars from "./modules/cars.js"
import ordersCanceledReason from "./modules/ordersCanceledReason.js"
import orders from "./modules/orders.js"
import comment from "./modules/comment.js"
import tags from "./modules/tags.js"
import articleCategory from "./modules/articleCategory.js"
import feedback from "./modules/feedback.js"
import uploadImg from "./modules/uploadImg.js"
import warehouse from "./modules/warehouse.js"
import company from "./modules/company.js"
import message from "./modules/message.js"
// import activity from "./modules/activity.js"


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
    login: loginModule,
    progress: progress,
    leftMenu: leftMenu,
    adminGroup: adminGroup,
    admin: admin,
    driver: driver,
    maker: maker,
    platform: platform,
    park: park,
    cars: cars,
    ordersCanceledReason: ordersCanceledReason,
    orders: orders,
    comment: comment,
    tags: tags,
    articleCategory: articleCategory,
    feedback: feedback,
    uploadImg: uploadImg,
    warehouse: warehouse,
    company: company,
    message: message
  }

})



export default store;
