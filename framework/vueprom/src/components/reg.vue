<template>
  <div class="loginbox regbox">
    <van-field  v-model="login.invCode" @blur="$verify.check('invCode')" v-verify.invCode="login.invCode" placeholder="请输入邀请码"
       disabled />


    <label class="van-field__error-message" v-remind="login.invCode"></label>

    <van-field v-model="login.username" @blur="$verify.check('username')" v-verify.username="login.username" placeholder="请输入用户名(手机格式)"
      icon="clear" @click-icon="login.username = ''" />
    <label class="van-field__error-message" v-remind="login.username"></label>

    <van-field v-model="login.password" @blur="$verify.check('password')" type="password" placeholder="密码" icon="clear" v-verify.password="login.password"
      @click-icon="login.password = ''" />
    <label class="van-field__error-message" v-remind="login.password"></label>


    <van-field v-model="rpPassword" @blur="$verify.check('rpPassword')" type="password" placeholder="确认新密码" icon="clear" v-verify.rpPassword="rpPassword"
      @click-icon="rpPassword = ''" />
    <label class="van-field__error-message" v-remind="rpPassword"></label>    

    <div class="vd-box df-left-right">
      <div class="code-left">
        <van-field v-model="login.imgCode" placeholder="请输入图形验证" @blur="$verify.check('imgCode')" v-verify.imgCode="login.imgCode" icon="clear"
          v-verify="login.imgCode" @click-icon="login.imgCode = ''" />
        <label class="van-field__error-message" v-remind="login.imgCode"></label>
      </div>
      <div class="sp1 sp1-code img"  @click="getImg"><img v-if="imgCodeData.captcha_image_content != ''" :src="imgCodeData.captcha_image_content"  alt=""></div>
    </div>
    <div class="vd-box df-left-right">
      <div class="code-left">
        <van-field v-model="login.code" placeholder="请输入验证码" @blur="$verify.check('code')" v-verify.code="login.code" icon="clear"
          v-verify="login.code" @click-icon="login.code = ''" />
        <label class="van-field__error-message" v-remind="login.code"></label>
      </div>
      <div class="sp1" @click="getCode">{{(hasCode == 0)? '获取验证码' : '发送成功('+ hasCode + ')' }}</div>
    </div>
    <!-- <div class="pwd-box df-left-right">
      <van-checkbox v-model="login.checked">记住密码</van-checkbox>
      <router-link :to="'/fgPwd'" class="link">忘记密码</router-link>
    </div> -->
    <van-button size="large" class="btn1" @click="submit()">注册</van-button>
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
        code: "",
        invCode: "",
        imgCode: ""
      },
      rpPassword: "",
      hasCode: 0,
      hasImgCode: "",
      imgCodeData: {
        captcha_key: "captcha_ohd2lYv35esCQfH",
        expired_at: 1520320581,
        captcha_image_content: ""
      },
      msgCodeData: {
        sms_code_key: "smsCode_gkNy13npLQa5XHS",
        expired_at: 1520321080
      }
    };
  },
  verify: {
    rpPassword: [
      {
        test: function(val) {
          // console.log(this.hasImgCode);
          if (val == this.login.password) {
            return true;
          } else {
            return false;
          }
        },
        message: "两次密码不对"
      }
    ],
    login: {
      invCode: ["required"],
      imgCode: [
        "required"
        // {
        //   test: function(val) {
        //     // console.log(this.hasImgCode);
        //     if (val == this.hasImgCode) {
        //       return true;
        //     } else {
        //       return false;
        //     }
        //   },
        //   message: "图形验证码不对"
        // }
      ],
      username: ["required", "mobile"],
      password: ["required"],
      code: ["required"]
    }
  },
  created() {
    // console.log(this.$route.query.invite_user_code);
    this.login.invCode = this.$route.query.invite_user_code || "";
    this.getImg();
  },
  methods: {
    getImg() {
      this.$api.ajax({
        type: "post",
        url: this.$api.url.captchaGet,
        // data: data,
        success: data => {
          this.imgCodeData = data; //获取验证码
        }
      });
    },
    countCode() {
      this.hasCode = 60;
      let timer = setInterval(() => {
        if (this.hasCode > 0) {
          this.hasCode--;
        } else {
          this.hasCode = 0;
          clearInterval(timer);
        }
      }, 1000);
    },
    getCode() {
      if (this.login.imgCode == "") {
        return this.$toast({
          // mask: true,
          message: "请先通过图形验证",
          duration: 1000
        });
      }

      if (this.$verify.check("username") && this.$verify.check("imgCode")) {
        let sendDate = {
          captcha_key: this.imgCodeData.captcha_key,
          captcha_code: this.login.imgCode,
          username: this.login.username
        };

        if (this.hasCode == 0) {
          this.$api.ajax({
            type: "post",
            url: this.$api.url.smsGetCode,
            data: sendDate,
            success: data => {
              this.msgCodeData = data;
              this.countCode();
            }
          });
        }
      }
    },
    submit() {
      if (this.$verify.check()) {
        const sendDate = {
          username: this.login.username,
          password: this.login.password,
          sms_code_key: this.msgCodeData.sms_code_key,
          sms_code: this.login.code,
          invite_user_code: this.login.invCode
        };
        this.$api.ajax({
          type: "post",
          url: this.$api.url.userRegister,
          data: sendDate,
          // dataType: "dataType",
          success: data => {
            this.$toast({
              // mask: true,
              message: "注册成功",
              duration: 1000
            });
            setTimeout(() => {
              this.$emit("regsuc");
            }, 500);
            // this.$router.push("/");
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
  color: #999;
}

.pwd-box {
  color: #999;

  padding-top: 0px;
  padding-bottom: 10px;
  font-size: 12px;
  line-height: 35px;
  a {
    color: #999;
  }
}

.btn1 {
  margin-top: 40px;
}

.vd-box {
  .sp1 {
    display: block;
    line-height: 44px;
    font-size: 14px;
    width: 150px;
    text-align: center;
    white-space: nowrap;
  }
  .sp1-code {
    width: 150px;
    text-align: right;
    img {
      display: block;
    }
  }
  .img {
    img {
      background: #999;
      display: block;
      height: 44px;
      width: 100px;
      margin-left: auto;
    }
  }
}
.code-left {
  width: 168px;
}
</style>
