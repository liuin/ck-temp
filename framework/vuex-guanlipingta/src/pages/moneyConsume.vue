<template>
  <div class="money-consume">
    <div class="box">
      <div class="w1000">
        <el-form label-width="100px">
          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label="厂商手机号">
                <el-input v-model="makeramountPayList.maker_mobile"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="司机手机号">
                <el-input v-model="makeramountPayList.driver_mobile"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="状态" label-width="60px">
                <el-select v-model="makeramountPayList.order_state">
                  <el-option :value="(index != '0')? index : ''" :label="item" v-for="(item,index) in orderState" :key="item"></el-option>
                </el-select>
                <!-- <el-select value="1">
                  <el-option value="2"></el-option>
                  <el-option value="3"></el-option>
                </el-select> -->
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item label="厂商付款时间">
                <el-date-picker type="daterange" v-model="makeramountPayListTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
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


      <el-table border width="100%" :data="makeramountPayListRes">
        <el-table-column prop="id" label="消费编号"></el-table-column>
        <el-table-column prop="maker_mobile" label="厂商手机号"></el-table-column>
        <el-table-column prop="orders_sn" width="150" label="物流订单编号"></el-table-column>
        <el-table-column prop="" label="订单总金额">
          <template slot-scope="scope">
            ¥{{scope.row.money}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="厂商付款时间">
          <template slot-scope="scoped">
            {{api.toTime(scoped.row.created)}}
          </template>
        </el-table-column>
        <el-table-column prop="driver_mobile" label="司机手机号">

        </el-table-column>
        <el-table-column label="司机收款时间">

        </el-table-column>
        <el-table-column prop="" label="状态">
          <template slot-scope="scope">
            {{orderState[scope.row.order_state]}}
          </template>
        </el-table-column>
      </el-table>
      <!-- {{makeramountPayListPage}} -->
      <!--         <pnation :size="7" :total="10"></pnation> -->
      <pnation v-if="makeramountPayListPage.total != 0" :total="makeramountPayListPage.total" @changePage="changePage" :size="makeramountPayListPage.count"></pnation>


    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { amountState, makeramountPayList } from "../store/modules/amount.js";
export default {
  name: "",
  mixins: [amountState, makeramountPayList],
  data() {
    return {
      visible1: false
    };
  },
  computed: {
    ...mapState("orders", ["orderState"])
  },
  created() {
    this.makeramountPayListCall();
  },
  methods: {
    changePage(val) {
      this.makeramountPayListPage.page = val;
      this.makeramountPayListCall();
    },
    search() {
      this.makeramountPayListCall();
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
