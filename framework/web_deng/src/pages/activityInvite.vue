<template>
  <div class="system-account">
    <div class="box">

      <el-button type="primary" size="medium" @click="$router.push({path: '/activity/inviteAdd'})">添加活动</el-button>
      <div class="line2"></div>
      <el-table border width="100%" :data="activityListRes" v-loading="loading">
        <el-table-column prop="id" label="活动ID" width="70"></el-table-column>
        <el-table-column prop="title" label="活动名称"></el-table-column>
        <el-table-column prop="" label="活动时间" width="300">
          <template slot-scope="scope">
            {{api.toTime(scope.row.start_time)}}至{{api.toTime(scope.row.end_time)}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="活动状态">
          <template slot-scope="scope">
            {{activityState[scope.row.state]}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" width="250px">
          <template slot-scope="scope">
            <el-button size="mini" @click="stop(scope.row.id)" v-if="(scope.row.state == 1 || scope.row.state == 4)">{{(scope.row.state == 4) ? '开始': '暂停'}}</el-button>
            <el-button size="mini" @click="$router.push({path: '/activity/inviteDetail', 'query': {'id': scope.row.id}})">详情</el-button>
            <el-button size="mini" @click="$router.push({path: '/activity/inviteEdit', 'query': {'id': scope.row.id}})">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pnation v-if="activityList.total != 0" :total="activityList.total" @changePage="changePage" :size="activityList.count"></pnation>


    </div>
  </div>
</template>

<script>
import {
  activityList,
  activityPauseOrStart,
  activityState
} from "../store/modules/activity.js";

export default {
  name: "",
  mixins: [activityList, activityPauseOrStart, activityState],
  data() {
    return {
      loading: false,
      visible1: false,
      type: 2 //充值奖励
    };
  },
  created() {
    console.log(activityState);
    this.activityListCall(this.type);
  },
  methods: {
    stop(id) {
      this.loading = true;
      this.activityPauseOrStart.id = id;
      this.activityPauseOrStartCall(this.type).then(data => {
        this.changePage();
      });
    },
    changePage(val) {
      this.loading = true;
      this.activityList.page = val || this.activityList.page;
      this.activityListCall(this.type)
        .then(data => {
          this.loading = false;
        })
        .catch(data => {
          this.loading = false;
        });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>

</style>
