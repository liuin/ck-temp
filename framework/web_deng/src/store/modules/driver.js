const driver = {
  namespaced: true,
  state:{
    list: {
      "driver_name":"",
      "plate_number":"",
      "mobile":"",
      "referee_mobile":"",
      "created":["",""],
      "state": ""
    },
    selectDate: {     
       0 : "待审核",
       1 : "审核中",
       2 : "审核失败",
       8 : "禁用",
       9 : "通过审核"  
    },
    show: {
      id: 1,
      res: {}
    },
    audit: {
      id: 1,
      state: 2
    },
    pager: {
      page: 1,
      count: 10,
      total: 0
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
                return item = item.getTime()/1000 
             }else {
               return item
             }
            })
          }    
        }else if(state.list[i] !== "") {
          arr[i] = state.list[i]
        }
       }     
//      arr.created = arr.created.map(item => {   
//         if (_.isDate(item)) {
//          return item = item.getTime()/1000 
//         }   
//      })      

      return JSON.stringify(arr);
    }
  },
  actions:{
    list ({state, commit, getters}, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.driverList,
          data: sendDate,
          success: data =>{
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },
    show ({state, commit, getters}, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.driverShow,
          data: sendDate || state.id,
          success: data =>{
            resolve(data)
          },
          error: data =>{
           
          }
        });                 
      })
    },
    audit ({state, commit, getters}, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.driverAudit,
          data: sendDate || state.audit,
          success: data =>{
            resolve(data)
          },
          error: data =>{
           
          }
        });                 
      })
    },
    total ({state, commit, getters}, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.driverTotal,
//          data: sendDate || state.id,
          success: data =>{
            resolve(data)
          },
          error: data =>{
           
          }
        });                 
      })
    }
  }
}

export default driver
