<template>
  <div class="system-account">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>
    <el-form label-width="80px">
      <el-row :gutter="10">
        <el-col :span="8">
          <el-form-item label="评价人">
            <el-input v-model="list.to_commenter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="被评价人">
            <el-input v-model="list.to_be_commenter"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="评价分数">
            <el-select v-model="list.score">
              <el-option :value="item" :label="item + '分'" v-for='(item) in searchData.score' :key="item"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>



      <el-row>
        <el-col :span="12">
          <el-form-item label="评价时间">
            <el-date-picker v-model="list.created" style="width:100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="">
        <el-button icon="el-icon-search" @click="seach" class="btn-save" type="primary">搜　索</el-button>
      </el-form-item>
    </el-form>

    <div class="line3"></div>

    <el-table :data="searchData.list">
      <el-table-column prop="to_be_commenter" label="被评价人"></el-table-column>
      <el-table-column label="评分">
        <template slot-scope="scope">
          {{scope.row.score}}分
        </template>
      </el-table-column>
      <el-table-column prop="content" label="评价内容"></el-table-column>
      <el-table-column prop="to_commenter" label="评价人"></el-table-column>
      <el-table-column prop="order_sn" label="所属订单号"></el-table-column>
      <el-table-column label="评价时间">
        <template slot-scope="scope">
          {{api.toTime(scope.row.created)}}
        </template>
      </el-table-column>
    </el-table>

    <pnation v-if="pager.total!=0" :total="pager.total" @changePage="changePage" :size="pager.count"></pnation>


  </div>
</template>

<script>
  import {
    mapState,
    mapGetters
  } from "vuex";

  export default {
    name: "",
    data() {
      return {};
    },
    computed: {
      ...mapState("comment", ["list", "pager", "searchData"]),
      ...mapGetters("comment", ["conditions"])
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

        this.$store.dispatch("comment/list", sendDate).then(data => {
          console.log(data);
          this.pager.total = data.list_total || this.pager.total;
          this.searchData.list = data.list;
          // this.searchData.list = [{},{}];
        });
      }
    },
    mounted: function () {}
  };

</script>

<style lang="less" scoped>


</style>
