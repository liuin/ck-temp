const tags = {
  namespaced: true,
  state: {
    type: {
      1: '司机标签',
      2: '厂商标签'
    },
    create: {
      title: "",
      type: ""
    },
    update: {
      id: "",
      title: ""
    },
    showLable: {
      id: 0,
      type: "",
      res: {
        id: 0,
        title:""
      }
    },
    labelList: {
      type: ""
    },
    lablePager: {
      page: 1,
      count: 10,
      total: 0,
      res: []
    },
    pager: {
      page: 1,
      count: 10,
      total: 0,
      res: []
    },

    destroy: {
      id: ""
    },
    driverBind: {

    },
    makerBind: {

    }
  },
  getters: {
    conditions: state => {
      var arr = {};
      for (var i in state.list) {
        if (i == 'created') {
          if (state.list[i][0] != undefined && state.list[i][0] != "") {
            arr.created = state.list[i].map(item => {
              if (_.isDate(item)) {
                return item = item.getTime() / 1000
              } else {
                return item
              }
            })
          }
        } else if (state.list[i] !== "") {
          arr[i] = state.list[i]
        }
      }
      return JSON.stringify(arr);
    }
  },
  mutations: {

  },
  actions: {
    create(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsCreate,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    update(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsUpdate,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    show(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.tagsShow,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    labelList(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsList,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    labelDestroy(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsDestroy,
          data: sendDate,
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

export default tags
