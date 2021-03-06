import Vue from 'vue'
import Axios from 'axios'
import {
  Toast
} from 'vant';
import router from '../../router';
import store from './../../store/store.js';
import qs from 'qs';

var api = {};
api.pathEnd = '';
api.url = {};
/*api.path='/api';
api.pathEnd='/';*/
//api.path='http://appbuy.030.shop'



api.path = configApi;


api.url.demo = 'http://rap2api.taobao.org/app/mock/1415/POST//information/tabs'; //demo



api.url.captchaGet = api.path + '/captcha/get' + api.pathEnd;
api.url.smsGetCode = api.path + '/sms/getCode' + api.pathEnd;
api.url.userRegister = api.path + '/user/register' + api.pathEnd;
api.url.tokenGet = api.path + '/token/get' + api.pathEnd;
api.url.userResetPwdBySms = api.path + '/user/resetPwdBySms' + api.pathEnd;
api.url.userShowByMe = api.path + '/user/showByMe' + api.pathEnd;
api.url.userUpdateByMe = api.path + '/user/updateByMe' + api.pathEnd;
api.url.userGetInviteQrCode = api.path + '/user/getInviteQrCode' + api.pathEnd;
api.url.userGetAppQrCode = api.path + '/user/getAppQrCode' + api.pathEnd;
api.url.userGetPromotersByMe = api.path + '/user/getPromotersByMe' + api.pathEnd;
api.url.userGetCustomersByMe = api.path + '/user/getCustomersByMe' + api.pathEnd;
api.url.wechatGetSign = api.path + '/wechat/getSign' + api.pathEnd;
api.url.userGetInviteQrCode = api.path + '/user/getInviteQrCode' + api.pathEnd;
api.url.moneydetailPullout = api.path + '/moneydetail/pullout' + api.pathEnd;
api.url.userSetMyPromoterState = api.path + '/user/setMyPromoterState' + api.pathEnd;
api.url.userGetAllFrozenMoneyByMe = api.path + '/user/getAllFrozenMoneyByMe' + api.pathEnd;
api.url.userGetAllActiveMoneyByMe = api.path + '/user/getAllActiveMoneyByMe' + api.pathEnd;
api.url.tokenDestroy = api.path + '/token/destroy' + api.pathEnd;
api.url.userShow = api.path + '/user/show' + api.pathEnd;




api.ajaxHandle = function (res, options) {
  if (res.status == 200) {
    if (options.noLoading != true) {
      // Toast.loading({
      //   mask: true,
      //   // message: '加载中...',
      //   duration: 300
      // });
      store.commit('ajaxLoadChange', false);

    }
    var data = res.data;
    if (options.result) {
      options.result && options.result(data);
    } else {
      if (data.status == 200) {
        options.success && options.success(data.result);
      } else if (data.status == 301) {
        store.commit('login/changeToken', '');
        Toast({
          message: '请先登录',
          duration: 1000
        });
        let query = router.history.current.fullPath ? router.history.current.fullPath : '/';
        setTimeout(function () {
          router.push({
            path: '/login'
            // query: {
            //   redirect: query
            // }
          });
        }, 1000);
      } else if (data.status == 400) {
        Toast({
          message: data.msg,
          duration: 1000
        });
        // console.log(window.location.href.indexOf('shareWelcome'));

        if (window.location.href.indexOf('shareWelcome') > -1) {
          return false
        }

        if (data.msg.indexOf('token') > -1 || data.msg == 'token已过期请重新登录') {
          store.commit('login/changeToken', '');
          router.push('/login')
          return false
        }

        options.error && options.error(data.msg);
      } else {
        Toast({
          message: "加载出错",
          duration: 1000
        });
        options.error && options.error(data.msg);
      }
    }
  } else {
    Toast({
      message: '请求接口错误',
      type: "error",
      duration: 1000
    });
  }

  // store.commit('ajaxLoadChange', false)  
}

api.ajax = function (options) {
  if (!options.data) options.data = {};
  options.data.client = 3;
  options.data.token = store.getters['login/getToken'];
  options.data.uid = store.state.login.uid;
  options.data.device = '88888888';
  options.data.version = '1.0.1';

  if (options.noLoading != true) {
    // Toast.loading({
    //   mask: true,
    //   // message: '加载中...',
    //   duration: 0
    // });
    store.commit('ajaxLoadChange', true);
  }

  // store.commit('ajaxLoadChange', true)

  if (options.type == 'get') {
    Axios.get(options.url, {
      params: options.data
    }).then(res => {
      api.ajaxHandle(res, options);
    });
  } else {
    Axios.post(options.url, qs.stringify(options.data)).then(res => {
      api.ajaxHandle(res, options);
    }).catch(res => {
      console.log('1111');
      Toast({
        message: '加载出错',
        type: "error",
        duration: 1000
      });
    });
  }
}


api.imgdesc = function (img, size) {
  if (img) {
    // if ((img.indexOf('.png') > -1) || (img.indexOf('.jpg') > -1)) {
    //   return img
    // }


    if (img.indexOf('!') == -1) {
      if (size) {
        if (size == 'false') {

        } else if (/^\!/.test(size)) {
          img = img + size;
        } else {
          img = img + '!' + size;
        }
      } else {
        img = img + '!desc';
      }
    }
  }
  return img;
}

export default api;
