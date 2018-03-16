<template>
  <div class="loginbox">
    <van-field v-model="login.username" @blur="$verify.check('username')" v-verify.username="login.username" placeholder="请输入用户名"
      icon="clear" @click-icon="login.username = ''" />
    <label class="van-field__error-message" v-remind="login.username"></label>

    <van-field v-model="login.password" @blur="$verify.check('password')" type="password" placeholder="密码" icon="clear" v-verify.password="login.password"
      @click-icon="login.password = ''" />
    <label class="van-field__error-message" v-remind="login.password"></label>
    <div class="pwd-box df-left-right">
      <van-checkbox v-model="rchecked">记住密码</van-checkbox>
      <div @click="$emit('changeType', 'fgPwd')" class="link">忘记密码</div>
    </div>

    <van-button size="large" class="btn1" @click="submit()">登录</van-button>


  </div>
</template>
<script>
export default {
  name: "loginBox",
  data() {
    return {
      login: {
        username: "",
        password: "",
        checked: true
      },
      rchecked: false
    };
  },
  watch: {
    rchecked(val) {
      this.repwd(val);
    }
  },
  verify: {
    login: {
      username: ["required", "mobile"],
      password: ["required"]
    }
  },
  created() {
    let usernmae = localStorage.getItem("username") || "";
    let password = localStorage.getItem("password") || "";
    if (usernmae == null) {
      this.login.username = "";
      this.login.password = "";
      return;
    }

    if (usernmae != "" || password != "") {
      this.rchecked = true;
      this.login.username = usernmae;
      this.login.password = password;
      if (sessionStorage.getItem("loingOut") == "true") {
      } else {
        this.submit();
      }
    }
  },
  methods: {
    repwd(val) {
      if (val == true) {
        localStorage.setItem("username", this.login.username);
        localStorage.setItem("password", this.login.password);
      } else {
        localStorage.setItem("username", "");
        localStorage.setItem("password", "");
      }
    },
    blur() {
      console.log("fdfd");
    },
    submit() {
      if (this.$verify.check()) {
        const sendDate = {
          username: this.login.username,
          password: this.login.password
        };
        this.$api.ajax({
          type: "post",
          url: this.$api.url.tokenGet,
          data: sendDate,
          // dataType: "dataType",
          success: data => {
            this.repwd(this.rchecked);
            this.$store.commit("login/changeToken", data.token);
            this.$store.commit("login/changeUserInfo", data);
            this.$router.push("/");
          }
        });
      }
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.loginbox {
  font-size: 20px;
}

.pwd-box {
  color: #999;

  padding-top: 0px;
  padding-bottom: 10px;
  font-size: 12px;
  line-height: 35px;
  .link {
    color: #999;
  }
}

.btn1 {
  margin-top: 40px;
}
</style>
