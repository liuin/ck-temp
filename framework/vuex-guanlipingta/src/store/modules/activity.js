const activityType = {
  data: function () {
    return {
      activityType: {
        1: "充值奖励",
        2: "邀请奖励",
        3: "成单奖励"
      }
    }
  }
}

const activityState = {
  data: function () {
    return {
      activityState: {
        1: "未开始",
        2: "活动中",
        3: "已结束",
        4: "已暂停"
      }
    }
  }
}


const activityCreate = {
  data: function () {
    return {
      activityCreate: {
        title: "",
        start_time: "",
        end_time: "",
        rules: ""
      },
      activityCreateType: "level",
      activityCreateRules: [{
        done: "",
        money: ""
      }],
      activityCreateRules2: [{
        done: "",
        money: ""
      }]
    }
  },

  computed: {
    activityCreateTime: {
      get: function (val) {
        return (this.activityCreate.start_time != "") ? [this.activityCreate.start_time * 1000, this.activityCreate.end_time * 1000] : "[]"
      },
      set: function (val) {
        this.activityCreate.start_time = val[0].getTime() / 1000
        this.activityCreate.end_time = val[1].getTime() / 1000
      }
    }
  },
  methods: {
    activityCreateCall(type) {
      if (this.activityCreateType == 'level' || this.activityCreateType == 'a_day') {
        var obj = {
          type: this.activityCreateType,
          rules: this.activityCreateRules
        }
        this.activityCreate.rules = JSON.stringify(obj)
      }
      if (this.activityCreateType == 'every') {
        var obj = {
          type: this.activityCreateType,
          rules: this.activityCreateRules2
        }
        this.activityCreate.rules = JSON.stringify(obj)
      }


      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.activityCreate + '?type=' + type,
          data: this.activityCreate,
          success: data => {
            resolve(data);
            this.$alert("添加成功", "", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$router.back();
              }
            });
          },
          error: data => {
            // reject(456);
          }
        });
      })
    }
  }
}

const activityUpdate = {
  data: function () {
    return {
      activityUpdate: {
        id: "",
        start_time: "",
        end_time: "",
        title: "",
        rules: {}
      },
      activityUpdateType: "level",
      activityUpdateRules: [{
        done: "",
        money: ""
      }],
      activityUpdateRules2: [{
        done: "",
        money: ""
      }]
    }
  },
  computed: {
    activityUpdateTime: {
      get: function (val) {
        return (this.activityUpdate.start_time != "") ? [this.activityUpdate.start_time * 1000, this.activityUpdate.end_time * 1000] : "[]"
      },
      set: function (val) {
        this.activityUpdate.start_time = val[0].getTime() / 1000
        this.activityUpdate.end_time = val[1].getTime() / 1000
      }
    }
  },
  methods: {
    activityUpdateCall(type) {
      if (this.activityUpdateType == 'level' || this.activityUpdateType == 'a_day') {
        var obj = {
          type: this.activityUpdateType,
          rules: this.activityUpdateRules
        }
        this.activityUpdate.rules = JSON.stringify(obj)
      }
      if (this.activityUpdateType == 'every') {
        var obj = {
          type: this.activityUpdateType,
          rules: this.activityUpdateRules2
        }
        this.activityUpdate.rules = JSON.stringify(obj)
      }

      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.activityUpdate + '?type=' + type,
          data: this.activityUpdate,
          success: data => {
            resolve(data);
            this.$alert("更新成功", "", {
              confirmButtonText: "确定",
              type: "success",
              callback: action => {
                this.$router.back();
              }
            });
          },
          error: data => {
            // reject(456);
          }
        });
      })
    }
  }
}

const activityShow = {
  data: function () {
    return {
      activityShow: {
        id: 0
      },
      activityType: 1,
      activityShowRes: {}
    }
  },
  methods: {
    activityShowCall(type) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.activityShow,
          data: this.activityShow,
          success: data => {
            this.activityShowRes = data.activity
            resolve(data);
          },
          error: data => {}
        });
      })
    }
  }
}


const activityList = {
  data: function () {
    return {
      activityList: {
        page: 1,
        count: 10,
        total: 1
      },
      activityListRes: []
    }
  },
  methods: {
    activityListCall(type) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.activityList + '?type=' + type,
          data: this.activityList,
          success: data => {
            this.activityListRes = data.list
            this.activityList.total = data.list_total
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

const activityPauseOrStart = {
  data: function () {
    return {
      activityPauseOrStart: {
        id: 0
      }
    }
  },
  methods: {
    activityPauseOrStartCall(type) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.activityPauseOrStart + '?type=' + type,
          data: this.activityPauseOrStart,
          success: data => {
            resolve(data);
          },
          error: data => {}
        });
      })
    }
  }
}




const activity = {
  namespaced: true,
  state: {},
  getters: {

  },
  mutations: {

  },
  actions: {}
}

export default activity

export {
  activityCreate,
  activityUpdate,
  activityShow,
  activityList,
  activityPauseOrStart,
  activityState,
  activityType
}
