<template>
  <div class="activity-recharge-detail"><div class="box">
    
      
      
  
      <el-form label-position="right" label-width="120px">
        <el-form-item label="活动名称">
          迎新年，充五百送一百
        </el-form-item>
  
        <el-form-item label="活动时间">
          2018-02-10至 2018-03-10
        </el-form-item>
  
        <el-form-item label="活动状态">
          未开始
        </el-form-item>
  
        <el-form-item label="活动类型">
           活动期间
        </el-form-item>
  
        <el-form-item label="活动规则">       
          <div class="line1"></div>
          <el-table class="table-add"  border  :data="[{id:18821214125},{}]"  >
            <el-table-column prop="id" label="完成单数" >
            </el-table-column>      
            <el-table-column prop="" label="奖励金额" >
            </el-table-column>         
          </el-table> 
  
        </el-form-item>
  
        <div class="line3"></div>
  
        <h4>参加列表</h4>
        <el-table border    :data="[{id:18821214125},{}]"  >
            <el-table-column prop="id" label="厂商手机号" >
              
            </el-table-column>      
  
            <el-table-column prop="" label="充值金额" >
              
            </el-table-column>         
  
            <el-table-column prop="" label="赠送金额" >
              
            </el-table-column>         
  
            <el-table-column prop="" label="充值时间" >
              
            </el-table-column>         
          </el-table> 
    
  
  
      </el-form>    
  
    
  </div></div>
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
  .table-add {width: 500px;}
</style>