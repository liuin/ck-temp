webpackJsonp([29],{OePu:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=s("4YfN"),r=s.n(a),i=s("9rMa"),o={name:"",data:function(){return{}},computed:r()({},Object(i.c)("feedback",["type","state","show","dispose"]),Object(i.b)("feedback",["imgs"])),created:function(){this.show.id=this.$route.query.id,this.show.type=this.$route.query.type,this.$store.dispatch("feedback/show")},methods:{save:function(){var e=this;this.dispose.id=this.show.id,this.dispose.state=this.show.res.state,this.dispose.remark=this.show.res.remark,this.$store.dispatch("feedback/dispose").then(function(t){e.$alert("修改成功","",{confirmButtonText:"确定",type:"success",callback:function(t){e.$router.back()}})})}},mounted:function(){}},l={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"feedback-list-detail"},[s("div",{staticClass:"box"},[s("el-form",{staticClass:"form",attrs:{"label-position":"right","label-width":"80px"}},[s("el-row",[s("el-col",{attrs:{span:8}},[e._v("反馈人: "+e._s(e.show.res.create_user)+" ")]),e._v(" "),s("el-col",{attrs:{span:8}},[e._v("反馈来源: "+e._s(e.type[e.show.res.type])+" ")]),e._v(" "),s("el-col",{attrs:{span:8}},[e._v("反馈时间: "+e._s(e.api.toTime(e.show.res.created))+" ")])],1),e._v(" "),s("div",{staticClass:"line3"}),e._v(" "),s("el-form-item",{attrs:{label:"反馈内容"}},[e._v("\n        "+e._s(e.show.res.content)+"\n      ")]),e._v(" "),s("el-form-item",{staticClass:"imgs",attrs:{label:"图片信息"}},e._l(e.imgs,function(e){return s("img",{key:e,attrs:{src:e,alt:""}})})),e._v(" "),s("el-form-item",{attrs:{label:"状态"}},[s("el-select",{attrs:{clearable:""},model:{value:e.show.res.state,callback:function(t){e.$set(e.show.res,"state",t)},expression:"show.res.state"}},e._l(e.state,function(e,t){return s("el-option",{key:t,attrs:{label:e,value:t.toString()}})}))],1),e._v(" "),s("el-form-item",{attrs:{label:"备注"}},[s("el-input",{attrs:{rows:5,type:"textarea"},model:{value:e.show.res.remark,callback:function(t){e.$set(e.show.res,"remark",t)},expression:"show.res.remark"}})],1),e._v(" "),s("el-form-item",{attrs:{label:""}},[s("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(t){e.save()}}},[e._v("保存")])],1)],1)],1)])},staticRenderFns:[]};var n=s("Z0/y")(o,l,!1,function(e){s("nbEk")},"data-v-4e13fedf",null);t.default=n.exports},nbEk:function(e,t){}});
//# sourceMappingURL=29.787863d0691db7fbf313.js.map