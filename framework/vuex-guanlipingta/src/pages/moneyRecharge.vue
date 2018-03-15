<template>
  <div class="money-recharge">
    <div class="box">
      <div class="w1000">
        <el-form label-width="90px">
          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label="厂商手机号">
                <el-input v-model="makeramountRechargeList.maker_mobile"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item label="充值时间">
                <el-date-picker v-model="makeramountRechargeListTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>


          <el-form-item label="">
            <el-button icon="el-icon-search" @click="search()" class="btn-save" type="primary">搜　索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="line3"></div>


      <el-table border width="100%" :data="makeramountRechargeListRes">
        <el-table-column prop="id" label="充值编号"></el-table-column>
        <el-table-column prop="maker_mobile" label="厂商手机号"></el-table-column>
        <el-table-column prop="" label="充值方式"></el-table-column>
        <el-table-column prop="" label="充值金额">
          <template slot-scope="scope">
            ¥{{scope.row.money}}
          </template>

        </el-table-column>
        <!-- <el-table-column prop="" label="返利金额"></el-table-column> -->
        <el-table-column prop="" label="充值时间">
          <template slot-scope="scope">
            {{api.toTime(scope.row.created)}}
          </template>
        </el-table-column>
      </el-table>
      <!--         <pnation :size="7" :total="10"></pnation> -->
      <pnation v-if="makeramountRechargeListPage.total != 0" :total="makeramountRechargeListPage.total" @changePage="changePage"
        :size="makeramountRechargeListPage.count"></pnation>

    </div>
  </div>
</template>

<script>
import {
  amountState,
  makeramountRechargeList
} from "../store/modules/amount.js";

export default {
  name: "makeramountRechargeList",
  data() {
    return {
      visible1: false
    };
  },
  mixins: [amountState, makeramountRechargeList],
  created() {
    this.makeramountRechargeListCall();
  },
  methods: {
    changePage(val) {
      this.driveramountRechargeListRes.page = val;
      this.makeramountRechargeListCall();
    },
    search() {
      this.makeramountRechargeListCall();
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
