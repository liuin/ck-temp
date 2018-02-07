<template>
  <div class="system-account">
    <breadcrumb />
    <div class="line3"></div>

    <el-form label-width="80px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="反馈来源">
            <el-select v-model="list.type">
              <el-option value="" label="全部" ></el-option>
              <el-option :key="item" v-for="(item, index) in type" :value="index" :label="item" ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="反馈时间">
            <el-date-picker v-model="list.created" style="width:100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="">
        <el-button icon="el-icon-search" @click="seach" class="btn-save" type="primary">搜　索</el-button>
      </el-form-item>
    </el-form>

    <div class="line3"></div>

    <el-table :data="pager.res">
      <el-table-column prop="" label="反馈人"></el-table-column>
      <el-table-column  label="反馈来源">
        <template slot-scope="scope">
          {{type[scope.row.type]}}
        </template>
      </el-table-column>
      <el-table-column prop="content" label="反馈内容"></el-table-column>
      <el-table-column label="反馈时间">
        <template slot-scope="scope">
          {{api.toTime(scope.row.created)}}
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作">
        <template slot-scope="scope">
          <router-link :to="{path: '/feedback/listDetail', query: {id: scope.row.uid}}">查看详情</router-link>
        </template>
      </el-table-column>
    </el-table>
    <pnation v-if="pager.total!=0" :total="pager.total" @changePage="changePage" :size="pager.count"></pnation>


  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {};
  },
  computed: {
    ...mapState("feedback", ["list", "type", "pager", "state"]),
    ...mapGetters("feedback", ["conditions"])
  },
  created() {
    this.seach();
  },
  methods: {
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

      this.$store.dispatch("feedback/list", sendDate).then(data => {        
        console.log(data);
        this.pager.total = data.list_total || this.pager.total;
        this.pager.res = data.list;
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>

</style>
