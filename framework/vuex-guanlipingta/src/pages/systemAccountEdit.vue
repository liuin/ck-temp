<template>
  <div class="system-account-add">
<!--     <el-breadcrumb separator-class="el-icon-arrow-right"> -->
<!--       <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
<!--       <el-breadcrumb-item :to="{ path: '/system/account' }">系统管理</el-breadcrumb-item> -->
<!--       <el-breadcrumb-item :to="{ path: '/system/account' }">账号管理</el-breadcrumb-item> -->
<!--       <el-breadcrumb-item>添加账号</el-breadcrumb-item> -->
<!--     </el-breadcrumb> -->
    <breadcrumb></breadcrumb>

    <div style="margin-top:30px;"></div>
  <el-form class="form" label-position="right" label-width="80px" :model="update">


  <el-row :gutter="20">
    <el-col :xs="24" :md="12" >
 <div class="box box-base">
    <h3 class="title3">基本信息</h3>    
      
        <el-form-item label="用户名">
          <el-input v-model="update.account"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="update.password"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="update.nickname"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="update.mobile"></el-input>
        </el-form-item>
      
      <el-form-item label="状态">
        <el-radio-group v-model="update.state">
          <el-radio :label="1">可用</el-radio>
          <el-radio :label="0">不可用</el-radio>
        </el-radio-group>
      </el-form-item>
     
    </div>     
    </el-col>
    <el-col :xs="24" :md="12" >
  <div class="box">
      <h3 class="title3">权限设置</h3>
      <el-tabs type="border-card" value="first" @tab-click="handleClick">
      <el-tab-pane label="角色" name="first">
        <el-radio-group v-model="update.group_id" >
          <el-radio  class="rolecalss" v-for="item in rolelist" :key="item.id" :label="item.id">{{item.title}}</el-radio>
        </el-radio-group>
      </el-tab-pane>
      <el-tab-pane label="权限" name="second">
        <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">用户管理</el-checkbox>        
        <el-checkbox-group class="itemgroup">          
          <el-checkbox label="审核" ></el-checkbox>
          <el-checkbox label="删除" ></el-checkbox>
          <el-checkbox label="修改" ></el-checkbox>
        </el-checkbox-group>


        <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">订单管理</el-checkbox>        
        <el-checkbox-group class="itemgroup">          
          <el-checkbox label="审核" ></el-checkbox>
          <el-checkbox label="删除" ></el-checkbox>
          <el-checkbox label="修改" ></el-checkbox>
        </el-checkbox-group>

        <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">消息管理</el-checkbox>        
        <el-checkbox-group class="itemgroup">          
          <el-checkbox label="添加" ></el-checkbox>
          <el-checkbox label="编辑" ></el-checkbox>
          <el-checkbox label="推送" ></el-checkbox>
        </el-checkbox-group>

        <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">评价管理</el-checkbox> 


      </el-tab-pane> 
    </el-tabs>
    </div>     
    </el-col>
<!--     <el-col :span="24" v-if="$route.query.eidt"> -->
    <el-col :span="24" v-if="false">
      <div class="box box-time">
      <h3>操作日志</h3>
      <div class="ct">
        <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
        <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
        <p class="p1">2018-01-12 12:12:15 系统 订单201130220100已完成</p>
      </div>      

     
    </div>
    </el-col>
  </el-row>

    
    <el-button type="primary" @click="save" class="save-btn" size="medium">保存</el-button>
    



    
    </el-form>
</div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: '',
    data() {
      return {
        rolelist: []
      }
    },
    computed:{
      ...mapState('admin',['update'])
    },
    created() {
      this.$store.dispatch('adminGroup/list', {count: 100}).then(data=>{
        this.rolelist = data.list
      })

      this.$store.dispatch('admin/show', {id: this.$route.query.id}).then(data=>{
        console.log(data);
      })


    },
    methods: {
      save(){
        
        this.$store.dispatch('admin/update', this.update).then(data=>{
           this.$alert('编辑成功', '', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.back();
              }
            });
        })
      },
      handleClick(){
        
      },
      handleCheckAllChange(){
        
      }
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
  .form{}
  .tab-item{}
  .box{}
  .itemgroup{padding-left:40px;margin-top:10px;margin-bottom:10px;}
  .save-btn{margin-top:20px;}
  .rolecalss{margin-left:20px; width: 140px; margin-bottom:10px;}
</style>