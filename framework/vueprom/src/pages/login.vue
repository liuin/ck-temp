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
  created() {},
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
  display: flex;
  justify-content: space-around;
  .link {
    color: #fff;
    font-size: 16px;
  }
}
.top-img {
  position: relative;
  .arrow {
    position: absolute;
    bottom: -23px;
    left: 65px;
    border-left: 13px solid transparent;
    border-top: 10px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 14px solid #fff;
    height: 0px;
    width: 0px;
    transition: 0.2s;
    &.arrow-reg {
      left: 228px;
    }
  }
}
</style>
