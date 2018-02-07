<template>
  <div class="user-driver-list-etail">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/driverList' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>需求方详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line3"></div>    

     <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>基本信息</span>            
      </div>
      <el-row :gutter="100" class="ct" type="flex">
         <el-col :span="8" >
            <div class="flex-leftright"><span class="c1">ID: </span><span>XXXXX</span></div>
            <div class="flex-leftright"><span class="c1">手机号: </span><span>123456</span></div>
            <div class="flex-leftright"><span class="c1">所属平台: </span><span>灯网</span></div>
         </el-col>
         <el-col :span="8" :offset="1">
            <div class="flex-leftright">&nbsp;</div>
            <div class="flex-leftright"><span class="c1">注册时间: </span><span>2000-10-17</span></div>     
            <div class="flex-leftright"><span class="c1">平台绑定的ID: </span><span>18823201010</span></div>
         </el-col>        
      </el-row>
    </el-card>
    <div class="line3"></div>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <i class="el-icon-info"></i>　<span>地址信息</span>            
      </div>
      <div class="ct">
        <p class="p1">收货地信息</p>
        <el-table  width="100%"  :data="[{},{}]"  >
            <el-table-column prop="" label="联系人(公司)" ></el-table-column>      
            <el-table-column prop="" label="联系电话" ></el-table-column>      
            <el-table-column prop="" label="经纬度" ></el-table-column>      
            <el-table-column prop="" label="收货地地址"  ></el-table-column>                  
          </el-table> 
      </div>      
      <div class="line2"></div>
      <div class="ct">
        <p class="p1">目的地信息</p>
        <el-table  width="100%"  :data="[{},{}]"  >
            <el-table-column prop="" label="物流园" ></el-table-column>      
            <el-table-column prop="" label="物流名称" ></el-table-column>      
            <el-table-column prop="" label="联系电话" ></el-table-column>      
            <el-table-column prop="" label="目的地地址"  ></el-table-column>                  
          </el-table> 

      </div>
      
    </el-card>
    <div class="line3"></div>


  

  </div>
</template>

<script>

  export default {
    name: '',
    data() {
      return {
        dialog: false
      }
    },
    created() {
      this.$store.commit('setState',[{defaultActive: '/user/neederList'}, this.$store.state.leftMenu])
    },
    methods: {      
      change(){
        this.dialog = false
      }
    },
    mounted:function(){
      
    }
  }
</script>

<style lang="less" scoped>
  .btn-change{margin-left:10px;}
</style>