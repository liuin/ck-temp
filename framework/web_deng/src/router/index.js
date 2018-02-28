import Vue from 'vue'
import Router from 'vue-router'

//import HelloWorld from '@/components/HelloWorld'
const home = r => require.ensure([], () => r(require('../pages/home.vue'))); //后台首页
const login = r => require.ensure([], () => r(require('../pages/login.vue')), 'login'); //登录
const userDriverList = r => require.ensure([], () => r(require('../pages/userDriverList.vue'))); //司机方列表
const userDriverListDetail = r => require.ensure([], () => r(require('../pages/userDriverListDetail.vue'))); //司机方详情
const userNeederList = r => require.ensure([], () => r(require('../pages/userNeederList.vue'))); //需求方列表
const userNeederListDetail = r => require.ensure([], () => r(require('../pages/userNeederListDetail.vue'))); //需求方详情
const userDriverLable = r => require.ensure([], () => r(require('../pages/userDriverLable.vue'))); //司机方标签
const userNeederLable = r => require.ensure([], () => r(require('../pages/userNeederLable.vue'))); //需求方标签

const orderList = r => require.ensure([], () => r(require('../pages/orderList.vue'))); //订单列表
const orderListDetail = r => require.ensure([], () => r(require('../pages/orderListDetail.vue'))); //订单详情

const messageList = r => require.ensure([], () => r(require('../pages/messageList.vue'))); //消息列表
const messageListAdd = r => require.ensure([], () => r(require('../pages/messageListAdd.vue'))); //消息增加
const messageListEdit = r => require.ensure([], () => r(require('../pages/messageListEdit.vue'))); //消息编辑
const messageListDetail = r => require.ensure([], () => r(require('../pages/messageListDetail.vue'))); //消息详情
const messageDrafts = r => require.ensure([], () => r(require('../pages/messageDrafts.vue'))); //草稿箱
const messageCate = r => require.ensure([], () => r(require('../pages/messageCate.vue'))); //消息分类
const appraiseList = r => require.ensure([], () => r(require('../pages/appraiseList.vue'))); //评价列表
const moneyDraw = r => require.ensure([], () => r(require('../pages/moneyDraw.vue'))); //提现管理
const moneyFreeze = r => require.ensure([], () => r(require('../pages/moneyFreeze.vue'))); //冻结管理
const moneyRecharge = r => require.ensure([], () => r(require('../pages/moneyRecharge.vue'))); //充值管理
const moneyConsume = r => require.ensure([], () => r(require('../pages/moneyConsume.vue'))); //消费管理
const feedbackList = r => require.ensure([], () => r(require('../pages/feedbackList.vue'))); //反馈列表
const feedbackListDetail = r => require.ensure([], () => r(require('../pages/feedbackListDetail.vue'))); //反馈详情

const activityList = r => require.ensure([], () => r(require('../pages/activityList.vue'))); //活动列表
const activityComplete = r => require.ensure([], () => r(require('../pages/activityComplete.vue'))); //成单奖励
const activityCompleteAdd = r => require.ensure([], () => r(require('../pages/activityCompleteAdd.vue'))); //成单奖励 添加编辑
const activityCompleteEdit = r => require.ensure([], () => r(require('../pages/activityCompleteEdit.vue'))); //成单奖励 编辑
const activityCompleteDetail = r => require.ensure([], () => r(require('../pages/activityCompleteDetail.vue'))); //成单奖励 详情
const activityInvite = r => require.ensure([], () => r(require('../pages/activityInvite.vue'))); //邀请奖励
const activityInviteAdd = r => require.ensure([], () => r(require('../pages/activityInviteAdd.vue'))); //邀请奖励 添加编辑
const activityInviteEdit = r => require.ensure([], () => r(require('../pages/activityInviteEdit.vue'))); //邀请奖励 编辑
const activityInviteDetail = r => require.ensure([], () => r(require('../pages/activityInviteDetail.vue'))); //邀请奖励 详情
const activityRecharge = r => require.ensure([], () => r(require('../pages/activityRecharge.vue'))); //充值奖励
const activityRechargeAdd = r => require.ensure([], () => r(require('../pages/activityRechargeAdd.vue'))); //充值奖励 添加
const activityRechargeEdit = r => require.ensure([], () => r(require('../pages/activityRechargeEdit.vue'))); //充值奖励 编辑
const activityRechargeDetail = r => require.ensure([], () => r(require('../pages/activityRechargeDetail.vue'))); //充值奖励详情

const operate = r => require.ensure([], () => r(require('../pages/operate.vue'))); //运营管理
const operateDriver = r => require.ensure([], () => r(require('../pages/operateDriver.vue'))); //司机管理
const operateNeeder = r => require.ensure([], () => r(require('../pages/operateNeeder.vue'))); //厂家管理
const operatePrice = r => require.ensure([], () => r(require('../pages/operatePrice.vue'))); //车辆使用价格

