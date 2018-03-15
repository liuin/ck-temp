const ordersLog = {
  data() {
    return {
      ordersLogId: this.$route.query.id || 0,
      ordersLogState: {
        1: "系统",
        2: "司机",
        3: "厂商"
      },
      ordersLogList: []
    }
  },
  created() {
    this.ordersLogLoad();
  },
  methods: {
    ordersLogLoad() {
      this.api.ajax({
        type: "post",
        url: this.api.url.ordersLogById,
        data: {
          id: this.ordersLogId
        },
        // dataType: "dataType",
        success: data => {
          this.ordersLogList = data.orders_log;
        }
      });
    }
  },
  mounted: function () {}
}



const orders = {
  namespaced: true,
  state: {
    list: {
      "maker_mobile": "",
      "driver_mobile": "",
      "order_sn": "",
      "driver_name": "",
      "created": ["", ""],
      "order_state": "",
      "maker_id": ""
    },
    orderState: {
      "0": "全部",
      "1": "待接单",
      "2": "已指派",
      "3": "待收货",
      "4": "已收货",
      "5": "待送达",
      "6": "已抵达",
      "7": "待确认",
      "8": "已取消",
      "9": "已完成"
    },
    show: {
      id: 1,
      res: {}
    },
    pager: {
      page: 1,
      count: 10,
      total: 0
    },
    searchData: {
      list: []
    },
    dispose: {
      id: "",
      state: "",
      description: ""
    }
  },
  getters: {
    conditions: state => {
      var arr = {};
      for (var i in state.list) {
        if (i == 'created') {
          if (state.list[i] == null) {
            return state.list[i] = "";
          }
          if (state.list[i][0] != undefined && state.list[i][0] != "") {
            arr.created = state.list[i].map(item => {
              if (_.isDate(item)) {
                return item = item.getTime() / 1000
              } else {
                return item
              }
            })
          }
        } else if (state.list[i] !== "" && state.list[i] != 0) {

          arr[i] = state.list[i]
        }
      }
      return JSON.stringify(arr);
    }
  },
  actions: {
    list({
      state,
      commit,
      getters
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.ordersList,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    show({
      state,
      commit,
      getters
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.ordersShow,
          data: sendDate || state.id,
          success: data => {
            resolve(data)
          },
          error: data => {

          }
        });
      })
    },
    dispose({
      state
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.ordersDispose,
          data: state.dispose,
          success: data => {
            // state.commit('setState', [])
            state.dispose = {
              id: "",
              state: "",
              description: ""
            }
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
export {
  ordersLog
}
export default orders
