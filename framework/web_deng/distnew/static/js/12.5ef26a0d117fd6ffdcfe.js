webpackJsonp([12],{"8yqb":function(t,e){},S4Ph:function(t,e,l){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=l("4YfN"),n=l.n(a),o=l("9rMa"),s={name:"",data:function(){return{}},computed:n()({},Object(o.c)("cars",["list","state"])),created:function(){this.load()},methods:{changePage:function(t){this.load(t)},load:function(t){var e=this;if(t)var l={page:t,count:this.list.count};else l={page:this.list.page,count:this.list.count,total:1};this.$store.dispatch("cars/list",l).then(function(t){e.list.res=t.list,e.list.total=t.list_total?t.list_total:e.list.total})}},mounted:function(){}},i={render:function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"knowledgeCarType"},[l("div",{staticClass:"box"},[l("el-button",{staticClass:"btn-edit",attrs:{type:"primary",size:"medium",icon:"el-icon-edit"},on:{click:function(e){t.$router.push({path:"/knowledge/carTypeAdd"})}}},[t._v("添加车辆类型")]),t._v(" "),l("div",{staticClass:"line2"}),t._v(" "),l("el-table",{attrs:{data:t.list.res,border:""}},[l("el-table-column",{attrs:{prop:"order",label:"排序"}}),t._v(" "),l("el-table-column",{attrs:{prop:"title",label:"车辆类型名称"}}),t._v(" "),l("el-table-column",{attrs:{label:"车型图片"},scopedSlots:t._u([{key:"default",fn:function(t){return[l("img",{attrs:{src:t.row.icon,alt:""}})]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"total",label:"车型数量"}}),t._v(" "),l("el-table-column",{attrs:{label:"平均长宽高（米）"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(e.row.long)+"*"+t._s(e.row.with)+"*"+t._s(e.row.high)+"\n        ")]}}])}),t._v(" "),l("el-table-column",{attrs:{label:"平均载重(吨)"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t._.toFinite(e.row.load/1e3))+"\n        ")]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"",label:"状态"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n          "+t._s(t.state[e.row.state])+"\n        ")]}}])}),t._v(" "),l("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[l("el-button",{attrs:{size:"mini"},on:{click:function(l){t.$router.push({path:"/knowledge/carTypeEdit",query:{id:e.row.id}})}}},[t._v("编辑")])]}}])})],1),t._v(" "),t.list.total>0?l("pnation",{attrs:{size:t.list.count,total:t.list.total},on:{changePage:t.changePage}}):t._e()],1)])},staticRenderFns:[]};var r=l("Z0/y")(s,i,!1,function(t){l("8yqb")},"data-v-e3e3caf8",null);e.default=r.exports}});
//# sourceMappingURL=12.5ef26a0d117fd6ffdcfe.js.map