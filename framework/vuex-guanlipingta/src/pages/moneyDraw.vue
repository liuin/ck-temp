<template>
  <div class="money-draw">
    <breadcrumb></breadcrumb>

    <div class="line3"></div>

<div class="w1000">
      <el-form label-width="90px">
          <el-row :gutter="10">
            <el-col :span="7" >
              <el-form-item label="司机手机号">
                <el-input></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="状态" label-width="50px">
                <el-select value="1">
                  <el-option value="2"></el-option>
                  <el-option value="1"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="10">
              <el-form-item label="申请时间">
                <el-date-picker
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            
         </el-row>
         
      
              <el-form-item label="">
                 <el-button icon="el-icon-search" class="btn-save" type="primary">搜　索</el-button>
              </el-form-item>
        </el-form>
    </div>

    <div class="line3"></div>
        
        
        <el-table  width="100%"  :data="[{id:18821214125},{}]"  >
            <el-table-column prop="id" label="提现编号" ></el-table-column>      
            <el-table-column prop="" label="司机手机号" ></el-table-column>      
            <el-table-column prop="" label="提现方式" ></el-table-column>      
            <el-table-column prop="" label="提现金额"  ></el-table-column>                  
            <el-table-column prop="" label="申请时间"  ></el-table-column>                  
            <el-table-column prop="" label="状态"  ></el-table-column>                  
            <el-table-column prop="" label="到账时间"  ></el-table-column>            
          </el-table> 
<!--         <pnation :size="7" :total="10"></pnation> -->
        <pnation :size="7" :total="10"></pnation>

  </div>
</template>

<script>

  export default {
    name: '',
    data() {
      return {
        visible1: false        
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
  .btn-edit{display:block; margin-left:auto;}
</style>