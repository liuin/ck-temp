//登录状态管理
const loginModule = {
  namespaced: true,
  state: {
    token: null,
    userInfo: null,
    aid: sessionStorage.getItem('aid') || '',
    nickname: sessionStorage.getItem('nickname') || '用户',
    rname: localStorage.getItem('username') || '',
    rpwd: localStorage.getItem('password') || ''
  },
  mutations: { //唯一修改状态的state方法 ，只能同步，不能异步
    changeToken(state, tk) {
      sessionStorage.setItem('token', tk);
      state.token = tk;
    },
    changeUserInfo(state, info) {
      state.userInfo = info;
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
