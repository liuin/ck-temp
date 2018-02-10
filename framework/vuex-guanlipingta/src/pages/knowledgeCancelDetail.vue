<template>
  <div class="knowledgeCarType">


    
    <div class="box">

      <p class="p1">排序：{{show.res.order}}</p>
      <p class="p1">取消原因： {{show.res.title}} </p>
      <p class="p1">次数统计：{{show.res.order}} </p>
      <p class="p1">状态：{{state[show.res.state]}} </p>

      <p class="p1">取消记录</p>
      <el-table width="100%" border :data="[{id:18821214125},{}]">
        <el-table-column prop="id" label="物流订单编号"></el-table-column>
        <el-table-column prop="" label="订单取消时间"></el-table-column>
        <el-table-column prop="" label="用户手机号"></el-table-column>
      </el-table>

    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";

  export default {
    name: "",
    data() {
      return {};
    },
    computed: {
      ...mapState('ordersCanceledReason', ['show', 'state'])
    },
    created() {

      this.$store.dispatch('ordersCanceledReason/show', {
        id: this.$route.query.id
      }).then(data => {
        console.log(data);
      })
    },
    methods: {},
    mounted: function () {}
  };

</script>

<style lang="less" scoped>
  .p1 {
    margin-bottom: 10px;
  }

</style>
