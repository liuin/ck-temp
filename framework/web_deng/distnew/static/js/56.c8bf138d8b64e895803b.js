webpackJsonp([56],{AqKR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var l=a("4YfN"),s=a.n(l),n=a("9rMa"),r={name:"",data:function(){return{}},computed:s()({},Object(n.c)("feedback",["list","type","pager","state"]),Object(n.b)("feedback",["conditions"])),created:function(){this.seach()},methods:{changePage:function(t){this.pager.page=t,this.seach(t)},handleClickTab:function(t,e){this.list.type=t.name,this.pager.page=1,this.pager.total=0,this.seach()},seach:function(t){var e=this,a={conditions:this.conditions,page:this.pager.page,count:this.pager.count,total:1};this.$store.dispatch("feedback/list",a).then(function(t){e.pager.total=t.list_total||e.pager.total,e.pager.res=t.list})}},mounted:function(){}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"system-account"},[a("div",{staticClass:"box"},[a("el-form",{attrs:{"label-width":"80px"}},[a("el-row",{attrs:{gutter:10}},[a("el-col",{attrs:{span:8}},[a("el-form-item",{attrs:{label:"状态"}},[a("el-select",{attrs:{clearable:""},model:{value:t.list.state,callback:function(e){t.$set(t.list,"state",e)},expression:"list.state"}},t._l(t.state,function(t,e){return a("el-option",{key:t,attrs:{value:e,label:t}})}))],1)],1)],1),t._v(" "),a("el-row",[a("el-col",{attrs:{span:12}},[a("el-form-item",{attrs:{label:"反馈时间"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.list.created,callback:function(e){t.$set(t.list,"created",e)},expression:"list.created"}})],1)],1)],1),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{staticClass:"btn-save",attrs:{icon:"el-icon-search",type:"primary"},on:{click:t.seach}},[t._v("搜　索")])],1)],1),t._v(" "),a("div",{staticClass:"line2"}),t._v(" "),a("el-tabs",{attrs:{value:t.list.type},on:{"tab-click":t.handleClickTab}},t._l(t.type,function(t,e){return a("el-tab-pane",{key:t,attrs:{label:t,name:e}})})),t._v(" "),a("el-table",{attrs:{border:"",data:t.pager.res}},[a("el-table-column",{attrs:{prop:"create_user",label:"反馈人"}}),t._v(" "),a("el-table-column",{attrs:{label:"反馈来源"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.type[e.row.type])+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"content",label:"反馈内容"}}),t._v(" "),a("el-table-column",{attrs:{label:"反馈时间"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.api.toTime(e.row.created))+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.state[e.row.state])+"\n        ")]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("router-link",{attrs:{to:{path:"/feedback/listDetail",query:{id:e.row.id,type:t.list.type}}}},[t._v("查看详情")])]}}])})],1),t._v(" "),0!=t.pager.total?a("pnation",{attrs:{total:t.pager.total,currentPage:t.pager.page,size:t.pager.count},on:{changePage:t.changePage}}):t._e()],1)])},staticRenderFns:[]};var c=a("Z0/y")(r,o,!1,function(t){a("GGUQ")},"data-v-0cc43a8a",null);e.default=c.exports},GGUQ:function(t,e){}});
//# sourceMappingURL=56.c8bf138d8b64e895803b.js.map