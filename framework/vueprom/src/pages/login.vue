<template>
  <div class="login">
    <div class="top-img">
      <img src="../assets/img/login-pic.png" alt="" width="100%">
      <div class="tag">
        <span @click="type='login'" class="link login-link">登录</span>
        <span @click="type='reg'" class="link reg-link">注册</span>        
      </div>
      <div class="arrow" :class="'arrow-' + type"></div>
    </div>
    <div class="logincontent">
      <template v-if="type=='login'">
        <Login @changeType="changeType" />
      </template>
      <template v-if="type=='fgPwd'" @regsuc="regsuc">
        <FgPwd @regsuc="regsuc" />
      </template>
      <template v-if="type=='reg'">
        <Reg @regsuc="regsuc" />
      </template>
    </div>          

  </div>
</template>
<script>
import Login from "../components/login.vue";
import Reg from "../components/reg.vue";
import FgPwd from "../components/fgPwd.vue";



export default {
  name: "login",
  components: {
    Login,
    Reg,
    FgPwd
  },
  data() {
    return {
      type: "login"
    };
  },
  created() {
    if (
      this.$route.query.invite_user_code &&
      this.$route.query.invite_user_code != ""
    ) {
      this.type = "reg";
    }
  },
  methods: {
    changeType(type) {
      this.type = type;
    },
    regsuc() {
      this.type = "login";
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.logincontent {
  padding: 20px;
}
.tag {
  margin-top: -50px;
  padding-bottom: 10px;
  // display: flex;
  // justify-content: space-around;
  text-align: center;
  .link {
    color: #fff;
    display: inline-block;
    width: 49%;
    font-size: 16px;
  }
}
.top-img {
  position: relative;
  .arrow {
    position: absolute;
    bottom: -23px;
    left: 50%;
    margin-left: -28.8%;
    border-left: 13px solid transparent;
    border-top: 10px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 14px solid #fff;
    height: 0px;
    width: 0px;
    transition: 0.2s;
    &.arrow-reg {
      margin-left: 20.8%;
    }
  }
}
.login {
  height: 100%;
}
</style>
