const feedback = {
  namespaced: true,
  state: {
    type: {
      "1": "司机",
      "2": "厂商"
    },
    state: {
      "0": "待处理",
      "1": "处理中",
      "9": "已完成"
    },
    list: {
      "created": ["", ""],
      "type": "1",
      "state": ""
    },
    pager: {
      "count": 10,
      "page": 1,
      "total": 1,
      "res": []
    },
    show: {
      id: 0,
      type: "1",
      res: []
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
        } else if (state.list[i] !== "" && (i != 'type')) {
          arr[i] = state.list[i]
        }
      }
      return JSON.stringify(arr);
    },
    imgs: ({show}) => {   
      if(show.res.imgs){
        return show.res.imgs.split(",")
      }
    }
  },
  mutations: {

  },
  actions: {
    list({
      state
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.feedbackList + '?type=' + state.list.type,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    dispose({state}, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.feedbackDispose,
          data: state.dispose,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    show({
      state
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.feedbackShow + '?type=' + state.show.type,
          data: {"id": state.show.id},
          success: data => {
            state.show.res = data.feedback
            state.show.res.state = _.toString(state.show.res.state)
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
export default feedback
