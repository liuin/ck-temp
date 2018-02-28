<template>
  <div class="activity-recharge-detail">
    <div class="box">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="活动名称">
          {{activityShowRes.title}}
        </el-form-item>

        <el-form-item label="创建时间">
          {{api.toTime(activityShowRes.created)}}
        </el-form-item>

        <el-form-item label="创建者">
          {{activityShowRes.create_user_title}}
        </el-form-item>

        <el-form-item label="活动时间">
          {{api.toTime(activityShowRes.start_time)}}&nbsp;至&nbsp;{{api.toTime(activityShowRes.end_time)}}
        </el-form-item>

        <el-form-item label="活动状态">
          {{activityState[activityShowRes.state]}}
        </el-form-item>

        <el-form-item label="活动规则">
          <div class="line1"></div>
          <el-table border class="table-add" :data="activityShowRes.rules.rules">
            <el-table-column  prop="done" label="充值金额(元)">
            </el-table-column>
            <el-table-column prop="money" label="赠送金额(元)">
            </el-table-column>
          </el-table>

        </el-form-item>

        <div class="line3"></div>

        <!-- <h4>参加列表</h4>
        <el-table border :data="[{id:18821214125},{}]">
          <el-table-column prop="id" label="厂商手机号">

          </el-table-column>

          <el-table-column prop="" label="充值金额">

          </el-table-column>

          <el-table-column prop="" label="赠送金额">

          </el-table-column>

          <el-table-column prop="" label="充值时间">

          </el-table-column>
        </el-table> -->



      </el-form>
    </div>

  </div>
</template>

<script>
import { activityShow, activityState } from "../store/modules/activity.js";

export default {
  name: "activityRechargeDetail",
  data() {
    return {
      type: 1
    };
  },
  mixins: [activityShow, activityState],
  created() {
    this.activityShow.id = this.$route.query.id;
    this.activityShowCall(this.type).then(data => {
      console.log(this.activityShowRes);
    });
  },
  methods: {},
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.table-add {
  width: 500px;
}
</style>
