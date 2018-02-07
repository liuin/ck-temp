<template>
  <div class="order-list">
    <breadcrumb />
    <div class="line2"></div>

    
      
    <div class="box">
      <el-form label-width="80px" class="box-search">
        <el-row :gutter="10">
          <el-col :span="8" >
            <el-form-item label="厂商手机">
              <el-input v-model="list.maker_mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item  label="物流单号">
              <el-input v-model="list.order_sn"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            
          </el-col>
          
<!--          </el-row> -->

<!--         <el-row :gutter="20"> -->
          <el-col :span="8">
            <el-form-item label="司机手机">
              <el-input v-model="list.driver_mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="司机姓名">
              <el-input v-model="list.driver_name"></el-input>
            </el-form-item>
          </el-col>
                    
          <el-col :span="12">
            <el-form-item label="时间">
              <el-date-picker v-model="list.created" style="width:100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :sm="24" :md="3">
            <el-form-item label="">
               <el-button class="btn-save" @click="seach()" :loading="false" icon="el-icon-search" type="primary">搜　索</el-button>
            </el-form-item>
          </el-col>
         </el-row>

      </el-form>

      <div class="line3"></div>
      <el-tabs @tab-click="handleClickTab">
        <el-tab-pane label="全部" ></el-tab-pane>
        <el-tab-pane label="待接单"></el-tab-pane>
        <el-tab-pane label="待收货"></el-tab-pane>
        <el-tab-pane label="待确认"></el-tab-pane>
        <el-tab-pane label="已完成"></el-tab-pane>
        <el-tab-pane label="已取消"></el-tab-pane>
      </el-tabs>

      <el-table  :data="searchData.list">
        <el-table-column prop="orders_sn" label="物流单号" ></el-table-column>      
        <el-table-column prop="maker_mobile" label="厂商" ></el-table-column>      
        <el-table-column prop="warehouse_address" label="收货地地址" ></el-table-column>      
        <el-table-column prop="park_address" label="目的地地址" ></el-table-column>      
        <el-table-column prop="driver_mobile" label="司机方" ></el-table-column>      
        <el-table-column prop="total" label="结算金额" ></el-table-column>          
        <el-table-column prop="" label="状态" ></el-table-column>          
        <el-table-column  label="操作"  width="180">
          <template slot-scope="scope"><orderEditBtn :scope="scope" />
            <router-link :to="{path: '/order/ListDetail', query: {id: scope.row.id}}">详情</router-link>
          </template> 
        </el-table-column>
      </el-table>       
      <pnation v-if="pager.total!=0" :total="pager.total" @changePage="changePage" :size="pager.count"></pnation>

    </div>  
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import orderEditBtn from "@/components/orderEditBtn.vue";

export default {
  name: "",
  data() {
    return {
      tableData: {}
    };
  },
  components: {
    orderEditBtn
  },
  computed: {
    ...mapState("orders", ["list", "orderState", "pager", "searchData"]),
    ...mapGetters("orders", ["conditions"])
  },
  created() {
    this.seach();
  },
  methods: {
    changePage(pager) {
      this.seach(pager);
    },
    seach(pager) {
      if (pager) {
        var sendDate = {
          conditions: this.conditions,
          page: pager,
          count: this.pager.count
        };
      } else {
        var sendDate = {
          conditions: this.conditions,
          page: this.pager.page,
          count: this.pager.count,
          total: 1
        };
      }

      this.$store.dispatch("orders/list", sendDate).then(data => {
        this.pager.total = data.list_total || this.pager.total;
        this.searchData.list = data.list;
        // this.searchData.list = [{},{}];
      });
    },
    handleClickTab(tab, event) {
      if (tab.index == 0) {
        this.list.order_state = "";
      }

      if (tab.index == 1) {
        this.list.order_state = 0;
      }
      if (tab.index == 2) {
        this.list.order_state = 8;
      }
      this.seach();
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.box-search {
  width: 1000px;
}
</style>