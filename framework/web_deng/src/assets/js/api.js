import Vue from 'vue'
import Axios from 'axios'
import router from '../../router';
import store from '../../store/store.js';
import qs from 'qs';
import {
  MessageBox
} from 'element-ui';
import _ from 'lodash' //

var api = {};
api.pathEnd = '';
api.url = {};
/*api.path='/api';
api.pathEnd='/';*/
//api.path='http://appbuy.030.shop'

api.path = configApi;

api.url.login = api.path + '/login/getToken' + api.pathEnd; //登录接口
api.url.uploadImg = api.path + '/upload' + api.pathEnd; //上传图片
api.url.leftMenu = api.path + '/sysMenu/listOnSidebar' + api.pathEnd; //左边目录

//左边目录
api.url.uploadLeftMenu = api.path + '/zithan/importMenu' + api.pathEnd; //更新左边目录
api.url.sysMenuListInAccess = api.path + '/sysMenu/listInAccess' + api.pathEnd; //获取权限列表


//角色
api.url.adminGroupCreate = api.path + '/adminGroup/create' + api.pathEnd;
api.url.adminGroupUpdate = api.path + '/adminGroup/update' + api.pathEnd;
api.url.adminGroupList = api.path + '/adminGroup/list' + api.pathEnd;
api.url.adminGroupShow = api.path + '/adminGroup/show' + api.pathEnd;
api.url.adminGroupTotal = api.path + '/adminGroup/total' + api.pathEnd;

//账号
api.url.adminCreate = api.path + '/admin/create' + api.pathEnd;
api.url.adminUpdate = api.path + '/admin/update' + api.pathEnd;
api.url.adminUpdateBySelf = api.path + '/admin/updateBySelf' + api.pathEnd;
api.url.adminDestroy = api.path + '/admin/destroy' + api.pathEnd;
api.url.adminList = api.path + '/admin/list' + api.pathEnd;
api.url.adminShow = api.path + '/admin/show' + api.pathEnd;
api.url.adminChangePwd = api.path + '/admin/changePwd' + api.pathEnd;
api.url.adminTotal = api.path + '/admin/total' + api.pathEnd;
api.url.adminLogout = api.path + '/admin/logout' + api.pathEnd; //退出接口


//司机模块
api.url.driverList = api.path + '/driver/list' + api.pathEnd; // 司机列表
api.url.driverShow = api.path + '/driver/show' + api.pathEnd; //获取司机详情
api.url.driverAudit = api.path + '/driver/audit' + api.pathEnd; // 司机审核
api.url.driverTotal = api.path + '/driver/total' + api.pathEnd; // 获取司机总计数

//厂商模块
api.url.makerList = api.path + '/maker/list' + api.pathEnd; // 厂商列表
api.url.makerShow = api.path + '/maker/show' + api.pathEnd; // 厂商详情

//第三方平台
api.url.platformCreate = api.path + '/platform/create' + api.pathEnd; //
api.url.platformUpdate = api.path + '/platform/update' + api.pathEnd; // 
api.url.platformShow = api.path + '/platform/show' + api.pathEnd; // 
api.url.platformList = api.path + '/platform/list' + api.pathEnd; // 
api.url.platformTotal = api.path + '/platform/total' + api.pathEnd; // 
api.url.platformGetMakersById = api.path + '/platform/getMakers' + api.pathEnd; // 

//创建物流园
api.url.parkCreate = api.path + '/park/create' + api.pathEnd;
api.url.parkUpdate = api.path + '/park/update' + api.pathEnd;
api.url.parkShow = api.path + '/park/show' + api.pathEnd;
api.url.parkList = api.path + '/park/list' + api.pathEnd;
api.url.parkTotal = api.path + '/park/total' + api.pathEnd;

