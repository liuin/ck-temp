//登录状态管理
const ordersCanceledReason = {
  namespaced: true,
  state: {
    create: {
      title: "",
      state: 0,
      order: 1
    },
    state: {
      0: "不可用",
      1: "可用"
    },
    update: {
      id: 0,
      title: "",
      state: "",
      order: 1
    },
    show: {
      res: []
    },
    list: {
      page: 1,
      count: 10,
      total: 1,
      res: []
    }
  },
  actions: {   //可以异步操作
    create({ commit, state }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.ordersCanceledReasonCreate,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
          }
        });
      })
    },

    update({ commit, state }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.ordersCanceledReasonUpdate,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
          }
        });
      })
    },

    show({ commit, state }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.ordersCanceledReasonShow,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
          }
        });
      })
    },
    list({ commit, state }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.ordersCanceledReasonList,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
          }
        });
      })
    }

  }
}


export default ordersCanceledReason;


