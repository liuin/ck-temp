//账号管理
const admin = {
  namespaced: true,
  state: {
    create:{
      group_id: "",
      account: "",
      password: "",
      nickname: "",
      mobile: 0,
      state: 1,
      authority: "2,5,6"
    },
    update:{
      id: "",
      group_id: "",
      password: "",
      nickname: "",
      mobile: 0,
      state: 1,
      authority: "2,5,6"
    },
    updateBySelf:{
      id: "",
      nickname: "",
      mobile: ""
    },
    destroy:{
      id: ""
    },
    list:{
      page: 1,
      count: 20,
      total: 0,
      data:[]
    },
    show:{
      id: 0
    },
    changePwd:{
      id: parseInt(sessionStorage.getItem('aid')),
      old_password: "",
      new_password: "",
      re_new_password: ""
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
    create({state, commit},sendData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminCreate,
          data: sendData,
          success: data =>{
            let create = {group_id: "",account: "",password: "",nickname: "",mobile: 0,state: 1,authority: "2,5,6"}
            commit('setState', [{'create': create}, state], {root:true})
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    update({state, commit},rodeData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminUpdate,
          data: rodeData,
          success: data =>{
//          commit('setState', [{'ajaxLoad': false}], {root: true})
            let update = {id: "",group_id: "",password: "",nickname: "",mobile: 0,state: 1,authority: "2,5,6"}
            commit('setState', [{'update': update}, state], {root:true})
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
          url: api.url.adminTotal,
          success: data =>{ 
            commit('setState', [{'list.total': data.admin_total}, state], {root: true})
            resolve(data);
          },
          error: data =>{
          }
        });                 
      })
    },

    updateBySelf({state, commit},rodeData){
     
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminUpdateBySelf,
          data: rodeData || state.changePwd,
          success: data =>{            
            resolve(data);
          },
          error: data =>{           
          }
        });                 
      })
    },

    destroy({state, commit},rodeData){
     
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminDestroy,
          data: rodeData,
          success: data =>{            
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    list({state, commit}){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.adminList,
          data: {'page': state.list.page, 'count': state.list.count},
          success: data =>{
            data.list.map(item=>(
              item.created = api.toTime(item.created)
            ))

            
            commit('setState', [{'list.data': data.list}, state], {root: true})
           
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
          url: api.url.adminShow,
          data: rodeData || state.show.id,
          success: data =>{
            commit('setState', [{'update': data.admin}, state], {root: true})
           
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },

    changePwd({state, commit},rodeData){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminChangePwd,
          data: rodeData || state.changePwd,
          success: data =>{
            resolve(data);
          },
          error: data =>{
           
          }
        });                 
      })
    },


    logout({state}){
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.adminLogout,
          success: data =>{  
            resolve();
          },
          error: data =>{
           
          }
        });
      })
    }

    

  }
}


export default admin;