//车辆类型
api.url.carsCreate = api.path + '/cars/create' + api.pathEnd;
api.url.carsUpdate = api.path + '/cars/update' + api.pathEnd;
api.url.carsShow = api.path + '/cars/show' + api.pathEnd;
api.url.carsList = api.path + '/cars/list' + api.pathEnd;
api.url.carsTotal = api.path + '/cars/total' + api.pathEnd;

//订单
api.url.ordersList = api.path + '/orders/list' + api.pathEnd;
api.url.ordersShow = api.path + '/orders/show' + api.pathEnd;
api.url.ordersDispose = api.path + '/orders/dispose' + api.pathEnd;

//订单取消原因
api.url.ordersCanceledReasonCreate = api.path + '/ordersCanceledReason/create' + api.pathEnd;
api.url.ordersCanceledReasonUpdate = api.path + '/ordersCanceledReason/update' + api.pathEnd;
api.url.ordersCanceledReasonShow = api.path + '/ordersCanceledReason/show' + api.pathEnd;
api.url.ordersCanceledReasonList = api.path + '/ordersCanceledReason/list' + api.pathEnd;
api.url.ordersCanceledReasonTotal = api.path + '/ordersCanceledReason/total' + api.pathEnd;

//评论
api.url.commentList = api.path + '/comment/list' + api.pathEnd;

//司机&厂商的标签 
api.url.tagsCreate = api.path + '/tags/create' + api.pathEnd;
api.url.tagsUpdate = api.path + '/tags/update' + api.pathEnd;
api.url.tagsShow = api.path + '/tags/show' + api.pathEnd;
api.url.tagsList = api.path + '/tags/list' + api.pathEnd;
api.url.tagsDestroy = api.path + '/tags/destroy' + api.pathEnd;
api.url.tagsDriverBind = api.path + '/tagsDriver/bind' + api.pathEnd;
api.url.tagsMakerBind = api.path + '/tagsMaker/bind' + api.pathEnd;
api.url.tagsDriverList = api.path + '/tagsDriver/list' + api.pathEnd;
api.url.tagsMakerList = api.path + '/tagsMaker/list' + api.pathEnd;
api.url.tagsDriverUnbind = api.path + '/tagsDriver/unbind' + api.pathEnd;
api.url.tagsMakerUnbind = api.path + '/tagsMaker/unbind' + api.pathEnd;

//文章分类&文章
api.url.articleCategoryCreate = api.path + '/articleCategory/create' + api.pathEnd;
api.url.articleCategoryUpdate = api.path + '/articleCategory/update' + api.pathEnd;
api.url.articleCategoryShow = api.path + '/articleCategory/show' + api.pathEnd;
api.url.articleCategoryList = api.path + '/articleCategory/list' + api.pathEnd;

api.url.articleCreate = api.path + '/article/create' + api.pathEnd;
api.url.articleUpdate = api.path + '/article/update' + api.pathEnd;
api.url.articleShow = api.path + '/article/show' + api.pathEnd;
api.url.articleList = api.path + '/article/list' + api.pathEnd;
api.url.articleDestroy = api.path + '/article/destroy' + api.pathEnd;

//反馈列表
api.url.feedbackList = api.path + '/feedback/list' + api.pathEnd;
api.url.feedbackDispose = api.path + '/feedback/dispose' + api.pathEnd;
api.url.feedbackShow = api.path + '/feedback/show' + api.pathEnd;

// 收货地(仓库)模块 / 根据厂商Id获取收货地址
api.url.warehouseListByMaker = api.path + '/warehouse/listByMaker' + api.pathEnd;

//目的地(物流公司) / 根据厂商id获取目的地
api.url.companyListByMaker = api.path + '/company/listByMaker' + api.pathEnd;