const articleList = r => require.ensure([], () => r(require('../pages/articleList.vue'))); //文章列表
const articleListAdd = r => require.ensure([], () => r(require('../pages/articleListAdd.vue'))); //文章添加
const articleListEdit = r => require.ensure([], () => r(require('../pages/articleListEdit.vue'))); //文章编辑
const articleCate = r => require.ensure([], () => r(require('../pages/articleCate.vue'))); //文章分类管理
const articleDrafts = r => require.ensure([], () => r(require('../pages/articleDrafts.vue'))); //文章草稿箱

const knowledgeLogisticsList = r => require.ensure([], () => r(require('../pages/knowledgeLogisticsList.vue'))); //物流园列表
const knowledgeLogisticsListAdd = r => require.ensure([], () => r(require('../pages/knowledgeLogisticsListAdd.vue'))); //物流园添加
const knowledgeLogisticsListEdit = r => require.ensure([], () => r(require('../pages/knowledgeLogisticsListEdit.vue'))); //物流园编辑

const knowledgeCarType = r => require.ensure([], () => r(require('../pages/knowledgeCarType.vue'))); //车辆类型管理
const knowledgeCarTypeAdd = r => require.ensure([], () => r(require('../pages/knowledgeCarTypeAdd.vue'))); //车辆类型添加
const knowledgeCarTypeEdit = r => require.ensure([], () => r(require('../pages/knowledgeCarTypeEdit.vue'))); //车辆类型管理编辑

const knowledgeCancel = r => require.ensure([], () => r(require('../pages/knowledgeCancel.vue'))); //订单取消原因
const knowledgeCancelDetail = r => require.ensure([], () => r(require('../pages/knowledgeCancelDetail.vue'))); //订单取消详情
const systemRole = r => require.ensure([], () => r(require('../pages/systemRole.vue'))); //角色管理
const systemRoleAdd = r => require.ensure([], () => r(require('../pages/systemRoleAdd.vue'))); //角色添加
const systemRoleEdit = r => require.ensure([], () => r(require('../pages/systemRoleEdit.vue'))); //角色编辑
const systemAccount = r => require.ensure([], () => r(require('../pages/systemAccount.vue')), 'systemAccount'); //角色管理
const systemAccountAdd = r => require.ensure([], () => r(require('../pages/systemAccountAdd.vue')), 'systemAccountAdd'); //添加角色
const systemAccountEdit = r => require.ensure([], () => r(require('../pages/systemAccountEdit.vue')), 'systemAccountAdd'); //编辑角色
const person = r => require.ensure([], () => r(require('../pages/person.vue'))); //个人中心
const personPwd = r => require.ensure([], () => r(require('../pages/personPwd.vue'))); //个人中心密码

const server = r => require.ensure([], () => r(require('../pages/server.vue'))); //服务平台列表
const serverAdd = r => require.ensure([], () => r(require('../pages/serverAdd.vue'))); //服务平台列表
const serverEdit = r => require.ensure([], () => r(require('../pages/serverEdit.vue'))); //服务平台列表
const serverDetail = r => require.ensure([], () => r(require('../pages/serverDetail.vue'))); //服务平台获取详情




