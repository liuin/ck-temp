const park = {
  namespaced: true,
  state: {
    create: {
      province: 12,
      city: 223,
      title: "",
      address: "",
      locations: "",
      introduction: "",
      desc: "noempty",
      state: "0"
    },
    state: {
      "0" : '不可用',
      "1" : '可用'
    },
    update: {
      id: "",
      province: 12,
      city: 223,
      title: "",
      address: "",
      locations: "",
      introduction: "",
      desc: "",
      state: ""
    },
    show: {
      id: 12,
      res: []
    },
    list: {
      page: 1,
      count: 10,
      total: 1,
      res: []
    },

    searchData:{
      province: "",
      city: "",
      title: "",
      state: ""
    }

  },
  getters: {
    region: state => {
      return [state.create.province, state.create.city]
    },
    regionUpdate: state => {
      return [state.update.province.toString(), state.update.city.toString()]
//      return ["2"]
    },
    conditions: state => {
      var arr = {};

       for (var i in state.searchData) {
        if (i == 'created') {
         
          if (state.searchData[i][0] != undefined && state.list[i][0] != "") {
            arr.created = state.searchData[i].map(item => {
             if (_.isDate(item)) {
                return item = item.getTime()/1000 
             }else {
               return item
             }
            })
          }    
        }else if(state.searchData[i] !== "") {
          arr[i] = state.searchData[i]
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
  mutations: {
    
  },
  actions:{
    create({state, commit},sendData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.parkCreate,
          data: sendData,
          success: data =>{            
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },
    update({state, commit},sendData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.parkUpdate,
          data: sendData,
          success: data =>{            
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    show({state, commit},sendData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.parkShow,
          data: sendData,
          success: data =>{            
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    list({state, commit},sendData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.parkList,
          data: sendData,
          success: data =>{            
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    }


  }
}

export default park
