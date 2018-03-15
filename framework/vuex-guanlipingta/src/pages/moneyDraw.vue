<template>
  <div class="money-draw"><div class="box">
      <div class="w1000">
        <el-form label-width="90px">
            <el-row :gutter="10">
              <el-col :span="7" >
                <el-form-item label="司机手机号">
                  <el-input v-model="driveramountDrawList.driver_mobile"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="状态" label-width="50px">
                  <el-select v-model="driveramountDrawList.state">
                    <el-option :value="index" :label="item" v-for="(item,index) in amountState" :key="item"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
  
              <el-col :span="10">
                <el-form-item label="申请时间">
                  <el-date-picker
                    v-model="driveramountDrawListTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              
           </el-row>
           
        
                <el-form-item label="">
                   <el-button icon="el-icon-search" class="btn-save" @click="search()" type="primary">搜　索</el-button>
                </el-form-item>
          </el-form>
      </div>
  
      <div class="line3"></div>
          
          
          <el-table border  width="100%"  :data="driveramountDrawListRes"  >
              <el-table-column prop="id" label="提现编号" ></el-table-column>      
              <el-table-column prop="driver_mobile" label="司机手机号" ></el-table-column>      
              <!-- <el-table-column prop="" label="提现方式" ></el-table-column>       -->
              <el-table-column prop="money" label="提现金额"  >
                <template slot-scope="scope">
                  ¥{{scope.row.money}}
                </template>
              </el-table-column>                  
              <el-table-column prop="" label="申请时间"  >
                <template slot-scope="scope">
                  {{api.toTime(scope.row.created)}}
                </template>
              </el-table-column>                  
              <el-table-column prop="" label="状态"  >
                <template slot-scope="scope">
                  {{amountState[scope.row.state]}}
                </template>  
              </el-table-column>                  
              <el-table-column prop="" label="到账时间"  ></el-table-column>            
            </el-table> 
  <!--         <pnation :size="7" :total="10"></pnation> -->
            <pnation v-if="driveramountDrawListPage.total != 0" :total="driveramountDrawListPage.total" @changePage="changePage" :size="driveramountDrawListPage.count"></pnation>    
  </div></div>
</template>

<script>
import { amountState, driveramountDrawList } from "../store/modules/amount.js";

export default {
  name: "moneyDraw",
  data() {
    return {
      visible1: false
    };
  },
  mixins: [amountState, driveramountDrawList],
  created() {
    this.driveramountDrawListCall();
  },
  methods: {
    changePage(val) {
      this.driveramountDrawListRes.page = val;
      this.driveramountDrawListCall();
    },
    search() {
      this.driveramountDrawListCall();
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.btn-edit {
  display: block;
  margin-left: auto;
}
</style>