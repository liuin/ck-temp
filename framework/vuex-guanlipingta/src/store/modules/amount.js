// import api from "../../assets/js/api.js"

const amountState = {
  name: '',
  data() {
    return {
      amountState: {
        1: "待处理",
        8: "处理失败",
        9: "已处理"
      }
    }
  }
}

const driveramountDrawList = {
  data: function () {
    return {
      driveramountDrawList: {
        driver_mobile: "",
        state: "",
        created: ""
      },
      driveramountDrawListTime: [],
      driveramountDrawListPage: {
        page: 1,
        count: 10,
        total: 0
      },
      driveramountDrawListRes: []
    }
  },
  watch: {
    driveramountDrawListTime(newVal) {
      if (newVal && newVal.length > 0) {
        this.driveramountDrawList.created = [newVal[0].getTime() / 1000, newVal[1].getTime() / 1000]
      } else {
        this.driveramountDrawList.created = "";
      }
      return newVal
    }
  },
  methods: {
    driveramountDrawListCall() {
      return new Promise((resolve, reject) => {
        var sendData = {
          page: this.driveramountDrawListPage.page,
          count: this.driveramountDrawListPage.count,
          conditions: JSON.stringify(api.removeEmpty(this.driveramountDrawList))
        }

        api.ajax({
          type: "post",
          url: api.url.driveramountDrawList,
          data: sendData,
          success: data => {
            this.driveramountDrawListRes = data.list
            this.driveramountDrawListPage.total = data.list_total
            resolve(data);
          },
          error: data => {
            // reject(456);
          }
        });
      })
    }
  }
}


const makeramountRechargeList = {
  data: function () {
    return {
      makeramountRechargeList: {
        maker_mobile: "",
        created: ""
      },
      makeramountRechargeListTime: [],
      makeramountRechargeListPage: {
        page: 1,
        count: 10,
        total: 0
      },
      makeramountRechargeListRes: []
    }
  },
  watch: {
    makeramountRechargeListTime(newVal) {
      if (newVal && newVal.length > 0) {
        this.makeramountRechargeList.created = [newVal[0].getTime() / 1000, newVal[1].getTime() / 1000]
      } else {
        this.makeramountRechargeList.created = "";
      }
      return newVal
    }
  },
  methods: {
    makeramountRechargeListCall() {
      return new Promise((resolve, reject) => {
        var sendData = {
          page: this.makeramountRechargeListPage.page,
          count: this.makeramountRechargeListPage.count,
          conditions: JSON.stringify(api.removeEmpty(this.makeramountRechargeList))
        }

        api.ajax({
          type: "post",
          url: api.url.makeramountRechargeList,
          data: sendData,
          success: data => {
            this.makeramountRechargeListRes = data.list
            this.makeramountRechargeListPage.total = data.list_total
            resolve(data);
          },
          error: data => {
            // reject(456);
          }
        });
      })
    }
  }
}

const makeramountPayList = {
  data: function () {
    return {
      makeramountPayList: {
        maker_mobile: "",
        driver_mobile: "",
        order_state: "",
        created: ""
      },
      makeramountPayListTime: [],
      makeramountPayListPage: {
        page: 1,
        count: 10,
        total: 1
      },
      makeramountPayListRes: []
    }
  },
  watch: {
    makeramountPayListTime(newVal) {
      if (newVal == null) {
        this.makeramountPayList.created = ""
      } else if (newVal.length > 0) {
        this.makeramountPayList.created = [newVal[0].getTime() / 1000, newVal[1].getTime() / 1000]
      }
      return newVal
    }
  },
  methods: {
    makeramountPayListCall() {
      return new Promise((resolve, reject) => {
        var sendData = {
          page: this.makeramountPayListPage.page,
          count: this.makeramountPayListPage.count,
          total: this.makeramountPayListPage.total,
          conditions: JSON.stringify(api.removeEmpty(this.makeramountPayList))
        }


        api.ajax({
          type: "post",
          url: api.url.makeramountPayList,
          data: sendData,
          success: data => {
            this.makeramountPayListRes = data.list
            this.makeramountPayListPage.total = data.list_total
            resolve(data);
          },
          error: data => {
            // reject(456);
          }
        });
      })
    }
  }
}


const amount = {
  namespaced: true,
  state: {},
  getters: {

  },
  mutations: {

  },
  actions: {}
}
export default amount

export {
  driveramountDrawList,
  amountState,
  makeramountPayList,
  makeramountRechargeList
}
