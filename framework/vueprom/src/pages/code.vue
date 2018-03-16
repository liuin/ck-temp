<template>
  <div class="code">
    <van-nav-bar title="推广二维码" left-arrow @click-left="$router.back()" />

    <div class="img">
      <img :src="code" alt="" />
    </div>

    <div class="share-title">
      <div class="t1">
        分享至
      </div>
      <div class="hr"></div>
    </div>

    <div class="share">
      <div class="item" @click="wxshare('pengyou')">
        <img src="../assets/img/share-wx.png" alt="">
        <p>微信</p>
      </div>
      <div class="item" @click="wxshare('pengyouquan')">
        <img src="../assets/img/share-peng.png" alt="">
        <p>朋友圈</p>
      </div>
      <!-- <div class="item">
        <a href="http://service.weibo.com/share/share.php?title=url=http%3A%2F%2Flocalhost%3A8080%2Fcode&source=bookmark&appkey=2992571369&pic=&ralateUid=#_loginLayer_1520407301048">
          <img src="../assets/img/share-wb.png" alt="">
          <p>微博</p>
        </a>
      </div> -->
      <div class="item">
        <a :href="'http://service.weibo.com/share/share.php?title=url='+shareLink">
          <img src="../assets/img/share-wb.png" alt="">
          <p>微博</p>
        </a>
      </div>

      <template v-if="isWX">
        <div class="item" @click="wxshare('qq')">
          <img src="../assets/img/share-qq.png" alt="">
          <p>QQ</p>
        </div>
      </template>
      <template v-else>
        <!-- <div class="item">
          <a href="http://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2Flocalhost%3A8080%2Fcode&showcount=0&desc=%E6%8E%A8%E5%B9%BF%E5%91%98%E5%B9%B3%E5%8F%B0&summary=%E6%8E%A8%E5%B9%BF%E5%91%98%E5%B9%B3%E5%8F%B0&title=%E6%8E%A8%E5%B9%BF%E5%91%98%E5%B9%B3%E5%8F%B0&site=jiathis&pics=">
            <img src="../assets/img/share-qq.png" alt="">
            <p>QQ</p>
          </a>
        </div> -->
        <div class="item">
          <a :href="'http://connect.qq.com/widget/shareqq/index.html?url=' + shareLink">
            <img src="../assets/img/share-qq.png" alt="">
            <p>QQ</p>
          </a>
        </div>
      </template>


      <div class="item js-copy">
        <img src="../assets/img/share-copy.png" alt="">
        <p>复制链接</p>
      </div>
      <!-- <div class="item" @click="msg.state = true">
        <img src="../assets/img/share-msg.png" alt="">
        <p>短信</p>
      </div> -->
    </div>


    <van-popup v-model="msg.state"  :overlay="true">
      <div class="msgbox">
        <h3 class="msghd">发送短信</h3>
        <div class="df-left-right">
          <div class="left">
            <van-field v-model="msg.imgCode" placeholder="请输入图形验证" @blur="$verify.check('imgCode')" v-verify.imgCode="msg.imgCode" icon="clear"
              v-verify="msg.imgCode" @click-icon="msg.imgCode = ''" />
            <label class="van-field__error-message" v-remind="msg.imgCode"></label>
  
          </div>
          <div class="right" @click="getImg"><img :src="imgCodeData.captcha_image_content" alt=""></div>  
        </div>  
        <van-field v-model="msg.tel" @blur="$verify.check('tel')"  placeholder="请输入手机号码" icon="clear" v-verify.tel="msg.tel" @click-icon="msg.tel = ''"
        />
        <label class="van-field__error-message" v-remind="msg.tel"></label>
        <div class="line1"></div>
        <van-button size="large" type="primary" @click="onConfirmMsg">提　交</van-button>
        <div class="line1"></div>
      </div>
    </van-popup>



  </div>
</template>
<script>
import Clipboard from "clipboard";

import wx from "weixin-js-sdk";

