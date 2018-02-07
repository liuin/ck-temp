<template>
  <div class="operate-driver">
    <breadcrumb></breadcrumb>

    <div class="line3"></div>
    
    <el-select value="1">
      <el-option value="2">选择城市</el-option> 
      <el-option value="3"></el-option> 
    </el-select>

    <div class="line3"></div>

    <el-table  width="100%"  :data="[{id:18821214125},{}]"  >
      <el-table-column prop="id" label="省份" ></el-table-column>      
      <el-table-column prop="" label="城市" ></el-table-column>      
      <el-table-column prop="" label="车辆类型" ></el-table-column>        
    </el-table>    

  </div>
</template>

<script>

  export default {
    name: '',
    data() {
      return {
        
      }
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
  .input1{display:inline-block; width:100px; margin-right:10px;}
  .p1 {margin-bottom:20px;}
</style>