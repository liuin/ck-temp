<template>
  <div class="order-list-detail">

    <el-row :gutter="20">
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>
            <span>基本信息</span>
          </div>
          <div class="ct">
            <div class="item">物流单号：{{orders.orders_sn}} &nbsp;&nbsp;&nbsp;&nbsp;订单状态：{{orderState[orders.state]}}</div>
            <div class="item">厂商账号：{{orders.driver_name}}</div>
            <div class="item">行驶里程：{{orders.estimated_mileage}}公里</div>
            <div class="item">备注：{{orders.remark || '无'}}</div>
            <div class="item">结算信息：¥{{orders.price}} + ¥{{orders.service_charge}}(消费) = {{orders.total}}元 </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="line3"></div>
    <el-row :gutter="20" type="flex">



      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>
            <span>厂商信息</span>
          </div>
          <div class="ct">
            <dl class="dl1">
              <dt>
                <b>收货地信息</b>：</dt>
              <dd>预计收货：{{api.toTime(orders.receive_time)}} </dd>
              <dd>收货地址：{{orders.warehouse_address}}</dd>
              <dd>联系人：{{orders.company_title}}物流</dd>
              <dd>联系电话：{{orders.warehouse_phone}}</dd>
            </dl>
            <dl>
              <dt>
                <b>目的地信息</b>：</dt>
              <dd>预计送达：{{api.toTime(orders.complete_time)}}</dd>
              <dd>收货地址：{{orders.company_address}}</dd>
              <dd>联系人：{{orders.company_title}}</dd>
              <dd>联系电话：{{orders.company_phone}}</dd>
            </dl>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>
            <span>司机方信息</span>
          </div>
          <div class="ct">
            <p>
              司机姓名：{{orders.driver_name}}
              <br /> 司机评分：{{orders.driver_score}}分
              <br /> 联系电话：{{orders.driver_mobile}}
            </p>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <div class="line3"></div>
    <el-card class="box-card box-goods">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>
        <span>货物信息</span>
      </div>
      <div class="ct">
        <el-row :gutter="20">
          <el-col :span="17">
            <p class="p1 ov-h">
              <span class="fl">货物体积：约{{orders.volume}}m³ </span>
              <span class="fl" style="margin-left:20px;">重量：{{orders.weight}}kg</span>
            </p>
            <p class="p1 p1-come ov-h">
              <span class="fl">来源订单：</span>
              <span class="sp1">{{goodsInOrders.platform_title}}: {{goodsInOrders.platform_order_sn}} </span>
            </p>

            <div class="line1"></div>
            <el-table border :data="getGoods">
              <el-table-column prop="title" label="名称"></el-table-column>
              <el-table-column label="体积(m³)">
                <template slot-scope="scope">
                  {{scope.row.length}}*{{scope.row.width}}*{{scope.row.height}}
                </template>
              </el-table-column>
              <el-table-column prop="weight" label="重量(kg)"></el-table-column>
              <el-table-column prop="total" label="数量"></el-table-column>
              <el-table-column prop="remark" label="备注"></el-table-column>
            </el-table>

          </el-col>
          <el-col :span="7">
            
            <p v-if="orders.receipt_sn">{{orders.company_title}}物流: {{orders.receipt_sn}}</p>
            <template v-if="orders.receipt_url">
              <p>回执图片</p>
              <img  :src="api.imgdesc(orders.receipt_url, '240px')" alt="" />
            </template>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <div class="line3"></div>
    <div class="box box-time">
      <h3>时间日志</h3>
      <div class="ct">
        <el-table border :data="ordersLogList">
          <el-table-column prop="id" label="ID"></el-table-column>
          <el-table-column prop="orders_id" label="订单ID"></el-table-column>
          <el-table-column label="来源">
            <template slot-scope="scoped">
              {{ordersLogState[scoped.row.where]}}
            </template>
          </el-table-column>
          <el-table-column prop="relate_to_where" label="来源关联信息"></el-table-column>
          <el-table-column prop="description" label="描述"></el-table-column>
          <el-table-column label="创建时间">
            <template slot-scope="scoped">
              {{api.toTime(scoped.row.where)}}
            </template>
          </el-table-column>
        </el-table>
      </div>


    </div>

  </div>
</template>

<script>
import { ordersLog } from "../store/modules/orders.js";
import { mapState } from "vuex";

export default {
  name: "orderListDetail",
  data() {
    return {
      orders: {},
      goodsInOrders: []
    };
  },
  mixins: [ordersLog],
  computed: {
    ...mapState("orders", ["show", "orderState", "porder"]),
    getGoods() {
      var goods = [];
      this.goodsInOrders.map(item => {
        item.goods_list.map(itemSub => {
          goods.push(itemSub);
        });
      });
      return goods;
    },
    weigth() {
      var weigth = 0;
      this.getGoods.map(item => {
        weigth += item.length * item.width * item.height;
      });
      return weigth;
    },
    heawt() {
      var heawt = 0;
      this.getGoods.map(item => {
        heawt += item.weight;
      });
      return heawt;
    }
  },
  created() {
    this.$store
      .dispatch("orders/show", {
        id: this.$route.query.id
      })
      .then(data => {
        this.orders = data.orders;
        this.goodsInOrders = data.goodsInOrders;
      });
  },
  methods: {
    handleChange() {}
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.box-card {
  height: 100%;
  .ct {
    font-size: 14px;
  }
  .dl1 {
    margin-bottom: 10px;
  }
  .el-icon-info {
    margin-right: 10px;
  }
}

.box-goods {
  height: auto;
  .p1-come {
    .sp1 {
      margin-left: 70px;
      display: block;
    }
  }
}
</style>
