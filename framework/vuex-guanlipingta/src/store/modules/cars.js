const cars = {
  namespaced: true,
  state: {
    create: {
      title: "",
      icon: "",
      state: "",
      long: "",
      with: "",
      high: "",
      load: "",
      order: 1
    },
    update: {
      title: "",
      icon: "",
      state: "",
      long: 100,
      with: 100,
      high: 100,
      load: 1000,
      order: 9,
      id: 0
    },
    show: {
      id: 0,
      res: []
    },
    list: {
      page: 1,
      count: 10,
      total: 1,
      res: []
    },
    state: {
      1: '可用',
      0: '不可用'
    }
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    create({
      state,
      commit
    }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.carsCreate,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    update({
      state,
      commit
    }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.carsUpdate,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
            reject(data)
          }
        });
      })
    },

    show({
      state,
      commit
    }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.carsShow,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
            reject(data)

          }
        });
      })
    },

    list({
      state,
      commit
    }, sendData) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.carsList,
          data: sendData,
          success: data => {
            resolve(data);
          },
          error: data => {
            reject(data)

          }
        });
      })
    }
  }
}

export default cars