//消息模块
api.url.messageCategoryCreate = api.path + '/messageCategory/create' + api.pathEnd;
api.url.messageCategoryUpdate = api.path + '/messageCategory/update' + api.pathEnd;
api.url.messageCategoryShow = api.path + '/messageCategory/show' + api.pathEnd;
api.url.messageCategoryList = api.path + '/messageCategory/list' + api.pathEnd;
api.url.messageTemplateCreate = api.path + '/messageTemplate/create' + api.pathEnd;
api.url.messageTemplateUpdate = api.path + '/messageTemplate/update' + api.pathEnd;
api.url.messageTemplateShow = api.path + '/messageTemplate/show' + api.pathEnd;
api.url.messageTemplateList = api.path + '/messageTemplate/list' + api.pathEnd;
api.url.messageTemplatePauseOrStart = api.path + '/messageTemplate/pauseOrStart' + api.pathEnd;
api.url.messageTemplateDestroyDraft = api.path + '/messageTemplate/destroyDraft' + api.pathEnd;

//活动管理
api.url.activityCreate = api.path + '/activity/create';
api.url.activityUpdate = api.path + '/activity/update';
api.url.activityShow = api.path + '/activity/show';
api.url.activityList = api.path + '/activity/list';
api.url.activityPauseOrStart = api.path + '/activity/pauseOrStart';


api.ajaxHandle = function (res, options) {
  // store.commit('setState',[{ajaxLoad: false}])


  // _.debounce(function() {
  //   console.log(store.state.ajaxLoad);    
  // }, 500)

  // api.ajaxLoadEnd()

  if (res.status == 200) {
    var data = res.data;
    if (options.result) {
      options.result && options.result(data);
    } else {
      if (data.status == 200) {
        options.success && options.success(data.result);
      } else if (data.status == 301) {
        store.commit('login/changeToken', '');
        MessageBox.alert('请先登录', '', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {}
        });

      } else if (400) {

        if (data.msg == '非法token' || data.msg == 'token已过期请重新登录') {
          store.commit('login/changeToken', '');
          router.push('/login')
          return false
        }

        MessageBox.alert((data.msg && data.msg != "") ? data.msg : '加载出错', '', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {}
        });
        options.error && options.error(data.msg);
      } else {
        //				Toast({message:data.msg,duration:1000});
        MessageBox.alert(data.msg, '', {
          confirmButtonText: '确定',
          type: 'error',
          callback: action => {}
        });
        options.error && options.error(data.msg);
      }
    }
  }
}


api.ajax = function (options) {

  if (!options.data) options.data = {};
  options.data.client = 3;
  options.data.token = store.getters['login/getToken'];
  options.data.aid = store.state.login.aid;
  options.data.device = '88888888';
  options.data.version = '1.0.1';

  // api.ajaxLoadStart()



  if (options.type == 'get') {
    Axios.get(options.url, {
      params: options.data
    }, {
      headers: {
        //      'Content-Type': 'application/x-www-form-urlencoded',
        //      'token': store.getters['login/getToken']
      }
    }).then(res => {
      api.ajaxHandle(res, options);
    });
  } else {
    //    if (store.getters['login/getToken'] == "") {
    //      Axios.post(options.url,qs.stringify(options.data)).then(res=>{
    //        api.ajaxHandle(res,options);
    //      });      
    //    }else {
    Axios.post(options.url, qs.stringify(options.data), {
      headers: {
        //        'Content-Type': 'application/x-www-form-urlencoded',
        //        'Authorization': store.getters['login/getToken']
      }
    }).then(res => {
      api.ajaxHandle(res, options);
    });
    //    }
  }
}


//时间戳
api.toTime = function (timeVal) {
  var newDate = new Date();
  newDate.setTime(timeVal * 1000);
  return newDate.toLocaleString();
}

// //区域转化
// api.toLocations = function (loc) {
//   var a = loc.split(',')
//   return _.chunk(a, 2)
// }
api.toLocations = function (loc) {
  var ar = loc.split('|');
  var ar1 = []
  ar.map(item => {
    item = item.split(',')
    ar1.push(item)
  })

  return ar1
}

api.spImg = function (str) {
  return str.split(",")
}




export default api;
