//角色管理
const adminGroup = {
  namespaced: true,
  state: {
    create:{
      title: "",
      state: 1,
      authority: "2,5,6"
    },
    update:{
      id: 1,
      title:"",
      state: 1,
      authority: "2,5,6"
    },
    list:{
      page: 1,
      count: 15,
      totle: 0,
      res:[]
    },
    show:{
      id: 0
    }

  },
  mutations: {   //唯一修改状态的state方法 ，只能同步，不能异步

  },
  getters: {  //类似计算属性方法

  },

  actions: {   //可以异步操作
//    setToken({commit},tk){
//      sessionStorage.setItem('token',tk);
//      commit('changeToken',tk);
//    },
    create(state,sendData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminGroupCreate,
          data: sendData,
          success: data =>{
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    update(state,rodeData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminGroupUpdate,
          data: rodeData,
          success: data =>{
//          commit('setState', [{'ajaxLoad': false}], {root: true})

            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    total({state, commit},rodeData){
     
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.adminGroupTotal,
          success: data =>{
            commit('setState', [{'list.totle': data.admin_group_total}, state], {root: true})
            
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    list({state, commit},rodeData){
        
//      commit('setState', [{'ajaxLoad': true}], {root: true})
      
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminGroupList,
          data: rodeData || state.list,
          success: data =>{            
//            commit('setState', [{'ajaxLoad': false}], {root: true})
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    show({state, commit},rodeData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.adminGroupShow,
          data: rodeData || state.show,
          success: data =>{
            commit('setState', [{'update': data.adminGroup}, state], {root: true})
            // commit('setState', [{'ajaxLoad': false}], {root: true})
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    

  }
}


export default adminGroup;

