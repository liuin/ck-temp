const message = {
  namespaced: true,
  state: {
    categoryCreate: {
      title: ""
    },
    categoryUpdate: {
      id: "",
      title: ""
    },
    categoryShow: {
      id: 0
    },
    categoryShowRes: {},

    categoryList: {
      page: 1,
      count: 10,
      total: 1
    },
    categoryListRes: [],

    templateCreate: {
      title: "",
      content: "",
      state: 1,
      cover_image: "",
      push_time: "",
      content: "",
      activity_start_time: "",
      activity_end_time: "",
      push_tags_type: "",
      push_tags_id: "",
      province: "",
      city: "",
      platform_id: ""
    },
    templateUpdate: {
      id: "",
      title: "",
      content: "",
      category_id: "",
      state: "",
      cover_image: "",
      push_time: "",
      activity_start_time: "",
      activity_end_time: "",
      push_tags_type: "",
      push_tags_id: 0,
      province: "",
      city: "",
      platform_id: ""
    },
    templateShow: {
      id: ""
    },
    templateShowRes: {},

    templateList: {
      state: "",
      page: 1,
      count: 10,
      total: 1
    },
    templateListRes: [

    ],
    templatePauseOrStart: {
      id: ""
    },
    activity_state: {
      1: '未开始',
      2: '活动中',
      3: '已结束',
      4: '已暂停'
    },
    push_tags_type: {
      0: "全部",
      1: "司机",
      2: "厂商"
    },
    state: {
      1: "草稿",
      2: "消息"
    },
    templateDestroyDraft: {
      id: 0
    }
  },
  getters: {

  },
  mutations: {},
  actions: {
    categoryCreate({
      state
    }, sendDate) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageCategoryCreate,
          data: state.categoryCreate,
          success: data => {
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    categoryUpdate({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageCategoryUpdate,
          data: state.categoryUpdate,
          success: data => {
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    categoryShow({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageCategoryShow,
          data: state.categoryShow,
          success: data => {
            state.categoryShowRes = data.message_category
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    categoryList({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageCategoryList,
          data: state.categoryList,
          success: data => {
            state.categoryListRes = data.list
            state.categoryList.total = data.list_total
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    templateCreate({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageTemplateCreate,
          data: state.templateCreate,
          success: data => {
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    templateUpdate({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageTemplateUpdate,
          data: state.templateUpdate,
          success: data => {
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    templateShow({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.messageTemplateShow,
          data: state.templateShow,
          success: data => {
            state.templateShowRes = data.message_template;
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    templateList({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageTemplateList,
          data: state.templateList,
          success: data => {
            state.templateListRes = data.list;
            state.templateList.total = data.list_total;
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    templatePauseOrStart({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageTemplatePauseOrStart,
          data: state.templatePauseOrStart,
          success: data => {
            resolve(data)
          },
          error: data => {
            reject(data)
          }
        });
      })
    },
    templateDestroyDraft({
      state
    }) {
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "post",
          url: api.url.messageTemplateDestroyDraft,
          data: state.templateDestroyDraft,
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
export default message
