const leftMenu = {
  namespaced: true,
  state: {
    menuData: [],
    loading: false,
    routerIn: false,
    defaultActive: "/user/driverList"
  },
  getters: {

  },
  mutations: {

  },
  actions: {
    loadLeftMenu({
      dispatch,
      commit,
      state,
      rootState
    }) {
      var commit1 = commit;
      //commit("setState", [{loading: true}, state], {root: true});
      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.leftMenu,
          success: data => {

            //              console.log(data);
            //            var articleListAdd = {              	 
            //              "id": 1,
            //              "title": "文章编辑",
            //              "action": "article/listAdd",
            //              "icon": "",
            //              "active": true,
            //              "sub": []
            //            }

            //            console.log(data);


            // var dataList = [
            //   {
            //     "id": 1,
            //     "title": "用户管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "司机列表",
            //         "action": "user/driverList",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "司机详情",
            //             "action": "user/driverListDetail",
            //             "query": "&id"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "厂商列表",
            //         "action": "user/neederList",
            //         "icon": "",
            //         "active": true,
            //         "sub": [{
            //           "title": "厂商详情",
            //           "action": "user/neederListDetail"
            //         }]
            //       },
            //       {
            //         "id": 1,
            //         "title": "司机标签",
            //         "action": "user/driverLable",
            //         "icon": "",
            //         "active": true
            //       },
            //       {
            //         "id": 1,
            //         "title": "厂商标签",
            //         "action": "user/neederLable",
            //         "icon": "",
            //         "active": true
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "订单管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "订单列表",
            //         "action": "order/list",
            //         "icon": "",
            //         "active": true,
            //         "sub": [{
            //           "title": "订单详情",
            //           "action": "order/ListDetail"
            //         }]
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "消息管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "消息列表",
            //         "action": "message/list",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "新建消息",
            //             "action": "message/listAdd"
            //           },
            //           {
            //             "title": "消息详情",
            //             "action": "message/listDetail",
            //             "query": "&id"
            //           },
            //           {
            //             "title": "编辑消息",
            //             "action": "message/listAdd",
            //             "query": "&edit"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "草稿箱",
            //         "action": "message/drafts",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "编辑消息",
            //             "action": "message/draftsEdit"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "分类管理",
            //         "action": "message/cate",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "编辑消息",
            //             "action": "message/draftsEdit"
            //           }
            //         ]
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "评价管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "评价列表",
            //         "action": "appraise/list",
            //         "icon": "",
            //         "active": true
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "财务管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "司机提现",
            //         "action": "money/draw",
            //         "icon": "",
            //         "active": true
            //       },

            //       {
            //         "id": 1,
            //         "title": "厂商充值",
            //         "action": "money/recharge",
            //         "icon": "",
            //         "active": true
            //       },
            //       {
            //         "id": 1,
            //         "title": "厂商消费",
            //         "action": "money/consume",
            //         "icon": "",
            //         "active": true
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "反馈管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "反馈列表",
            //         "action": "feedback/list",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "反馈详情",
            //             "action": "feedback/listDetail"
            //           }
            //         ]

            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "活动管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "充值奖励管理",
            //         "action": "activity/recharge",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "添加活动",
            //             "action": "activity/rechargeAdd"
            //           },
            //           {
            //             "title": "编辑活动",
            //             "action": "activity/rechargeAdd",
            //             "query": "&edit"
            //           },
            //           {
            //             "title": "活动详情",
            //             "action": "activity/rechargeDetail",
            //             "query": "&id"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "邀请奖励管理",
            //         "action": "activity/invite",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "添加活动",
            //             "action": "activity/inviteAdd"
            //           },
            //           {
            //             "title": "编辑活动",
            //             "action": "activity/inviteAdd",
            //             "query": "&edit"
            //           },
            //           {
            //             "title": "活动详情",
            //             "action": "activity/inviteDetail",
            //             "query": "&id"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "成单奖励管理",
            //         "action": "activity/complete",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "添加活动",
            //             "action": "activity/completeAdd"
            //           },
            //           {
            //             "title": "编辑活动",
            //             "action": "activity/completeAdd",
            //             "query": "&edit"
            //           },
            //           {
            //             "title": "活动详情",
            //             "action": "activity/completeDetail",
            //             "query": "&id"
            //           }
            //         ]
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "运营管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "司机运营管理",
            //         "action": "operate/driver",
            //         "icon": "",
            //         "active": true
            //       },
            //       {
            //         "id": 1,
            //         "title": "厂商运营管理",
            //         "action": "operate/needer",
            //         "icon": "",
            //         "active": true
            //       },
            //       {
            //         "id": 1,
            //         "title": "车辆使用价格设置",
            //         "action": "operate/price",
            //         "icon": "",
            //         "active": true
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "服务平台管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "服务平台列表",
            //         "action": "server",
            //         "icon": "",
            //         "active": true
            //       }
            //     ]
            //   },

            //   {
            //     "id": 1,
            //     "title": "文章管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "文章列表",
            //         "action": "article/list",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "文章添加",
            //             "action": "article/listAdd"
            //           },
            //           {
            //             "title": "文章编辑",
            //             "action": "article/listEidt"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "草稿箱",
            //         "action": "article/drafts",
            //         "icon": "",
            //         "active": true
            //       },
            //       {
            //         "id": 1,
            //         "title": "分类管理",
            //         "action": "article/cate",
            //         "icon": "",
            //         "active": true
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "知识库管理",
            //     "icon": "el-icon-menu",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "物流园列表",
            //         "action": "knowledge/logisticsList",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "添加物流园",
            //             "action": "knowledge/logisticsListAdd"
            //           },
            //           {
            //             "title": "编辑物流园",
            //             "action": "knowledge/logisticsListEdit"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "车辆类型管理",
            //         "action": "knowledge/carType",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "添加车辆类型",
            //             "action": "knowledge/carTypeAdd"
            //           },
            //           {
            //             "title": "编辑车辆类型",
            //             "action": "knowledge/carTypeEdit"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "订单取消原因",
            //         "action": "knowledge/cancel",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "查看详情",
            //             "action": "knowledge/cancelDetail"
            //           }
            //         ]
            //       }
            //     ]
            //   },
            //   {
            //     "id": 1,
            //     "title": "系统管理",
            //     "icon": "el-icon-setting",
            //     "sub": [
            //       {
            //         "id": 1,
            //         "title": "账号管理",
            //         "action": "system/account",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "添加账号",
            //             "action": "system/accountAdd"
            //           },
            //           {
            //             "title": "修改",
            //             "action": "system/accountEdit"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "title": "角色管理",
            //         "action": "system/role",
            //         "icon": "",
            //         "active": true,
            //         "sub": [
            //           {
            //             "title": "添加角色",
            //             "action": "system/roleAdd"
            //           },
            //           {
            //             "title": "编辑角色",
            //             "action": "system/roleEdit"
            //           }
            //         ]
            //       },
            //       {
            //         "id": 1,
            //         "active": false,
            //         "title": "个人中心",
            //         "action": "person",
            //         "sub": [
            //           {
            //             "title": "修改密码",
            //             "action": "person/pwd",
            //             "query": "&id"
            //           }
            //         ]
            //       }

            //     ]
            //   }

            // ]

            function bIndex(item, indexParen) {
              item.map((itemSub, index) => {
                var subIndex = indexParen.slice(0);
                subIndex.push(index);
                itemSub.subIndex = subIndex
                if ((itemSub.sub) && (itemSub.sub.length > 0)) {
                  bIndex(itemSub.sub, itemSub.subIndex)
                }
              })
            }


            var dataList = data.list


            dataList.map((item, index) => {
              item.action = ""
              item.subIndex = [index];
              var subIndex = [index];
              if ((item.sub) && (item.sub.length > 0)) {
                bIndex(item.sub, item.subIndex)
              }
            })

            commit("setState", [{
              menuData: dataList
            }, state], {
              root: true
            });
            //            resolve(data.list);
          }
        });
      })
    },
    //更新菜单
    uploadLeftMenu() {
      var leftMenu = {
        "msg": "sidebar的菜单",
        "status": 200,
        "errcode": 0,
        "result": {
          "sysMenus": [{
              "id": 1,
              "title": "用户管理",
              "icon": "el-icon-menu",
              "sub": [{
                  "id": 1,
                  "title": "司机列表",
                  "action": "user/driverList",
                  "icon": "",
                  "active": true,
                  "sub": [{
                    "title": "司机详情",
                    "action": "user/driverListDetail",
                    "query": "&id"
                  }]
                },
                {
                  "id": 1,
                  "title": "厂商列表",
                  "action": "user/neederList",
                  "icon": "",
                  "active": true,
                  "sub": [{
                    "title": "厂商详情",
                    "action": "user/neederListDetail"
                  }]
                },
                {
                  "id": 1,
                  "title": "司机标签",
                  "action": "user/driverLable",
                  "icon": "",
                  "active": true
                },
                {
                  "id": 1,
                  "title": "厂商标签",
                  "action": "user/neederLable",
                  "icon": "",
                  "active": true
                }
              ]
            },
            {
              "id": 1,
              "title": "订单管理",
              "icon": "el-icon-menu",
              "sub": [{
                "id": 1,
                "title": "订单列表",
                "action": "order/list",
                "icon": "",
                "active": true,
                "sub": [{
                  "title": "订单详情",
                  "action": "order/ListDetail"
                }]
              }]
            },
            {
              "id": 1,
              "title": "消息管理",
              "icon": "el-icon-menu",
              "sub": [{
                  "id": 1,
                  "title": "消息列表",
                  "action": "message/list",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "新建消息",
                      "action": "message/listAdd"
                    },
                    {
                      "title": "消息详情",
                      "action": "message/listDetail",
                      "query": "&id"
                    },
                    {
                      "title": "编辑消息",
                      "action": "message/listEdit"
                    }
                  ]
                },
                {
                  "id": 1,
                  "title": "草稿箱",
                  "action": "message/drafts",
                  "icon": "",
                  "active": true,
                  "sub": [{
                    "title": "编辑消息",
                    "action": "message/draftsEdit"
                  }]
                },
                {
                  "id": 1,
                  "title": "分类管理",
                  "action": "message/cate",
                  "icon": "",
                  "active": true,
                  "sub": [{
                    "title": "编辑消息",
                    "action": "message/draftsEdit"
                  }]
                }
              ]
            },
            {
              "id": 1,
              "title": "评价管理",
              "icon": "el-icon-menu",
              "sub": [{
                "id": 1,
                "title": "评价列表",
                "action": "appraise/list",
                "icon": "",
                "active": true
              }]
            },
            {
              "id": 1,
              "title": "财务管理",
              "icon": "el-icon-menu",
              "sub": [{
                  "id": 1,
                  "title": "司机提现",
                  "action": "money/draw",
                  "icon": "",
                  "active": true
                },

                {
                  "id": 1,
                  "title": "厂商充值",
                  "action": "money/recharge",
                  "icon": "",
                  "active": true
                },
                {
                  "id": 1,
                  "title": "厂商消费",
                  "action": "money/consume",
                  "icon": "",
                  "active": true
                }
              ]
            },
            {
              "id": 1,
              "title": "反馈管理",
              "icon": "el-icon-menu",
              "sub": [{
                "id": 1,
                "title": "反馈列表",
                "action": "feedback/list",
                "icon": "",
                "active": true,
                "sub": [{
                  "title": "反馈详情",
                  "action": "feedback/listDetail"
                }]

              }]
            },
            {
              "id": 1,
              "title": "活动管理",
              "icon": "el-icon-menu",
              "sub": [{
                  "id": 1,
                  "title": "充值奖励管理",
                  "action": "activity/recharge",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "添加活动",
                      "action": "activity/rechargeAdd"
                    },
                    {
                      "title": "编辑活动",
                      "action": "activity/rechargeEdit"
                    },
                    {
                      "title": "活动详情",
                      "action": "activity/rechargeDetail",
                      "query": "&id"
                    }
                  ]
                },
                {
                  "id": 1,
                  "title": "邀请奖励管理",
                  "action": "activity/invite",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "添加活动",
                      "action": "activity/inviteAdd"
                    },
                    {
                      "title": "编辑活动",
                      "action": "activity/inviteEdit"
                    },
                    {
                      "title": "活动详情",
                      "action": "activity/inviteDetail",
                      "query": "&id"
                    }
                  ]
                },
                {
                  "id": 1,
                  "title": "成单奖励管理",
                  "action": "activity/complete",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "添加活动",
                      "action": "activity/completeAdd"
                    },
                    {
                      "title": "编辑活动",
                      "action": "activity/completeEdit"
                    },
                    {
                      "title": "活动详情",
                      "action": "activity/completeDetail",
                      "query": "&id"
                    }
                  ]
                }
              ]
            },
            {
              "id": 1,
              "title": "运营管理",
              "icon": "el-icon-menu",
              "sub": [{
                  "id": 1,
                  "title": "司机运营管理",
                  "action": "operate/driver",
                  "icon": "",
                  "active": true
                },
                {
                  "id": 1,
                  "title": "厂商运营管理",
                  "action": "operate/needer",
                  "icon": "",
                  "active": true
                },
                {
                  "id": 1,
                  "title": "车辆使用价格设置",
                  "action": "operate/price",
                  "icon": "",
                  "active": true
                }
              ]
            },
            {
              "id": 1,
              "title": "服务平台管理",
              "icon": "el-icon-menu",
              "sub": [{
                "id": 1,
                "title": "服务平台列表",
                "action": "server",
                "icon": "",
                "active": true,
                "sub": [{
                    "title": "新增合作平台",
                    "action": "server/add"
                  },
                  {
                    "title": "编辑平台",
                    "action": "server/edit"
                  },
                  {
                    "title": "详情",
                    "action": "server/detail"
                  }
                ]
              }]
            },

            {
              "id": 1,
              "title": "文章管理",
              "icon": "el-icon-menu",
              "sub": [{
                  "id": 1,
                  "title": "文章列表",
                  "action": "article/list",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "文章添加",
                      "action": "article/listAdd"
                    },
                    {
                      "title": "文章编辑",
                      "action": "article/listEdit"
                    }
                  ]
                },
                {
                  "id": 1,
                  "title": "草稿箱",
                  "action": "article/drafts",
                  "icon": "",
                  "active": true
                },
                {
                  "id": 1,
                  "title": "分类管理",
                  "action": "article/cate",
                  "icon": "",
                  "active": true
                }
              ]
            },
            {
              "id": 1,
              "title": "知识库管理",
              "icon": "el-icon-menu",
              "sub": [{
                  "id": 1,
                  "title": "物流园列表",
                  "action": "knowledge/logisticsList",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "添加物流园",
                      "action": "knowledge/logisticsListAdd"
                    },
                    {
                      "title": "编辑物流园",
                      "action": "knowledge/logisticsListEdit"
                    }
                  ]
                },
                {
                  "id": 1,
                  "title": "车辆类型管理",
                  "action": "knowledge/carType",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "添加车辆类型",
                      "action": "knowledge/carTypeAdd"
                    },
                    {
                      "title": "编辑车辆类型",
                      "action": "knowledge/carTypeEdit"
                    }
                  ]
                },
                {
                  "id": 1,
                  "title": "订单取消原因",
                  "action": "knowledge/cancel",
                  "icon": "",
                  "active": true,
                  "sub": [{
                    "title": "查看详情",
                    "action": "knowledge/cancelDetail"
                  }]
                }
              ]
            },
            {
              "id": 1,
              "title": "系统管理",
              "icon": "el-icon-setting",
              "sub": [{
                  "id": 1,
                  "title": "账号管理",
                  "action": "system/account",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "添加账号",
                      "action": "system/accountAdd"
                    },
                    {
                      "title": "修改账号",
                      "action": "system/accountEdit",
                      "query": "&id"
                    }
                  ]
                },
                {
                  "id": 1,
                  "title": "角色管理",
                  "action": "system/role",
                  "icon": "",
                  "active": true,
                  "sub": [{
                      "title": "添加角色",
                      "action": "system/roleAdd"
                    },
                    {
                      "title": "编辑角色",
                      "action": "system/roleEdit",
                      "query": "&edit"
                    }
                  ]
                },
                {
                  "id": 1,
                  "active": false,
                  "title": "个人中心",
                  "action": "person",
                  "sub": [{
                    "title": "修改密码",
                    "action": "person/pwd",
                    "query": "&id"
                  }]
                }

              ]
            }

          ]
        }
      }

      leftMenu = JSON.stringify(leftMenu);

      api.ajax({
        type: "post",
        url: api.url.uploadLeftMenu,
        data: {
          menu_json: leftMenu
        },
        success: data => {
          console.log(data);
        }
      })
    },

    listInAccess({
      state,
      commit
    }) {

      return new Promise((resolve, reject) => {
        api.ajax({
          type: "get",
          url: api.url.sysMenuListInAccess,
          data: state.update,
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

export default leftMenu
