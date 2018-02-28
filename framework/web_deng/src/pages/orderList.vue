<template>
  <div class="order-list">                  
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

          <el-col :span="4">
            <el-form-item label="" label-width="40px">
               <el-button class="btn-save" @click="seach()" :loading="false" icon="el-icon-search" type="primary">搜　索</el-button>
            </el-form-item>
          </el-col>
         </el-row>

      </el-form>

      <div class="line3"></div>
      <el-tabs @tab-click="handleClickTab"  :value="list.order_state">
        <el-tab-pane v-for="(item,index) in orderState" :label="item" :key="item" :name="index"  ></el-tab-pane>      
      </el-tabs>

      <el-table border :data="searchData.list">
        <el-table-column prop="orders_sn" width="150" label="物流单号" ></el-table-column>      
        <el-table-column prop="maker_mobile" label="厂商" width="100" ></el-table-column>      
        <el-table-column prop="warehouse_address" width="200px" label="收货地地址" ></el-table-column>      
        <el-table-column prop="park_address" label="目的地地址" ></el-table-column>      
        <el-table-column prop="driver_mobile" label="司机方" width="120"></el-table-column>      
        <el-table-column prop="total" label="结算金额" width="80"></el-table-column>          
        <el-table-column label="状态" >
          <template slot-scope="scope">
            {{orderState[scope.row.state]}}
          </template>  
        </el-table-column>          
        <el-table-column  label="操作"  width="180">
          <template slot-scope="scope">
            <orderEditBtn @changeState="changeState" :scope="scope" />&nbsp;
            <router-link :to="{path: '/order/ListDetail', query: {id: scope.row.id}}">详情</router-link>
          </template> 
        </el-table-column>
      </el-table>    
      <pnation v-if="pager.total > 0" :total="pager.total" @changePage="changePage" :currentPage="pager.page" :size="pager.count"></pnation>

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
    ...mapState("orders", [
      "list",
      "orderState",
      "pager",
      "searchData",
      "dispose"
    ]),
    ...mapGetters("orders", ["conditions"])
  },
  created() {
    // this.pager.page = 1;
    // if(this.list.order_state == "0"){
    //   this.list.order_state = "";      
    // }


    if(this.$route.query.maker_id){
      this.list.maker_id = this.$route.query.maker_id;
    }
    

    if(this.$route.query.maker_mobile){
      this.list.maker_mobile = this.$route.query.maker_mobile;
    }

    this.seach();
  },
  methods: {
    changeState(val, scope) {
      this.dispose.id = scope.row.id;
      this.dispose.state = val;
      this.$store.dispatch("orders/dispose").then(data => {
        this.searchData.list[scope.$index].state = val;
      });
    },
    changePage(pager) {
      this.pager.page = pager
      this.seach(pager);
    },
    seach(pager) {
      if (pager) {
        var sendDate = {
          conditions: this.conditions,
          page: pager,
          count: this.pager.count,
          total: 1
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
     
      this.list.order_state = tab.name;
      this.pager.page = 1;
      this.pager.total = 0;
      this.seach();
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.box-search {
  max-width: 1000px;
}
</style>