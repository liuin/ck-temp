<template>
  <div class="message-list">
    <div class="box">



      <el-button type="primary" size="medium" @click="$router.push('/message/listAdd')">新建消息</el-button>

      <div class="line2"></div>

      <el-table width="100%" border :data="[{id:18821214125},{}]">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="" label="标题"></el-table-column>
        <el-table-column prop="" label="分类"></el-table-column>
        <el-table-column prop="" label="点击率"></el-table-column>
        <el-table-column prop="" label="点击量"></el-table-column>
        <el-table-column prop="" label="送达率"></el-table-column>
        <el-table-column prop="" label="送达量"></el-table-column>
        <el-table-column prop="" label="推送量"></el-table-column>
        <el-table-column prop="" label="活动时间"></el-table-column>
        <el-table-column prop="" label="状态"></el-table-column>

        <el-table-column prop="" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini">暂停</el-button>
            <el-button size="mini" @click="$router.push({path: '/message/listAdd', 'query': {'edit': '123'}})">编辑</el-button>
            <el-button size="mini" @click="$router.push({path: '/message/listDetail', 'query': {'id': '123'}})">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

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


</style>
