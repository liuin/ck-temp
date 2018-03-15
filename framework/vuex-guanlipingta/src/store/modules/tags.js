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
        title: ""
      }
    },
    tagsDriverList: {
      tags_id: "",
      mobile: "",
      page: 1,
      count: 10,
      total: 1,
      res: []
    },
    tagsDriverBind: {
      tags_driver: []
    },
    tagsDriverUnbind: {
      tags_driver: []
    },

    tagsMakerList: {
      tags_id: "",
      mobile: "",
      page: 1,
      count: 10,
      total: 1,
      res: []
    },
    tagsMakerBind: {
      tags_maker: []
    },
    tagsMakerUnbind: {
      tags_maker: []
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
    conditionsDriver: state => {
      var arr = {};

      var sendData = {
        tags_id: state.tagsDriverList.tags_id,
        mobile: state.tagsDriverList.mobile
      }

      for (var i in sendData) {
        if (i == 'created') {
          if (sendData[i][0] != undefined && sendData[i][0] != "") {
            arr.created = sendData[i].map(item => {
              if (_.isDate(item)) {
                return item = item.getTime() / 1000
              } else {
                return item
              }
            })
          }
        } else if (sendData[i] !== "") {
          arr[i] = sendData[i]
        }
      }
      return JSON.stringify(arr);
    },

    conditionsMaker: state => {
      var arr = {};

      var sendData = {
        tags_id: state.tagsMakerList.tags_id,
        mobile: state.tagsMakerList.mobile
      }

      for (var i in sendData) {
        if (i == 'created') {
          if (sendData[i][0] != undefined && sendData[i][0] != "") {
            arr.created = sendData[i].map(item => {
              if (_.isDate(item)) {
                return item = item.getTime() / 1000
              } else {
                return item
              }
            })
          }
        } else if (sendData[i] !== "") {
          arr[i] = sendData[i]
        }
      }
      return JSON.stringify(arr);
    }
  },
  mutations: {

  },
  actions: {
    tagsDriverBind({
      state
    }) {
      //  console.log(state.tagsDriverBind.tags_driver);
      //  var sendData = {
      //   tags_driver: state.tagsDriverBind.tags_driver
      //  }
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsDriverBind,
          data: state.tagsDriverBind,
          success: data => {
            state.tagsMakerBind.tags_driver = [];
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    tagsDriverUnbind({
      state
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsDriverUnbind,
          data: state.tagsDriverUnbind,
          success: data => {
            resolve(data)
            state.tagsDriverUnbind.tags_driver = [];
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    tagsMakerBind({
      state
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsMakerBind,
          data: state.tagsMakerBind,
          success: data => {
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    tagsMakerUnbind({
      state
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsMakerUnbind,
          data: state.tagsMakerUnbind,
          success: data => {
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
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
    },

    tagsDriverList({
      state,
      getters
    }) {
      var sendData = {
        conditions: getters.conditionsDriver,
        page: state.tagsDriverList.page,
        count: state.tagsDriverList.count,
        total: state.tagsDriverList.total
      }


      // console.log(sendData);
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsDriverList,
          data: sendData,
          success: data => {
            state.tagsDriverList.res = data.list
            state.tagsDriverList.total = data.list_total
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },

    tagsMakerList({
      state,
      getters
    }) {
      var sendData = {
        conditions: getters.conditionsMaker,
        page: state.tagsMakerList.page,
        count: state.tagsMakerList.count,
        total: state.tagsMakerList.total
      }


      // console.log(sendData);
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.tagsMakerList,
          data: sendData,
          success: data => {
            state.tagsMakerList.res = data.list
            state.tagsMakerList.total = data.list_total
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    }

  }


}

export default tags
