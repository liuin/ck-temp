<template>  
  <div class="login" >      
    <el-form :model="formLogin" status-icon :rules="rulesLogin" ref="formLogin" label-width="100px" class="formlogin">
      <h2 class="h2">登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" size="medium" v-model="formLogin.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" size="medium" v-model="formLogin.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="submitForm('formLogin')">提交</el-button>
        <el-button size="medium" @click="resetForm('formLogin')">重置</el-button>
      </el-form-item>
    </el-form> 

  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'login',
    data() {
      return {
        isdone: true,
        loading:{

        },
        formLogin: {
          username: '',
          pwd: ''
        },
        rulesLogin: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' },
            { min: 4, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ],
          pwd: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 8, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
    },
    computed:{
      ...mapState('login',['token'])
    },
    methods: {      
      
      submitForm(formName) {


        this.$refs[formName].validate((valid) => {
          if (valid) {
            //提交内容
            const loading = this.$loading({
              lock: true,
              // text: 'Loading',
              // spinner: 'el-icon-loading',
              background: 'rgba(255, 255, 255, 0.7)'
            });

           
            this.$store.dispatch('login/login',{'account':this.formLogin.username,'password':this.formLogin.pwd})
            .then((data)=> {
              this.isdone = false
              
              setTimeout(() => {
                loading.close()
                sessionStorage.setItem('aid', data.aid);
                sessionStorage.setItem('token', data.token);
                this.$store.commit('setState', [{'aid': data.aid}, this.$store.state.login])
                this.$store.commit('login/changeToken',data.token);                
                this.$router.push('/');
              }, 300);                            
            })
            .catch(data => {
              loading.close()
            })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted:function(){
//     console.log(this.$router);
    }
  }
</script>

<style lang="less" scoped>
 .login {display:flex;align-items: center; width: 100%;height: 100%; justify-content: center;
   .formlogin{width: 400px;padding-bottom:100px;}
   .h2{text-align:center;padding-left:50px;font-weight:normal;}
 }
</style>