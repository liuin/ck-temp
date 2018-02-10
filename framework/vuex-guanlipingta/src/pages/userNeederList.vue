<template>
  <div class="user-driver-list">
      
  


<div class="box">
      <el-form label-width="80px">
        <el-row :gutter="10">
          <el-col :span="8" >
            <el-form-item label="ID">
              <el-input v-model="list.id"></el-input>
            </el-form-item>
          </el-col>
         

          <el-col :span="8">
            <el-form-item label="手机号">
              <el-input v-model="list.mobile"></el-input>
            </el-form-item>
          </el-col>         
         
         
     
          <el-col :span="12">
            <el-form-item label="注册时间">
              <el-date-picker v-model="list.created" style="width:100%" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="">
               <el-button icon="el-icon-search" @click="seach()" class="btn-save" type="primary">查　询</el-button>
            </el-form-item>
          </el-col>
         </el-row>

      </el-form>

      <div class="line3"></div>
          <el-table border   :data="searchDate" >
            <el-table-column prop="id" label="ID" ></el-table-column>      
            <el-table-column prop="mobile" label="手机号" ></el-table-column>      
            <el-table-column prop="created" label="注册时间"> 
              <template slot-scope="scope">
                {{api.toTime(scope.row.created)}}
              </template>
            </el-table-column>             
            <el-table-column  label="操作"  width="200">
              <template slot-scope="scope">
                <el-button @click="$router.push({path: '/user/neederListDetail', query: {id: scope.row.id}})">查看详情</el-button>
                <el-button @click="$router.push({path: '/order/list', query: {maker_id: scope.row.id, maker_mobile: scope.row.mobile}})">查看订单</el-button>
                <!-- <router-link :to=""></router-link> -->
                <!-- <router-link :to="{path: '/order/list', query: {maker_id: scope.row.id, maker_mobile: scope.row.mobile}}"></router-link> -->
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
    ...mapState("maker", ["list", "pager"]),
    ...mapGetters("maker", ["conditions"])
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

      this.$store.dispatch("maker/list", sendDate).then(data => {
        this.listTotal = data.list_total || this.listTotal;
        this.searchDate = data.list;
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>

</style>