const uploadImg = {
  namespaced: true,
  state: {
    uploadImg: {
      folder: "upload",
      upload: "",
      img: "",
      fileList: []
    }    
  },
  getters: {},
  mutations: {
    fileList(state, fileList) {
      state.uploadImg.fileList = fileList
    }
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
    },
    upImg({
      state,
      commit,
      getters
    }, sendDate) {

      return new Promise((resolve, reject) => {
       
        if (state.uploadImg.fileList.length > 0 && (state.uploadImg.fileList[0].raw != undefined)) {          
          var reader = new FileReader();
          reader.readAsDataURL(state.uploadImg.fileList[0].raw);
          reader.onload = (e) => {
            var base64 = e.target.result;
            state.uploadImg.img = base64;
            api.ajax({
              type: "post",
              url: api.url.uploadImg,
              data: state.uploadImg,
              success: data => {
                resolve(data)
              },
              error: data => {
                reject(data)
              }
            })
          }
        }else{           
            resolve()          
        }
      })
    }

  }
}
export default uploadImg
