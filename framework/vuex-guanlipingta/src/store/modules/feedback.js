const feedback = {
  namespaced: true,
  state: {
    type: {
      1: "司机",
      2: "厂商"
    },
    state: {
      0: "待处理",
      1: "处理中",
      9: "已完成"
    },
    list: {
      "created": ["", ""],
      "type": "",
      "state": "",
    },
    pager: {
      "count": 10,
      "page": 1,
      "total": 1,
      "res": []
    },
    dispose: {
      "id": 0,
      "state": "0",
      "remark": ""
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
    list(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.feedbackList,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    dispose(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.feedbackDispose,
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
export default feedback
