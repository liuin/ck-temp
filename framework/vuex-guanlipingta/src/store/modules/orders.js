const orders = {
  namespaced: true,
  state: {
    list: {
      "maker_mobile": "",
      "driver_mobile": "",
      "order_sn": "",
      "driver_name": "",
      "created": ["", ""],
      "order_state": ""
    },
    orderState: {
      0: "全部",
      1: "待接单",
      2: "待收货",
      3: "待送达",
      4: "待确认",
      9: "已完成",
      6: "已取消"
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
    }
  }
}

export default orders
