const uploadImg = {
  namespaced: true,
  state: {
    uploadImg: {
      folder: "upload",
      upload: ""
    }
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    uploadImg({
      state,
      commit,
      getters
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.uploadImg,
          data: sendDate,
          success: data => {
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
export default uploadImg
