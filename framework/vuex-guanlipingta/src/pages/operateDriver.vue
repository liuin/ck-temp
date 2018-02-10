<template>
  <div class="operate-driver">
    <div class="box">
      <p class="p1">司机接单后无责取消订单时间：
        <el-input class="input1"></el-input>分钟</p>
      <div class="line3"></div>
      <el-button size="medium" type="primary">保存</el-button>

    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data() {
      return {

      }
    },
    created() {},
    methods: {},
    mounted: function () {}
  }

</script>

<style lang="less" scoped>
  .input1 {
    display: inline-block;
    width: 100px;
    margin-right: 10px;
  }

</style>
