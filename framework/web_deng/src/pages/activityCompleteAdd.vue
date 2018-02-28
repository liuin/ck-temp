<template>
  <div class="activity-recharge-add">
    <div class="box">

      <el-form label-position="right" label-width="120px">
        <el-form-item label="活动名称">
          <el-input v-model="activityCreate.title"></el-input>
        </el-form-item>

        <el-form-item label="活动时间">
          <el-date-picker type="daterange" v-model="activityCreateTime" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>


        <el-form-item label="活动类型">
          <el-radio v-model="activityCreateType" label="level">活动期间</el-radio>
          <el-radio v-model="activityCreateType" label="a_day">每天</el-radio>
        </el-form-item>

        <el-form-item label="活动规则">
          <el-table class="table-add" border :data="activityCreateRules">
            <el-table-column prop="id" label="充值金额(元)">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.done" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="" label="赠送金额(元)">
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.money" type="number"></el-input>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
                <delBtn @del="del(scope.$index)"></delBtn>
              </template>
            </el-table-column>
          </el-table>
          <div class="line1"></div>
          <el-button type="primary" class="addbtn" @click="addRow()">新增</el-button>

        </el-form-item>



        <div class="line2"></div>

        <el-form-item label="">
          <el-button size="medium" @click="activityCreateCall(type)" type="primary">保存</el-button>
        </el-form-item>



      </el-form>


    </div>
  </div>
</template>

<script>
import { activityCreate } from "../store/modules/activity.js";

export default {
  name: "",
  mixins: [activityCreate],
  data() {
    return {
      type: 3
    };
  },
  watch: {
    rulesType(newVal) {
      return newVal;
    }
  },
  created() {},
  methods: {
    addRow() {
      this.activityCreateRules.push({
        done: "",
        money: ""
      });
    },
    del(index) {
      this.activityCreateRules.splice(index);
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.table-add {
  width: 500px;
}

.addbtn {
  margin-left: 444px;
}
</style>
