<template>
  <div class="message-list">

    <div class="box">
      <el-button size="medium" type="primary" @click="$router.push('/server/add')">新增合作平台</el-button>

      <div class="line2"></div>

      <el-table :data="list.res" border>
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="title" label="平台名称"></el-table-column>
        <el-table-column prop="company" label="平台所属公司"></el-table-column>
        <el-table-column label="合作状态">
          <template slot-scope="scope">
            <span :class="'state-' + scope.row.state">{{state[scope.row.state]}}</span>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">
            <span>{{api.toTime(scope.row.created)}}</span>
          </template>

        </el-table-column>

        <el-table-column prop="" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push({path: '/server/edit', 'query': {'id': scope.row.id}})">编辑</el-button>
            <el-button size="mini" @click="$router.push({path: '/server/detail', 'query': {'id': scope.row.id}})">详情</el-button>
          </template>
        </el-table-column>
      </el-table>

      <pnation v-if="list.total!=0" :total="list.total" @changePage="changePage" :size="list.count"></pnation>

    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'

  export default {
    name: 'server',
    data() {
      return {

      }
    },
    computed: {
      ...mapState('platform', ['list', 'state'])
    },
    created() {
      this.$store.dispatch('platform/list', this.list).then(data => {
        this.list.res = data.list
        this.list.total = data.list_total
      })
    },
    methods: {
      changePage(pager) {
        let sendData = {
          page: pager,
          count: this.list.count
        }
        this.$store.dispatch('platform/list', sendData).then(data => {
          this.list.res = data.list
        })

      }
    },
    mounted: function () {}
  }

</script>

<style lang="less" scoped>


</style>
