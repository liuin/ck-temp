<template>
  <div class="user-driver-list">
    <div class="box box-search">
      <el-form label-width="80px">
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="姓名">
              <el-input v-model="list.driver_name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="车牌号码">
              <el-input v-model="list.plate_number"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="list.mobile"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="邀请人">
              <el-input v-model="list.referee_mobile"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="注册时间">
              <el-date-picker style="width:100%" v-model="list.created" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>


          </el-col>

          <el-col>
            <el-form-item label="">
              <el-button class="btn-save" @click="seach()" :loading="false" icon="el-icon-search" type="primary">查　询</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div class="line3"></div>
      <el-tabs @tab-click="handleClickTab">
        <el-tab-pane label="全部">
        </el-tab-pane>
        <el-tab-pane label="待审核"></el-tab-pane>
        <el-tab-pane label="已冻结"></el-tab-pane>
      </el-tabs>

      <el-table border :data="searchDate">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="driver_name" label="姓名"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="plate_number" label="车牌号码"></el-table-column>
        <el-table-column prop="score" label="评分情况"></el-table-column>
        <el-table-column prop="referee_mobile" label="邀请人"></el-table-column>
        <el-table-column prop="created" label="注册时间" width="150px">
          <template slot-scope="scope">
            {{api.toTime(scope.row.created)}}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="scope">
            {{selectDate[scope.row.state]}}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <stateBtn @changeState="changeState" :selectDate="selectDate" :scope="scope" />&nbsp;&nbsp;
            <router-link :to="{path: '/user/driverListDetail', query: {id: scope.row.id}}">详情</router-link>
          </template>
        </el-table-column>
      </el-table>

      <pnation v-if="listTotal!=0" :total="listTotal" @changePage="changePage" :size="pager.count"></pnation>

    </div>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      searchDate: [],
      listTotal: 0
    };
  },
  computed: {
    ...mapState("driver", ["list", "pager", "selectDate"]),
    ...mapGetters("driver", ["conditions"])
  },
  created() {
    this.seach();
  },
  methods: {
    changeState(val, scope) {
      this.$store
        .dispatch("driver/audit", {
          id: scope.row.id,
          state: _.toInteger(val)
        })
        .then(data => {
          this.searchDate[scope.$index].state = val;
        });
    },
    changePage(pager) {
      this.seach(pager);
    },
    seach(pager) {
      if (pager) {
        var sendDate = {
          conditions: this.conditions,
          page: pager,
          count: this.pager.count
        };
      } else {
        var sendDate = {
          conditions: this.conditions,
          page: this.pager.page,
          count: this.pager.count,
          total: 1
        };
      }

      this.$store.dispatch("driver/list", sendDate).then(data => {
        this.listTotal = data.list_total || this.listTotal;
        this.searchDate = data.list;
      });
    },
    handleClickTab(tab, event) {
      if (tab.index == 0) {
        this.list.state = "";
      }

      if (tab.index == 1) {
        this.list.state = 0;
      }
      if (tab.index == 2) {
        this.list.state = 8;
      }

      this.listTotal = 0;

      this.seach();
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.btn1 {
  margin-right: 10px;
}
</style>
