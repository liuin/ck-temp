webpackJsonp([37],{V3tF:function(t,e){},Zume:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("waNZ"),l={name:"",mixins:[i.f,i.d],data:function(){return{type:3}},watch:{rulesType:function(t){return t}},created:function(){var t=this;this.activityShow.id=this.$route.query.id,this.activityShowCall(this.type).then(function(e){for(var a in t.activityUpdate)t.activityShowRes.hasOwnProperty(a)&&(t.activityUpdate[a]=t.activityShowRes[a]);t.activityUpdateType=t.activityUpdate.rules.type,t.activityUpdateRules=t.activityUpdate.rules.rules})},methods:{addRow:function(){this.activityUpdateRules.push({done:"",money:""})},del:function(t){this.activityUpdateRules.splice(t)}},mounted:function(){}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"activity-recharge-add"},[a("div",{staticClass:"box"},[a("el-form",{attrs:{"label-position":"right","label-width":"120px"}},[a("el-form-item",{attrs:{label:"活动名称"}},[a("el-input",{model:{value:t.activityUpdate.title,callback:function(e){t.$set(t.activityUpdate,"title",e)},expression:"activityUpdate.title"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"活动时间"}},[a("el-date-picker",{attrs:{type:"daterange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期"},model:{value:t.activityUpdateTime,callback:function(e){t.activityUpdateTime=e},expression:"activityUpdateTime"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"活动类型"}},[a("el-radio",{attrs:{label:"level"},model:{value:t.activityUpdateType,callback:function(e){t.activityUpdateType=e},expression:"activityUpdateType"}},[t._v("活动期间")]),t._v(" "),a("el-radio",{attrs:{label:"a_day"},model:{value:t.activityUpdateType,callback:function(e){t.activityUpdateType=e},expression:"activityUpdateType"}},[t._v("每天")])],1),t._v(" "),a("el-form-item",{attrs:{label:"活动规则"}},[a("el-table",{staticClass:"table-add",attrs:{border:"",data:t.activityUpdateRules}},[a("el-table-column",{attrs:{prop:"id",label:"充值金额(元)"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{type:"number"},model:{value:e.row.done,callback:function(a){t.$set(e.row,"done",t._n(a))},expression:"scope.row.done"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"赠送金额(元)"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("el-input",{attrs:{type:"number"},model:{value:e.row.money,callback:function(a){t.$set(e.row,"money",t._n(a))},expression:"scope.row.money"}})]}}])}),t._v(" "),a("el-table-column",{attrs:{prop:"",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[a("delBtn",{on:{del:function(a){t.del(e.$index)}}})]}}])})],1),t._v(" "),a("div",{staticClass:"line1"}),t._v(" "),a("el-button",{staticClass:"addbtn",attrs:{type:"primary"},on:{click:function(e){t.addRow()}}},[t._v("新增")])],1),t._v(" "),a("div",{staticClass:"line2"}),t._v(" "),a("el-form-item",{attrs:{label:""}},[a("el-button",{attrs:{size:"medium",type:"primary"},on:{click:function(e){t.activityUpdateCall(t.type)}}},[t._v("保存")])],1)],1)],1)])},staticRenderFns:[]};var o=a("Z0/y")(l,n,!1,function(t){a("V3tF")},"data-v-32ea0a11",null);e.default=o.exports}});
//# sourceMappingURL=37.47fe5d24dd355ef80b15.js.map