<template>
  <div class="message-list">
    <div class="box">



      <el-button type="primary" size="medium" @click="$router.push('/message/listAdd')">新建消息</el-button>

      <div class="line2"></div>

      <el-table width="100%" border :data="templateListRes" v-loading="loading" element-loading-background="rgba(255, 255, 255, 0.3)" >
        <el-table-column prop="id" label="ID" width="40px"></el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="message_category_title" label="分类"></el-table-column>
        <el-table-column prop="" label="点击率">
          <template slot-scope="scope">
            {{  (scope.row.arrived_amount==0)? '0' : (scope.row.click_amount / scope.row.arrived_amount * 100).toFixed(2) + '%'}}
          </template>
        </el-table-column>
        <el-table-column prop="click_amount" label="点击量"></el-table-column>
        <el-table-column prop="" label="送达率">
          <template slot-scope="scope">
            {{  (scope.row.push_amount==0)? '0' : (scope.row.arrived_amount / scope.row.push_amount * 100).toFixed(2) + '%'}}
          </template>
        </el-table-column>
        <el-table-column prop="arrived_amount" label="送达量"></el-table-column>
        <el-table-column prop="push_amount" label="推送量"></el-table-column>
        <el-table-column  label="活动时间" width="280">
          <template slot-scope="scope">
            {{api.toTime(scope.row.activity_start_time)}} 至 {{api.toTime(scope.row.activity_end_time)}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态">
          <template slot-scope="scope">
            {{activity_state[scope.row.activity_state]}}
          </template>
        </el-table-column>

        <el-table-column prop="" label="操作" width="250">
          <template slot-scope="scope">
            <el-button v-if="scope.row.activity_state != 3 && scope.row.activity_state != 2" size="mini" @click="stop(scope.row)">{{(scope.row.activity_state == 1)? '暂停' : '开始'}}</el-button>
            <el-button v-if="scope.row.activity_state != 3 && scope.row.activity_state != 2" size="mini" @click="$router.push({path: '/message/listEdit', 'query': {id: scope.row.id}})">编辑</el-button>
            <el-button size="mini" @click="$router.push({path: '/message/listDetail', 'query': {id: scope.row.id}})">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
  
      <pnation v-if="templateList.total != 0" :total="templateList.total" @changePage="changePage" :size="templateList.count"></pnation>
      
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "messageList",
  data() {
    return {
      loading: true
    };
  },
  computed: {
    ...mapState("message", [
      "templateList",
      "templateListRes",
      "activity_state",
      "templatePauseOrStart"
    ])
  },
  created() {
    this.templateList.page = 1;
    this.templateList.state = 2;
    this.$store.dispatch("message/templateList").then(data => {
      this.loading = false;
    });
  },
  methods: {
    stop(item) {
      this.templatePauseOrStart.id = item.id;
      this.loading = true
      this.$store.dispatch("message/templatePauseOrStart").then(data => {
        this.changePage()
        setTimeout(() => {
        this.loading = false
          
        }, 1000);
      });
    },
    changePage(val) {
      this.loading = true;
      this.templateList.page = val || this.templateList.page;
      this.$store.dispatch("message/templateList").then(data => {
        this.loading = false;
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>

</style>
