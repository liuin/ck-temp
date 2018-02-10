<template>
  <div class="knowledgeCarType">

    <div class="box">
      <el-button type="primary" size="medium" icon="el-icon-edit" @click="$router.push({path: '/knowledge/carTypeAdd'})" class="btn-edit">添加车辆类型</el-button>
      <div class="line2"></div>

      <el-table :data="list.res" border>
        <el-table-column prop="order" label="排序"></el-table-column>
        <el-table-column prop="title" label="车辆类型名称"></el-table-column>
        <el-table-column label="车型图片">
          <template slot-scope="scope">

            <img :src="scope.row.icon" alt="" />
          </template>
        </el-table-column>
        <el-table-column prop="total" label="车型数量"></el-table-column>
        <el-table-column label="平均长宽高（米）">
          <template slot-scope="scope">
            {{scope.row.long}}*{{scope.row.with}}*{{scope.row.high}}
          </template>
        </el-table-column>
        <el-table-column label="平均载重(吨)">
          <template slot-scope="scope">
            {{_.toFinite(scope.row.load/1000)}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="状态">
          <template slot-scope="scope">
            {{state[scope.row.state]}}
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push({path: '/knowledge/carTypeEdit', 'query': {'id': scope.row.id}})">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <pnation :size="list.count" :total="list.total" @changePage="changePage" v-if="list.total>0"></pnation>
    </div>


  </div>
</template>

<script>
  import {
    mapState
  } from "vuex";
  export default {
    name: "",
    data() {
      return {};
    },
    computed: {
      ...mapState("cars", ["list", "state"])
    },
    created() {
      this.load()
    },
    methods: {
      changePage(pager) {
        this.load(pager);
      },
      load(pager) {
        if (pager) {
          var sendData = {
            page: pager,
            count: this.list.count
          };
        } else {
          var sendData = {
            page: this.list.page,
            count: this.list.count,
            total: 1
          };
        }

        this.$store.dispatch("cars/list", sendData).then(data => {
          this.list.res = data.list;
          this.list.total = data.list_total ? data.list_total : this.list.total;
        });
      }
    },
    mounted: function () {}
  };

</script>

<style lang="less" scoped>


</style>
