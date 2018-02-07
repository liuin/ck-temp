<template>
  <div class="system-account">
<!--       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
<!--       <el-breadcrumb-item :to="{ path: '/knowledge/logisticsList' }">知识库管理</el-breadcrumb-item> -->
<!--       <el-breadcrumb-item>物流园列表</el-breadcrumb-item> -->
<!--     </el-breadcrumb> -->
    <breadcrumb></breadcrumb>
    <div class="line3"></div>

    <el-form label-width="80px">
        <el-row :gutter="10">
          <el-col :span="6" >
            <el-form-item label="省份城市">
             <Region :clearable="true" :selected="region" :limitLen="2" @change="regionCahge" />   
            </el-form-item> 
          </el-col>
          <el-col :span="6">
            <el-form-item label="园区名称">
             <el-input v-model="searchData.title"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="状态">
             <el-select v-model="searchData.state">
                <el-option v-for="(item, index) in state" :key="index" :label="item" :value="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
       </el-row>
       
        <el-form-item label="">
               <el-button icon="el-icon-search" @click="search" class="btn-save" type="primary">搜　索</el-button>
            </el-form-item>
      </el-form>

    <div class="line2"></div>
        
        <el-button icon="el-icon-edit" @click="$router.push({path: '/knowledge/logisticsListAdd'})" class="btn-edit">添加物流园</el-button>
        <div class="line2"></div>

        <el-table    :data="list.res"  >
            <el-table-column prop="province_title" label="省份" ></el-table-column>      
            <el-table-column prop="city_title" label="城市" ></el-table-column>      
            <el-table-column prop="title" label="园区名称" ></el-table-column>  
            <el-table-column prop="address" label="具体地址"  ></el-table-column> 
            <el-table-column prop="locations" label="园区区域坐标"  ></el-table-column> 
            <el-table-column prop="state" label="状态"  >
              <template slot-scope="scope">
                {{state[scope.row.state]}}
              </template> 
            </el-table-column> 
            <el-table-column prop="" label="操作">
              <template slot-scope="scope">
<!--                 <el-button v-popover:popover1 size="mini"  type="danger">删除</el-button> -->
                <el-button size="mini" @click="$router.push({path: '/knowledge/logisticsListEdit', 'query': {'id': scope.row.id}})">编辑</el-button>
                
              </template>
            </el-table-column>                  
          </el-table> 
        <pnation v-if="list.total > 0" :total="list.total" @changePage="changePage" :size="list.count"></pnation>        

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "",
  data() {
    return {
      visible1: false,
      province: "",
      city: "",
      region: []
    };
  },

  computed: {
    ...mapState("park", ["list", "state", "searchData"]),
    ...mapGetters("park", ["conditions"])
  },
  created() {
    this.seach();
    //      this.region = [this.searchData.province, this.searchData.city]
    this.region = [this.searchData.province, this.searchData.city];
  },
  methods: {
    regionCahge(arr) {
      this.searchData.province = arr[0];
      this.searchData.city = arr[1];
    },
    search() {
      this.seach();
    },
    changePage(pager) {
      this.seach(pager);
    },
    seach(pager) {
      if (pager) {
        var sendDate = {
          conditions: this.conditions,
          page: pager,
          count: this.list.count
        };
      } else {
        var sendDate = {
          conditions: this.conditions,
          page: this.list.page,
          count: this.list.count,
          total: 1
        };
      }

      this.$store.dispatch("park/list", sendDate).then(data => {
        this.list.total = data.list_total || this.list.total;
        this.list.res = data.list;
      });
    }
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.btn-edit {
  display: block;
}
</style>