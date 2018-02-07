<template>
  <div class="system-account-add">
    <div class="line2"></div>

  <el-form class="form" label-position="right" label-width="80px" :model="create">


  <el-row :gutter="20">
    <el-col :span="12" >
 <div class="box box-base" v-loading="$store.state.ajaxLoad">
    <h3 class="title3">基本信息</h3>          
        <el-form-item label="角色名">
          <el-input v-model="create.title"></el-input>
        </el-form-item>             
      <el-form-item label="状态">
          <el-radio v-model="create.state" :label="1">可用</el-radio>
          <el-radio v-model="create.state" :label="0">不可用</el-radio>
      </el-form-item>
     
    </div>     
    </el-col>
    <el-col :span="12" >
  <div class="box" v-loading="$store.state.ajaxLoad">
      <h3 class="title3">选择权限</h3>
      <el-tabs type="border-card" value="用户管理"  @tab-click="handleClick" v-loading="_.isEmpty(authorityList)">
      
      <el-tab-pane  v-for="(item,index) in authorityList" :name="item.title" :key="item.id" :label="item.title">
<!--         <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">{{item.title}}</el-checkbox> -->
        <template v-for="itemSub in item.sub">          
          <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">{{itemSub.title}}</el-checkbox>  
          <div class="line1"></div>
          <el-checkbox-group >
            <el-checkbox  label="2" >审核</el-checkbox>
            <el-checkbox label="5" >删除</el-checkbox>
          </el-checkbox-group>        
          <div class="line2"></div>
        </template>
        


      </el-tab-pane>
       

<!--       <el-tab-pane label="用户管理" name="first" > -->
<!--         <el-checkbox-group > -->
<!--           <el-checkbox  label="2" >审核</el-checkbox> -->
<!--           <el-checkbox label="5" >删除</el-checkbox> -->
<!--         </el-checkbox-group> -->
<!--       </el-tab-pane> -->
<!--       <el-tab-pane label="订单管理" name="second"> -->
<!--         <el-checkbox :indeterminate="true"  @change="handleCheckAllChange">用户管理</el-checkbox>         -->
<!--         <el-checkbox-group class="itemgroup" >           -->
<!--           <el-checkbox  label="4" >审核</el-checkbox> -->
<!--           <el-checkbox label="3" >删除</el-checkbox>           -->
<!--         </el-checkbox-group> -->
<!--       </el-tab-pane>  -->
    </el-tabs>
    </div>     
    </el-col>
<!--     <el-col :span="24" v-if="$route.query.edit"> -->
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

    
    <el-button type="primary" class="save-btn" size="medium" @click="onSubmit">{{$route.query.edit? '保存' : '添加'}}</el-button>
    



    
    </el-form>
</div>
</template>

<script>
  import { mapState } from 'vuex'


  export default {
    name: '',
    data() {
      return {
        authorityList: [],
        authorityArr: []
      }
    },
    computed:{
      ...mapState('adminGroup',['create', 'show'])
    },
    created() {
      this.$store.dispatch('leftMenu/listInAccess').then(data=>{
        this.authorityList = data.list
      })

      if (this.$route.query.edit) {
        this.$store.commit('setState', [{'show.id': this.$route.query.edit}, this.$store.state.adminGroup])
        this.$store.dispatch('adminGroup/show')
      }else {
        this.$store.commit('setState', [{'create': {title: "", state: 1}}, this.$store.state.adminGroup])
      }

    },
    methods: {      
      onSubmit(){
        if (this.$route.query.edit) {          
          this.$store.dispatch('adminGroup/update', this.create).then(data=>{
            this.$alert('编辑成功', '', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.back();
              }
            });
          })
        }else {
          this.$store.dispatch('adminGroup/create', this.create).then(data=>{
            this.$alert('添加成功', '', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.back();
              }
            });
          })          
        }





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

  .itemgroup{padding-left:40px;margin-top:10px;margin-bottom:10px;}
  .save-btn{margin-top:20px;}
</style>