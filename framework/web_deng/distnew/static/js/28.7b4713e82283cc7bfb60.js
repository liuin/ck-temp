webpackJsonp([28],{"e/aA":function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=s("4YfN"),i=s.n(a),o=s("9rMa"),l=s("z/Fw"),p=s.n(l),c={name:"",data:function(){return{RegionJson:{}}},computed:i()({},Object(o.c)("message",["templateShow","templateShowRes","categoryListRes","activity_state"])),created:function(){var t=this;this.templateShow.id=this.$route.query.id,this.$store.dispatch("message/categoryList"),this.$store.dispatch("message/templateShow").then(function(e){console.log(t.templateShowRes)}),this.RegionJson=p.a},methods:{},mounted:function(){}},n={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"message-list-detail"},[s("div",{staticClass:"box"},[s("el-button",{staticClass:"edit",attrs:{type:"primary",size:"medium"},on:{click:function(e){t.$router.push({path:"/message/listEdit",query:{id:t.templateShowRes.id}})}}},[t._v("重新编辑")]),t._v(" "),s("div",{staticClass:"line2"}),t._v(" "),s("el-row",[s("el-col",{attrs:{span:8}},[s("p",{staticClass:"p1"},[t._v("标题："+t._s(t.templateShowRes.title))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("推送时间："+t._s(t.api.toTime(t.templateShowRes.push_time)))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("活动时间："+t._s(t.api.toTime(t.templateShowRes.activity_start_time))+"至 "+t._s(t.api.toTime(t.templateShowRes.activity_end_time)))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("封面图片：\n          "),s("img",{staticStyle:{width:"200px",height:"150px",display:"inline-block",background:"#eee","vertical-align":"top"},attrs:{src:t.templateShowRes.cover_image,alt:""}})])]),t._v(" "),s("el-col",{attrs:{span:7}},[s("p",{staticClass:"p1"},[t._v("分类："+t._s(t.templateShowRes.message_category_title))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("状态："+t._s(t.activity_state[t.templateShowRes.activity_state]))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("点击量："+t._s(t.templateShowRes.click_amount))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("送达量："+t._s(t.templateShowRes.arrived_amount))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("推送量："+t._s(t.templateShowRes.push_amount))])]),t._v(" "),s("el-col",{attrs:{span:7}},[s("p",{staticClass:"p1"},[t._v("推送用户："+t._s(t.templateShowRes.push_tags_title))]),t._v(" "),s("p",{staticClass:"p1"},[t._v("推送地区："+t._s(0!=t.templateShowRes.province?t.RegionJson[1][t.templateShowRes.province]+"  "+t.RegionJson[t.templateShowRes.province][t.templateShowRes.city]:"--"))])])],1),t._v(" "),s("div",{staticClass:"editbox"},[t._v("\n      "+t._s(t.templateShowRes.content)+"\n    ")])],1)])},staticRenderFns:[]};var _=s("Z0/y")(c,n,!1,function(t){s("m0aP")},"data-v-508b8ef3",null);e.default=_.exports},m0aP:function(t,e){}});
//# sourceMappingURL=28.7b4713e82283cc7bfb60.js.map