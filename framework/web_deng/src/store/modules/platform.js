const platform = {
  namespaced: true,
  state: {
    create: {
      title: "",
      company: "",
      state: "3"
    },
    update: {
      id: "",
      title: "",
      company: "",
      state: ""
    },
    show: {
      id: 0,
      res: {}
    },
    state: {
      "0": '待审核',
      "1": '审核中',
      "2": '审核失败',
      "3": '合作中',
      "4": '暂停合作',
      "9": '通过审核'
    },
    list: {
      page: 1,
      count: 10,
      total: 1,
      res: []
    },
    getMakersById: {
      page: 1,
      count: 10,
      res: []
    }
  },
  getters: {
  },
  actions: {
    create({ state, commit, getters }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.platformCreate,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    update({ state, commit, getters }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.platformUpdate,
          data: sendDate,
          success: data => {
            resolve(data)
          },
          error: data => {

          }
        });
      })
    },
    show({ state, commit, getters }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.platformShow,
          data: sendDate,
          success: data => {
            resolve(data)
          },
          error: data => {

          }
        });
      })
    },
    list({ state, commit, getters }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.platformList,
          data: sendDate,
          success: data => {
            state.list.res = data.list
            resolve(data)
          },
          error: data => {

          }
        });
      })
    },
    getMakersById({ state, commit, getters }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.platformGetMakersById,
          data: sendDate,
          success: data => {
            resolve(data)
          },
          error: data => {

          }
        });
      })
    }


  }
}

export default platform
