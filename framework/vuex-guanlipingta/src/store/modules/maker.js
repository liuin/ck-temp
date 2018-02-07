const maker = {
  namespaced: true,
  state:{
    list: {
      "id":"",
      "mobile":"",
//      "mobile":"",
//      "referee_mobile":"",
      "created":["",""]
//      "state": ""
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
          url: api.url.makerList,
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
          url: api.url.makerShow,
          data: sendDate,
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

export default maker
