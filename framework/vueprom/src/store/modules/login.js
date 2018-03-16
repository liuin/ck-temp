import api from './../../assets/js/api.js'
//登录状态管理
const loginModule = {
  namespaced: true,
  state: {
    token: null,
    userInfo: null,
    invite_code: sessionStorage.getItem('invite_code') || '',
    userDes: '',
    uid: sessionStorage.getItem('uid') || '',
    nickname: sessionStorage.getItem('nickname') || '用户',
    rname: localStorage.getItem('username') || '',
    rpwd: localStorage.getItem('password') || '',
    userSate: {
      1: '认证中',
      2: '已认证',
      3: '已锁定'
    }
  },
  mutations: { //唯一修改状态的state方法 ，只能同步，不能异步
    changeToken(state, tk) {
      sessionStorage.setItem('token', tk);
      state.token = tk;
    },
    changeUserInfo(state, info) {
      state.userInfo = info;
      sessionStorage.setItem('uid', info.uid);
      state.uid = info.uid;
    },
    changeUserDes(state, info) {
      state.invite_code = info.invite_code;
      sessionStorage.setItem('invite_code', info.invite_code);
      state.userDes = info;
    }
  },
  getters: { //类似计算属性方法
    getToken(state) {
      if (!state.token) {
        state.token = sessionStorage.getItem('token') || '';
      }
      return state.token;
    },
    getUserInfo(state) {
      if (!state.userInfo) {
        state.userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : '';
      }
      return state.userInfo;
    }
  },

  actions: { //可以异步操作
    //    setToken({commit},tk){
    //      sessionStorage.setItem('token',tk);
    //      commit('changeToken',tk);
    //    },
    getUserDes({
      state,
      commit
    }, info) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.userShowByMe,
          success: data => {
            commit("changeUserDes", data);
            resolve(data);
          }
        });
      })
    },
    setUserInfo({
      commit
    }, info) {
      sessionStorage.setItem('userInfo', JSON.stringify(info));
      commit('changeUserInfo', info);
    },
    login({
      commit,
      state
    }, data) { //登录           
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.login,
          data: data,
          success: data => {
            state.nickname = data.nickname
            sessionStorage.setItem('nickname', data.nickname)
            resolve(data);
          },
          error: data => {
            reject(456);
          }
        });
      })
    }
  }
}


export default loginModule;