//const Demo = r => require.ensure([], () => r(require('../pages/demo-region.vue'))); //测试



Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [{
      path: '/',
      component: home,
      name: 'home'
    },
    {
      path: '/login',
      component: login,
      name: 'login'
    },

    {
      path: '/user/driverList',
      component: userDriverList,
      name: 'userDriverList'
    },
    {
      path: '/user/driverListDetail',
      component: userDriverListDetail,
      name: 'userDriverListDetail'
    },
    {
      path: '/user/neederList',
      component: userNeederList,
      name: 'userNeederList'
    },
    {
      path: '/user/neederListDetail',
      component: userNeederListDetail,
      name: 'userNeederListDetail'
    },
    {
      path: '/user/driverLable',
      component: userDriverLable,
      name: 'userDriverLable'
    },
    {
      path: '/user/neederLable',
      component: userNeederLable,
      name: 'userNeederLable'
    },
    {
      path: '/order/list',
      component: orderList,
      name: 'orderList'
    },
    {
      path: '/order/ListDetail',
      component: orderListDetail,
      name: 'orderListDetail'
    },
    {
      path: '/message/list',
      component: messageList,
      name: 'messageList'
    },
    {
      path: '/message/listAdd',
      component: messageListAdd,
      name: 'messageListAdd'
    },
    {
      path: '/message/listDetail',
      component: messageListDetail,
      name: 'messageListDetail'
    },
    {
      path: '/message/drafts',
      component: messageDrafts,
      name: 'messageDrafts'
    },
    {
      path: '/message/cate',
      component: messageCate,
      name: 'messageCate'
    },
    {
      path: '/appraise/list',
      component: appraiseList,
      name: 'appraiseList'
    },
    {
      path: '/money/draw',
      component: moneyDraw,
      name: 'moneyDraw'
    },
    {
      path: '/money/freeze',
      component: moneyFreeze,
      name: 'moneyFreeze'
    },
    {
      path: '/money/recharge',
      component: moneyRecharge,
      name: 'moneyRecharge'
    },
    {
      path: '/money/consume',
      component: moneyConsume,
      name: 'moneyConsume'
    },
    {
      path: '/feedback/list',
      component: feedbackList,
      name: 'feedbackList'
    },
    {
      path: '/feedback/listDetail',
      component: feedbackListDetail,
      name: 'feedbackListDetail'
    },

    {
      path: '/activity/complete',
      component: activityComplete,
      name: 'activityComplete'
    },
    {
      path: '/activity/completeAdd',
      component: activityCompleteAdd,
      name: 'activityCompleteAdd'
    },
    {
      path: '/activity/completeDetail',
      component: activityCompleteDetail,
      name: 'activityCompleteDetail'
    },
    {
      path: '/activity/completeEdit',
      component: activityCompleteEdit,
      name: 'activityCompleteEdit'
    },
    {
      path: '/activity/invite',
      component: activityInvite,
      name: 'activityInvite'
    },
    {
      path: '/activity/inviteAdd',
      component: activityInviteAdd,
      name: 'activityInviteAdd'
    },
    {
      path: '/activity/inviteEdit',
      component: activityInviteEdit,
      name: 'activityInviteEdit'
    },
    {
      path: '/activity/inviteDetail',
      component: activityInviteDetail,
      name: 'activityInviteDetail'
    },
    {
      path: '/activity/recharge',
      component: activityRecharge,
      name: 'activityRecharge'
    },
    {
      path: '/activity/rechargeAdd',
      component: activityRechargeAdd,
      name: 'activityRechargeAdd'
    },
    {
      path: '/activity/rechargeEdit',
      component: activityRechargeEdit,
      name: 'activityRechargeEdit'
    },
    {
      path: '/activity/rechargeDetail',
      component: activityRechargeDetail,
      name: 'activityRechargeDetail'
    },

    {
      path: '/operate/driver',
      component: operateDriver,
      name: 'operateDriver'
    },
    {
      path: '/operate/needer',
      component: operateNeeder,
      name: 'operateNeeder'
    },
    {
      path: '/operate/price',
      component: operatePrice,
      name: 'operatePrice'
    },

    {
      path: '/article/list',
      component: articleList,
      name: 'articleList'
    },
    {
      path: '/article/cate',
      component: articleCate,
      name: 'articleCate'
    },
    {
      path: '/article/drafts',
      component: articleDrafts,
      name: 'articleDrafts'
    },
    {
      path: '/article/listAdd',
      component: articleListAdd,
      name: 'articleListAdd'
    },
    {
      path: '/article/listEdit',
      component: articleListEdit,
      name: 'articleListEdit'
    },

    {
      path: '/knowledge/logisticsList',
      component: knowledgeLogisticsList,
      name: 'knowledgeLogisticsList'
    },
    {
      path: '/knowledge/logisticsListAdd',
      component: knowledgeLogisticsListAdd,
      name: 'knowledgeLogisticsListAdd'
    },
    {
      path: '/knowledge/logisticsListEdit',
      component: knowledgeLogisticsListEdit,
      name: 'knowledgeLogisticsListEdit'
    },

    {
      path: '/knowledge/carTypeAdd',
      component: knowledgeCarTypeAdd,
      name: 'knowledgeCarTypeAdd'
    },
    {
      path: '/knowledge/carTypeEdit',
      component: knowledgeCarTypeEdit,
      name: 'knowledgeCarTypeEdit'
    },
    {
      path: '/knowledge/carType',
      component: knowledgeCarType,
      name: 'knowledgeCarType'
    },
    {
      path: '/knowledge/cancel',
      component: knowledgeCancel,
      name: 'knowledgeCancel'
    },
    {
      path: '/knowledge/cancelDetail',
      component: knowledgeCancelDetail,
      name: 'knowledgeCancelDetail'
    },
    {
      path: '/system/account',
      component: systemAccount,
      name: 'systemAccount'
    },
    {
      path: '/system/accountAdd',
      component: systemAccountAdd,
      name: 'systemAccountAdd'
    },
    {
      path: '/system/accountEdit',
      component: systemAccountEdit,
      name: 'systemAccountEdit'
    },
    {
      path: '/system/role',
      component: systemRole,
      name: 'systemRole'
    },
    {
      path: '/system/roleAdd',
      component: systemRoleAdd,
      name: 'systemRoleAdd'
    },
    {
      path: '/system/roleEdit',
      component: systemRoleEdit,
      name: 'systemRoleEdit'
    },
    {
      path: '/server',
      component: server,
      name: 'server'
    },
    {
      path: '/server/add',
      component: serverAdd,
      name: 'serveradd'
    },
    {
      path: '/server/edit',
      component: serverEdit,
      name: 'serverEdit'
    },
    {
      path: '/server/Detail',
      component: serverDetail,
      name: 'serverDetail'
    },
    {
      path: '/person',
      component: person,
      name: 'person'
    },
    {
      path: '/person/pwd',
      component: personPwd,
      name: 'personPwd'
    },
    {
      path: '/message/listEdit',
      component: messageListEdit,
      name: 'messageListEdit'
    },


    //    {path: '/demo', component: Demo, name:'demo'}

  ]
})
