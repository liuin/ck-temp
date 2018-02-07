<template>
  <div class="personPwd">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>
    <el-form label-width="100px" class="changelogin">
      <el-form-item label="原密码" prop="username">
        <el-input type="password" v-model="changePwd.old_password"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码"  prop="pwd">
        <el-input type="password" v-model="changePwd.new_password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认新密码" prop="pwd">
        <el-input type="password" v-model="changePwd.re_new_password"  auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form> 
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    name: '',
    data() {
      return {
        
      }
    },
    created() {
    },
    computed:{
      ...mapState('admin', ['changePwd'])
    },
    methods: {      
      submit(){
        console.log(this.changePwd);
        this.$store.dispatch('admin/changePwd', this.changePwd).then(data=>{
            this.$alert('修改成功', '', {
              confirmButtonText: '确定',
              type: 'success',
              callback: action => {
                this.$router.back();
              }
            });
        })
      }
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
  .changelogin{width: 300px;}
</style>