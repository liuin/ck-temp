<template>
  <div class="user-driver-lable">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user/driverList' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>需求方标签</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="line3"></div>
  
    <el-row type="flex" justify="space-between">
      <el-col :span="12">
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item >
            <el-input  placeholder="手机号码"></el-input>
          </el-form-item>
          <el-form-item >
            <el-button type="primary" icon="el-icon-search">查　询</el-button>
          </el-form-item>
        </el-form>
      </el-col>

      <el-col :span="3">
        <el-button type="primary" @click="dialogVisible = true" class="btn-new" icon="el-icon-edit">新建标签</el-button>
      </el-col>
    </el-row>

    <div class="line3"></div>

    <el-row type="flex" :gutter="20" justify="space-between">
      <el-col :span="17">

      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class="el-icon-info"></i>&nbsp;<span>全部需求方用户</span>        
        </div>
        <el-popover ref="popover1"  placement="top" class="popover1"  width="425"  v-model="visible1">
         <div class="checkbox-box">
           <el-checkbox>标签一</el-checkbox><el-checkbox>标签二</el-checkbox>
           <el-checkbox>标签一签一</el-checkbox><el-checkbox>标签二标签二</el-checkbox>
           <el-checkbox>标签一</el-checkbox><el-checkbox>标签二sdf</el-checkbox>
           <el-checkbox>标签一</el-checkbox><el-checkbox>标签二fdf</el-checkbox>
         </div>
         <div class="line2"></div>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible1 = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visible1 = false">确定</el-button>
          </div>
        </el-popover>
        <div class="hd"><el-checkbox>全选</el-checkbox>&nbsp;&nbsp;&nbsp;<el-button size="mini" v-popover:popover1>选择标签</el-button></div>
        <div class="line1"></div>
        <el-table  width="100%"  :data="[{},{}]" :show-header="false" >
            <el-table-column prop="" label="" width="25">
              <template slot-scope="scope">
                <el-checkbox></el-checkbox>
              </template>
            </el-table-column>      
            <el-table-column prop="" label="" width="70">
              <template slot-scope="scope">
                <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="width:50px; height:50px; background:#eee;display:block;" alt="" />
              </template>
            </el-table-column>      
            <el-table-column prop="" label="" width="100">
              <template slot-scope="scope">
                姓名 : XXX  <br />
                标签一
              </template>
            </el-table-column>      
            <el-table-column prop="" label="" width="200" >
              <template slot-scope="scope">
                手机号码 : 1243959559
              </template>
            </el-table-column>       
            <el-table-column prop="" label=""  >
              <template slot-scope="scope">
                所属城市 : 广州
              </template>
            </el-table-column>       
        </el-table>
        <pnation :total.number="10" :size.number="7"></pnation>
      </el-card>    

      </el-col>
      <el-col :span="7">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <i class="el-icon-info"></i>&nbsp;<span>全部(130)</span>        
          </div>          
          <ul class="list">
            <li>标签一 (10)</li>
            <li>标签二 (30)</li>
          </ul> 
        </el-card>  
      </el-col>
    </el-row>

<el-dialog
  title=""
  :visible.sync="dialogVisible"
  width="20%"
  >
  <h3 class="title">标签名称</h3>  
  <el-input></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>


  </div>
</template>

<script>
  import pnation from '@/components/pnation'

  export default {
    name: '',
    data() {
      return {
        visible1:false,
        dialogVisible: false
      }
    },
    components:{
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
  .title{margin:0; font-weight:normal; border-bottom: 1px solid #eee; padding-bottom:10px; font-size:16px;}
  .checkbox-box{overflow:hidden;
    label{display:inline-block; width: 100px;float:left; padding: 0 10px; margin:0 10px; height: 25px; overflow:hidden; 
    /* text-overflow: ellipsis; */}  
  }
  
  .btn-new {display:block;margin-left:auto;}
  .list {font-size:14px; line-height:30px;
    li {cursor:pointer;padding: 0 10px;
      &:hover {background:#f5f7fa;}
    }
  }
</style>