<template>
  <div class="system-account">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>
    <el-button @click="$router.push({path: '/activity/inviteAdd'})">添加活动</el-button>        
    <div class="line2"></div>

    <el-table  width="100%"  :data="[{id:18821214125},{}]"  >
        <el-table-column prop="id" label="活动ID" ></el-table-column>      
        <el-table-column prop="" label="活动名称" ></el-table-column>      
        <el-table-column prop="" label="活动时间" ></el-table-column>  
        <el-table-column prop="" label="活动状态"  ></el-table-column> 
        <el-table-column prop="" label="操作" width="250px">
          <template slot-scope="scope">
            <el-button size="mini">暂停</el-button>
            <el-button size="mini" @click="$router.push({path: '/activity/inviteDetail', 'query': {'id': '123'}})">详情</el-button>
            <el-button size="mini" @click="$router.push({path: '/activity/inviteAdd', 'query': {'edit': '123'}})">编辑</el-button>
          </template>
        </el-table-column>                  
      </el-table> 
      <pnation :size="7" :total="10"></pnation>
        

  </div>
</template>

<script>
  import pnation from '@/components/pnation'

  export default {
    name: '',
    data() {
      return {
        visible1: false        
      }
    },
    components: {
      pnation
    },
    created() {
    },
    methods: {      
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
</style>