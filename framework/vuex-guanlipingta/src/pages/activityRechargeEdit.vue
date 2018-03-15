<template>
  <div class="activity-recharge-add">
        
    <div class="box">
      <el-form label-position="right" label-width="120px">
        <el-form-item label="活动名称">
          <el-input v-model="activityUpdate.title"></el-input>
        </el-form-item>

  
        <el-form-item label="活动时间">
          <el-date-picker
            v-model="activityUpdateTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
  
        <el-form-item label="活动规则">          
          <el-table border class="table-add"    :data="activityUpdateRules"  >
            <el-table-column prop="id" label="充值金额(元)" >
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.done" type="number"></el-input>
              </template>
            </el-table-column>      
            <el-table-column prop="" label="赠送金额(元)" >
              <template slot-scope="scope">
                <el-input v-model.number="scope.row.money" type="number"></el-input>
              </template>
            </el-table-column>      
            <el-table-column prop="" label="操作" ><template slot-scope="scope">
                 <delBtn @del="del(scope.$index)"></delBtn>
              </template>
            </el-table-column>  
          </el-table> 
          <div class="line1"></div>
          <el-button @click="addRow()" type="primary" class="add-btn" >新增</el-button>
        </el-form-item>
  
  
        <el-form-item label="" style="margin-bottom:0">
          <el-button size="medium" type="primary" @click="activityUpdateCall(type)">保存</el-button>
        </el-form-item>
    
      </el-form>
    </div>    

  </div>
</template>

<script>
import { activityUpdate, activityShow } from "../store/modules/activity.js";

export default {
  name: "activityRechargeEdit",
  mixins: [activityUpdate, activityShow],
  data() {
    return {
      type: 1
    };
  },
  created() {
    this.activityShow.id = this.$route.query.id;
    this.activityShowCall(this.type).then(data => {
      for (const key in this.activityUpdate) {
        if (this.activityShowRes.hasOwnProperty(key)) {
          this.activityUpdate[key] = this.activityShowRes[key];
        }
      }
      console.log(this.activityUpdate);
      this.activityUpdateRules = this.activityUpdate.rules.rules;
    });
  },
  watch: {},
  methods: {
    addRow() {
      this.activityUpdateRules.push({
        done: "",
        money: ""
      });
    },
    del(index) {
      this.activityUpdateRules.splice(index);
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.table-add {
  width: 500px;
}
.add-btn {
  display: block;
  margin-left: 445px;
}
</style>