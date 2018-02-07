<template>
  <div class="operate-driver">
    <breadcrumb></breadcrumb>

    <div class="line3"></div>
      <p class="p1">厂商有责取消订单时间： 收货前&nbsp;<el-input class="input1"></el-input>分钟内</p>
      <p class="p1">厂商有责取消订单赔付金额：<el-input class="input1"></el-input>%订单金额</p>
      <p class="p1">厂商自动确认订单完成时间：<el-input class="input1"></el-input>分钟</p>      
     <div class="line3"></div>
     <el-button size="medium" type="primary">保存</el-button>

  </div>
</template>

<script>

  export default {
    name: '',
    data() {
      return {
        
      }
    },
    created() {
    },
    methods: {      
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
  .input1{display:inline-block; width:100px; margin-right:10px;}
  .p1 {margin-bottom:20px;}
</style>