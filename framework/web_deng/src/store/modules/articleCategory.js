const articleCategory = {
  namespaced: true,
  state: {
    create: {
      title: ""
    },
    update: {
      id: "",
      title: ""
    },
    show: {
      id: 0
    },
    list: {
      page: 1,
      count: 10,
      total: 1,
      res: []
    },
    articleCreate: {
      title: "",
      category_id: "",
      content: "",
      state: ""
    },
    articleUpdate: {
      id: "",
      title: "",
      category_id: "",
      content: "",
      state: ""
    },
    articleShow: {
      id: ""
    },
    articleList: {
      state: 1,
      category_id: "",
      title: "",
      author: "",
      page: "",
      count: "",
      total: ""
    },
    articlePage: {
      page: 1,
      count: 10,
      total: 1,
      res: []
    },
    articleState: {
      1: '草稿',
      2: '发布'
    }
  },
  getters: {
    conditions: state => {
      var arr = {};
      for (var i in state.articleList) {
        if (i == 'created') {
          if (state.articleList[i][0] != undefined && state.articleList[i][0] != "") {
            arr.created = state.articleList[i].map(item => {
              if (_.isDate(item)) {
                return item = item.getTime() / 1000
              } else {
                return item
              }
            })
          }
        } else if (state.articleList[i] !== "") {
          arr[i] = state.articleList[i]
        }
      }
      return JSON.stringify(arr);
    }
  },
  mutations: {

  },
  actions: {
    create(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.articleCategoryCreate,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },
    update(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.articleCategoryUpdate,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },

    show(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.articleCategoryShow,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },

    list(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.articleCategoryList,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },

    articleCreate(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.articleCreate,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },

    articleUpdate(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.articleUpdate,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },

    articleShow(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.articleShow,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },

    articleList(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.articleList,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    },

    articleDestroy(state, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.articleDestroy,
          data: sendDate,
          success: data => {
            resolve(data);
          },
          error: data => {

          }
        });
      })
    }
  }
}

export default articleCategory
