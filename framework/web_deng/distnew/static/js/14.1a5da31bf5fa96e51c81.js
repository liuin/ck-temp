webpackJsonp([14],{"7RFN":function(t,e){},"L+wY":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("4YfN"),l=s.n(a),n=s("9rMa"),i={name:"server",data:function(){return{}},computed:l()({},Object(n.c)("platform",["list","state"])),created:function(){var t=this;this.$store.dispatch("platform/list",this.list).then(function(e){t.list.res=e.list,t.list.total=e.list_total})},methods:{changePage:function(t){var e=this,s={page:t,count:this.list.count};this.$store.dispatch("platform/list",s).then(function(t){e.list.res=t.list})}},mounted:function(){}},r={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"message-list"},[s("div",{staticClass:"box"},[s("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(e){t.$router.push("/server/add")}}},[t._v("新增合作平台")]),t._v(" "),s("div",{staticClass:"line2"}),t._v(" "),s("el-table",{attrs:{data:t.list.res,border:""}},[s("el-table-column",{attrs:{prop:"id",label:"ID"}}),t._v(" "),s("el-table-column",{attrs:{prop:"title",label:"平台名称"}}),t._v(" "),s("el-table-column",{attrs:{prop:"company",label:"平台所属公司"}}),t._v(" "),s("el-table-column",{attrs:{label:"合作状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",{class:"state-"+e.row.state},[t._v(t._s(t.state[e.row.state]))])]}}])}),t._v(" "),s("el-table-column",{attrs:{label:"创建时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("span",[t._v(t._s(t.api.toTime(e.row.created)))])]}}])}),t._v(" "),s("el-table-column",{attrs:{prop:"",label:"操作",width:"250"},scopedSlots:t._u([{key:"default",fn:function(e){return[s("el-button",{attrs:{size:"mini"},on:{click:function(s){t.$router.push({path:"/server/edit",query:{id:e.row.id}})}}},[t._v("编辑")]),t._v(" "),s("el-button",{attrs:{size:"mini"},on:{click:function(s){t.$router.push({path:"/server/detail",query:{id:e.row.id}})}}},[t._v("详情")])]}}])})],1),t._v(" "),0!=t.list.total?s("pnation",{attrs:{total:t.list.total,size:t.list.count},on:{changePage:t.changePage}}):t._e()],1)])},staticRenderFns:[]};var o=s("Z0/y")(i,r,!1,function(t){s("7RFN")},"data-v-b97dc6d4",null);e.default=o.exports}});
//# sourceMappingURL=14.1a5da31bf5fa96e51c81.js.map