<template>
  <div class="money-consume">
    <div class="box">





      <div class="w1000">
        <el-form label-width="100px">
          <el-row :gutter="10">
            <el-col :span="7">
              <el-form-item label="厂商手机号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="司机手机号">
                <el-input></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="状态" label-width="60px">
                <el-select value="1">
                  <el-option value="2"></el-option>
                  <el-option value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="20">
              <el-form-item label="厂商付款时间">
                <el-date-picker type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>

          </el-row>


          <el-form-item label="">
            <el-button icon="el-icon-search" class="btn-save" type="primary">搜　索</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div class="line3"></div>


      <el-table border width="100%" :data="[{id:18821214125},{}]">
        <el-table-column prop="id" label="消费编号"></el-table-column>
        <el-table-column prop="" label="厂商手机号"></el-table-column>
        <el-table-column prop="" label="物流订单编号"></el-table-column>
        <el-table-column prop="" label="订单总金额"></el-table-column>
        <el-table-column prop="" label="厂商付款时间"></el-table-column>
        <el-table-column prop="" label="司机手机号"></el-table-column>
        <el-table-column prop="" label="司机收款时间"></el-table-column>
        <el-table-column prop="" label="状态"></el-table-column>
      </el-table>
      <!--         <pnation :size="7" :total="10"></pnation> -->
      <pnation :size="7" :total="10"></pnation>


    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {
        visible1: false
      }
    },
    created() {},
    methods: {},
    mounted: function () {}
  }

</script>

<style lang="less" scoped>
  .btn-edit {
    display: block;
    margin-left: auto;
  }

</style>
