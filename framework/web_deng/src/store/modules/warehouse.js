const warehouse = {
  namespaced: true,
  state: {
    listByMaker: {
      maker_id: 0,
      res:[]
    }
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    listByMaker({state}) {      
      var sendDate = {
        maker_id: state.listByMaker.maker_id
      }

      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.warehouseListByMaker,
          data: sendDate,
          success: data => {
            state.listByMaker.res = data.warehouse_list
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
export default warehouse