export default {
  name: "codepage",
  data() {
    return {
      code:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      shareLink: "",
      isWX: true,
      invite_code: "123456",
      msg: {
        state: false,
        tel: "",
        imgCode: ""
      },
      imgCodeData: {
        captcha_key: "captcha_ohd2lYv35esCQfH",
        expired_at: 1520320581,
        captcha_image_content: ""
      }
    };
  },
  verify: {
    msg: {
      imgCode: ["required"],
      tel: ["required", "mobile"]
    }
  },
  created() {
    this.getImg();
    this.$api.ajax({
      type: "post",
      url: this.$api.url.userGetAppQrCode,
      data: { invite_user_code: this.$store.state.login.invite_code },
      // dataType: "dataType",
      success: data => {
        this.code =
          data.app_qr_code + "!desc" ||
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
        // this.shareLink =          configApi + "/shareWelcome?invite_user_code=" + data.invite_code;
        this.invite_code = data.invite_code || this.invite_code;
        this.shareLink =
          "http://www.030.cn" +
          "/download?invite_user_code=" +
          this.invite_code;

        this.checkWx();
      }
    });
  },
  methods: {
    checkWx() {
      function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) == "micromessenger") {
          return true;
        } else {
          return false;
        }
      }
      if (isWeiXin()) {
        // if (true) {
        this.$api.ajax({
          type: "post",
          url: this.$api.url.wechatGetSign,
          // data: { url: this.$router.url },
          data: { url: window.location.href },
          // dataType: "dataType",
          success: data => {
            this.isWX = true;

            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: data.appId, // 必填，公众号的唯一标识
              timestamp: parseInt(data.timestamp), // 必填，生成签名的时间戳
              nonceStr: data.nonceStr, // 必填，生成签名的随机串
              signature: data.signature, // 必填，签名，见附录1
              jsApiList: [
                "onMenuShareTimeline",
                "onMenuShareAppMessage",
                "onMenuShareQQ"
              ] // 必填，需要使用的JS接口列表
            });

            var _this = this;

            wx.ready(function() {
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作。
              //分享到朋友圈
              wx.onMenuShareTimeline({
                title: "熊居网", // 分享标题o
                link: _this.shareLink, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: _this.code, // 分享图标
                success: () => {
                  // 用户确认分享后执行的回调函数
                  _this.$toast({
                    type: "success",
                    message: "分享成功",
                    duration: 1000
                  });
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              });
              //分享到微信朋友
              // console.log(_this.shareLink);

              wx.onMenuShareAppMessage({
                title: "熊居网", // 分享标题
                desc: "推广员系统", // 分享描述
                link: _this.shareLink, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: _this.code, // 分享图标
                type: "", // 分享类型,music、video或link，不填默认为link
                dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
                success: () => {
                  // 用户确认分享后执行的回调函数
                  _this.$toast({
                    type: "success",
                    message: "分享成功",
                    duration: 1000
                  });
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              });
              //分享到QQ
              wx.onMenuShareQQ({
                title: "熊居网", // 分享标题
                desc: "", // 分享描述
                link: _this.shareLink, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: _this.code, // 分享图标
                success: function() {
                  // 用户确认分享后执行的回调函数
                  _this.$toast({
                    type: "success",
                    message: "分享成功",
                    duration: 1000
                  });
                },
                cancel: function() {
                  // 用户取消分享后执行的回调函数
                }
              });
            });
          }
        });
      } else {
        console.log("不是来自微信内置浏览器");
        this.isWX = false;
      }
    },
    getImg() {
      this.$api.ajax({
        type: "post",
        url: this.$api.url.captchaGet,
        // data: data,
        success: data => {
          this.imgCodeData = data; //获取验证码
          // this.msg.imgCode = data.captcha_image_content; //获取验证码
        }
      });
    },
    wxshare(type) {
      if (this.isWX) {
        this.$toast({
          // type: "success",
          message: "请点击右上角分享链接",
          duration: 1000
        });
      } else {
        this.$toast({
          // type: "success",
          message: "请用微信扫描上面二维码",
          duration: 1000
        });
      }
    },
    onConfirmMsg() {
      if (this.$verify.check()) {
        this.$api.ajax({
          type: "post",
          url: this.$api.url.demo,
          data: {},

          // dataType: "dataType",
          success: data => {
            this.$toast({
              type: "success",
              message: "发送成功",
              duration: 1000
            });
            this.msg.state = false;
          }
        });
      }
    }
  },
  mounted: function() {
    var clipboard = new Clipboard(".js-copy", {
      text: () => {
        this.$toast({
          type: "success",
          message: "复制成功",
          duration: 1000
        });
        return this.shareLink;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.code {
  height: 100%;
  .img {
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    height: 160px;
    img {
      width: 160px;
      height: 160px;
      background: #aaa;
      padding: 5px;
      border: 1px solid #eee;
    }
  }
  .share-title {
    padding-top: 20px;
    font-size: 16px;
    text-align: center;
    margin-bottom: 35px;
    .t1 {
      display: inline-block;
      padding: 0 15px;
      background: #fff;
    }
    .hr {
      border-bottom: 1px solid #ccc;
      margin: 0 30px;
      margin-top: -10px;
    }
  }
  .share {
    display: flex;
    flex-wrap: wrap;
    padding: 0 25px;
    // justify-content: space-around;
    .item {
      text-align: center;
      margin: 0 20px;
      margin-bottom: 10px;
      a {
        color: #76838f;
      }
      img {
        width: 50px;
        height: 50px;
      }
      p {
        margin-top: 5px;
      }
    }
  }
}
.msgbox {
  padding: 15px;
  width: 260px;
}
.msghd {
  text-align: center;
  font-size: 20px;
  font-weight: normal;
  border-bottom: 1px solid #eee;
  padding-bottom: 8px;
}
</style>
