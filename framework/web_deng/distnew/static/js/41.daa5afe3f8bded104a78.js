webpackJsonp([41],{mxrf:function(s,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("4YfN"),r=e.n(a),i=e("9rMa"),o={name:"orderListDetail",data:function(){return{orders:{},goodsInOrders:[]}},computed:r()({},Object(i.c)("orders",["show","orderState"]),{getGoods:function(){var s=[];return this.goodsInOrders.map(function(t){t.goods_list.map(function(t){s.push(t)})}),s},weigth:function(){var s=0;return this.getGoods.map(function(t){s+=t.length*t.width*t.height}),s},heawt:function(){var s=0;return this.getGoods.map(function(t){s+=t.weight}),s}}),created:function(){var s=this;this.$store.dispatch("orders/show",{id:this.$route.query.id}).then(function(t){s.orders=t.orders,s.goodsInOrders=t.goodsInOrders})},methods:{handleChange:function(){}},mounted:function(){}},l={render:function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("div",{staticClass:"order-list-detail"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:24}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-info"}),s._v(" "),e("span",[s._v("基本信息")])]),s._v(" "),e("div",{staticClass:"ct"},[e("div",{staticClass:"item"},[s._v("物流单号："+s._s(s.orders.orders_sn)+"     订单状态："+s._s(s.orderState[s.orders.state]))]),s._v(" "),e("div",{staticClass:"item"},[s._v("厂商账号："+s._s(s.orders.driver_name))]),s._v(" "),e("div",{staticClass:"item"},[s._v("行驶里程："+s._s(s.orders.estimated_mileage))]),s._v(" "),e("div",{staticClass:"item"},[s._v("备注："+s._s(s.orders.remark))]),s._v(" "),e("div",{staticClass:"item"},[s._v("结算信息：¥"+s._s(s.orders.price)+" + ¥"+s._s(s.orders.service_charge)+" = ¥"+s._s(s.orders.total)+" ")])])])],1)],1),s._v(" "),e("div",{staticClass:"line3"}),s._v(" "),e("el-row",{attrs:{gutter:20,type:"flex"}},[e("el-col",{attrs:{span:12}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-info"}),s._v(" "),e("span",[s._v("厂商信息")])]),s._v(" "),e("div",{staticClass:"ct"},[e("dl",{staticClass:"dl1"},[e("dt",[e("b",[s._v("收货地信息")]),s._v("：")]),s._v(" "),e("dd",[s._v("预计收货："+s._s(s.api.toTime(s.orders.receive_time))+" ")]),s._v(" "),e("dd",[s._v("收货地址："+s._s(s.orders.warehouse_address))]),s._v(" "),e("dd",[s._v("联系人："+s._s(s.orders.warehouse_title))]),s._v(" "),e("dd",[s._v("联系电话："+s._s(s.orders.warehouse_phone))])]),s._v(" "),e("dl",[e("dt",[e("b",[s._v("目的地信息")]),s._v("：")]),s._v(" "),e("dd",[s._v("预计送达："+s._s(s.orders.complete_time))]),s._v(" "),e("dd",[s._v("收货地址："+s._s(s.orders.company_address))]),s._v(" "),e("dd",[s._v("联系人："+s._s(s.orders.company_title))]),s._v(" "),e("dd",[s._v("联系电话："+s._s(s.orders.company_phone))])])])])],1),s._v(" "),e("el-col",{attrs:{span:12}},[e("el-card",{staticClass:"box-card"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-info"}),s._v(" "),e("span",[s._v("司机方信息")])]),s._v(" "),e("div",{staticClass:"ct"},[e("p",[s._v("\n            司机姓名："+s._s(s.orders.driver_name)+"\n            "),e("br"),s._v(" 司机评分："+s._s(s.orders.driver_score)+"分\n            "),e("br"),s._v(" 联系电话："+s._s(s.orders.driver_mobile)+"\n          ")])])])],1)],1),s._v(" "),e("div",{staticClass:"line3"}),s._v(" "),e("el-card",{staticClass:"box-card box-goods"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("i",{staticClass:"el-icon-info"}),s._v(" "),e("span",[s._v("货物信息")])]),s._v(" "),e("div",{staticClass:"ct"},[e("el-row",{attrs:{gutter:20}},[e("el-col",{attrs:{span:17}},[e("p",{staticClass:"p1 ov-h"},[e("span",{staticClass:"fl"},[s._v("货物体积：共"+s._s(s.weigth)+"m³ ")]),s._v(" "),e("span",{staticClass:"fl",staticStyle:{"margin-left":"20px"}},[s._v("重量："+s._s(s.heawt)+"kg")])]),s._v(" "),e("p",{staticClass:"p1 p1-come ov-h"},[e("span",{staticClass:"fl"},[s._v("来源订单：")]),s._v(" "),e("span",{staticClass:"sp1"},[s._v(s._s(s.goodsInOrders.platform_title)+": "+s._s(s.goodsInOrders.platform_order_sn)+" ")])]),s._v(" "),e("div",{staticClass:"line1"}),s._v(" "),e("el-table",{attrs:{border:"",data:s.getGoods}},[e("el-table-column",{attrs:{prop:"title",label:"名称"}}),s._v(" "),e("el-table-column",{attrs:{label:"体积(m³)"},scopedSlots:s._u([{key:"default",fn:function(t){return[s._v("\n                "+s._s(t.row.length)+"*"+s._s(t.row.width)+"*"+s._s(t.row.height)+"\n              ")]}}])}),s._v(" "),e("el-table-column",{attrs:{prop:"weight",label:"重量(kg)"}}),s._v(" "),e("el-table-column",{attrs:{prop:"total",label:"数量"}}),s._v(" "),e("el-table-column",{attrs:{prop:"remark",label:"备注"}})],1)],1),s._v(" "),e("el-col",{attrs:{span:7}},[e("p",[s._v("回执图片")]),s._v(" "),e("img",{staticStyle:{width:"100%",height:"100px",background:"#eee"},attrs:{src:s.orders.receipt,alt:""}})])],1)],1)]),s._v(" "),e("div",{staticClass:"line3"}),s._v(" "),s._e()],1)},staticRenderFns:[function(){var s=this.$createElement,t=this._self._c||s;return t("div",{staticClass:"ct"},[t("p",{staticClass:"p1"},[this._v("2018-01-12 12:12:15 系统 订单201130220100已完成")]),this._v(" "),t("p",{staticClass:"p1"},[this._v("2018-01-12 12:12:15 系统 订单201130220100已完成")]),this._v(" "),t("p",{staticClass:"p1"},[this._v("2018-01-12 12:12:15 系统 订单201130220100已完成")])])}]};var d=e("Z0/y")(o,l,!1,function(s){e("nfrt")},"data-v-2e519a0d",null);t.default=d.exports},nfrt:function(s,t){}});
//# sourceMappingURL=41.daa5afe3f8bded104a78.js.map