webpackJsonp([11],{"1HX/":function(t,e){},O9XW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("4YfN"),i=a.n(n),l=a("9rMa"),s={name:"",data:function(){return{visible1:!0}},computed:i()({},Object(l.c)("admin",["list"])),created:function(){this.list.data=[{id:1,account:"admin",nickname:"超级管理员1",mobile:"15018402468",admin_group_title:"超级管理员",create_user:"超级管理员",created:1516345634,state:1},{id:1,account:"admin",nickname:"超级管理员2",mobile:"15018402468",admin_group_title:"超级管理员",create_user:"超级管理员",created:1516345634,state:1},{id:1,account:"admin",nickname:"超级管理员3",mobile:"15018402468",admin_group_title:"超级管理员",create_user:"超级管理员",created:1516345634,state:1},{id:1,account:"admin",nickname:"超级管理员4",mobile:"15018402468",admin_group_title:"超级管理员",create_user:"超级管理员",created:1516345634,state:1}],this.$store.dispatch("admin/total")},methods:{changePage:function(t){this.$store.commit("setState",[{"list.page":t},this.$store.state.admin]),this.$store.dispatch("admin/list")},addBtn:function(){this.$router.push("/system/accountAdd")},handleEdit:function(){console.log(arguments)},handleDelete:function(t){this.list.data.splice(t,1)}},mounted:function(){this.data=[{created:"2016-05-02",nickname:"王小虎"},{created:"2016-01-02",nickname:"王小虎2"}]}},c={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"sys"},[a("div",{staticClass:"box"},[a("el-button",{staticClass:"add-btn",attrs:{type:"primary",size:"medium"},on:{click:t.addBtn}},[t._v("添加账号")]),t._v(" "),a("div",{staticClass:"line2"}),t._v(" "),a("el-table",{attrs:{data:t.list.data,border:""}},[a("el-table-column",{attrs:{prop:"id",label:"账号ID"}}),t._v(" "),a("el-table-column",{attrs:{prop:"account",label:"用户名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"nickname",label:"姓名"}}),t._v(" "),a("el-table-column",{attrs:{prop:"mobile",label:"手机号"}}),t._v(" "),a("el-table-column",{attrs:{prop:"admin_group_title",label:"角色"}}),t._v(" "),a("el-table-column",{attrs:{prop:"create_user",label:"创建人"}}),t._v(" "),a("el-table-column",{attrs:{prop:"created",width:"180",sortable:"",label:"创建时间"}}),t._v(" "),a("el-table-column",{attrs:{prop:"state",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("span",{class:e.row.state?"":"waring"},[t._v(t._s(e.row.state?"可用":"禁用"))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",width:"180"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-button",{attrs:{size:"mini"},on:{click:function(a){t.$router.push({path:"/system/accountEdit",query:{id:e.row.id}})}}},[t._v("编辑")]),t._v(" "),a("delBtn",{on:{del:function(a){t.handleDelete(e.$index)}}})]}}])})],1),t._v(" "),a("pnation",{attrs:{total:t.list.data.length,size:t.list.count},on:{changePage:t.changePage}})],1)])},staticRenderFns:[]};var o=a("Z0/y")(s,c,!1,function(t){a("1HX/")},"data-v-e7b87b44",null);e.default=o.exports}});
//# sourceMappingURL=11.8f2f0c4b3c0fd7777897.js.map