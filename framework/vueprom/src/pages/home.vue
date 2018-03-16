<template>
  <div class="home grebg">
    <div class="topbox">
      <div class="img">
        <img :src="(userDes.avatar == '') ? userImgDf :userDes.avatar+'!desc' " alt="">
      </div>
      <div class="des">
        <div class="d1">{{userDes.nickname || "用户名"}}</div>
        <span class="item">账户：{{userDes.username}}</span>
        <span class="item">邀请码：{{userDes.invite_code}}</span>
        <van-button  class="btn-share" @click="shareBtn" type="primary" size="small">分享到微信</van-button>
        <!-- <div class="share">分享到微信</div> -->
      </div>
    </div>
    <div class="line1"></div>

    <van-cell-group v-if="userDes !=''">
      <van-cell title="注册日期" :value="(userDes.create_time!='')? ($moment(userDes.create_time*1000).format('YYYY-MM-DD'))  : ''" />
      <van-cell>
        <template slot="title">
          <span class="van-cell-text">账户状态</span>
        </template>
        <template>
          <span class="van-cell-text">
            <van-button type="primary" size="small">{{userSate[userDes.state]}}</van-button>
            <van-button type="danger" @click="loginOut()" size="small">退出登录</van-button>
          </span>
        </template>
      </van-cell>
    </van-cell-group>
    <div class="line1"></div>
    <ul class="list">
      <!-- <li @click="$router.push('fdsf')">
        <img src="../assets/img/order.png" alt="">
        <p>订单数量</p>
      </li> -->
      <li @click="$router.push('/customers')">
        <img src="../assets/img/customers.png" alt="">
        <p>客户数量</p>
      </li>
      <li @click="$router.push('/money')">
        <img src="../assets/img/money.png" alt="">
        <p>提成金额</p>
      </li>
      <li @click="$router.push('/code')">
        <img src="../assets/img/code.png" alt="">
        <p>推广二维码</p>
      </li>
      <li @click="$router.push('/myPoster')">
        <img src="../assets/img/myPoster.png" alt="">
        <p>我的推广员</p>
      </li>
      <li @click="$router.push('/person')">
        <img src="../assets/img/person.png" alt="">
        <p>个人资料</p>
      </li>
    </ul>


  </div>
</template>
<script>
import { mapState } from "vuex";
// import { weixinShare } from "../store/modules/weixinShare.js";
import wx from "weixin-js-sdk";

export default {
  name: "home",
  data() {
    return {
      data: {
        img:
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
        d1: "积极向上的二狗",
        number: "18080888888",
        code: "VNMCKF",
        regdate: "2012-09-25"
      },
      weixinShareUrl: "http://tg.030.cn/shareWelcome?invite_user_code=",
      weixinShareIcon: "http://imgdev.030.cn/common/default.jpg!desc",
      userImgDf:
        "data:image/png;base64,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",
      state: "审核",
      isWx: false
    };
  },
  // mixins: [weixinShare],
  computed: {
    ...mapState("login", ["userDes", "userSate"])
  },
  created() {
    this.$store.dispatch("login/getUserDes").then(data => {
      this.weixinShareUrl = this.weixinShareUrl + this.userDes.invite_code;
      this.checkWx();
    });
  },
  methods: {
    shareBtn() {
      if (this.isWx) {
        this.$toast({
          // type: "success",
          message: "请点击右上角分享链接",
          duration: 1000
        });
      } else {
        this.$toast({
          // type: "success",
          message: "请用微信打开右上角分享链接",
          duration: 1000
        });
      }
    },
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
          data: {
            url: window.location.href
          },
          // dataType: "dataType",
          success: data => {
            // console.log("11111");
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
              console.log("readywx");
              // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作。
              //分享到朋友圈
              wx.onMenuShareTimeline({
                title: "熊居网", // 分享标题o
                link: _this.weixinShareUrl, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: _this.weixinShareIcon, // 分享图标
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
              // console.log(_this.weixinShareUrl);

              wx.onMenuShareAppMessage({
                title: "熊居网", // 分享标题
                desc: "推广员系统", // 分享描述
                link: _this.weixinShareUrl, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: _this.weixinShareIcon, // 分享图标
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
                link: _this.weixinShareUrl, // 分享链接，该链接域名必须与当前企业的可信域名一致
                imgUrl: _this.weixinShareIcon, // 分享图标
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
    loginOut() {
      this.$api.ajax({
        type: "post",
        url: this.$api.url.tokenDestroy,
        data: {},

        // dataType: "dataType",
        result: data => {
          this.$store.commit("login/changeToken", "");
          this.$store.commit("login/changeUserInfo", "");
          this.$store.commit("login/changeUserDes", "");

          // localStorage.setItem("username", "");
          // localStorage.setItem("password", "");

          sessionStorage.setItem("loingOut", "true");

          this.$toast({
            // type: "success",
            message: "退出成功",
            duration: 1000
          });

          this.$router.push("/login");
        }
      });
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.topbox {
  padding: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  background-image: -webkit-linear-gradient(top, #404663, #2f354f);
  .img {
    margin-right: 5px;
    img {
      border-radius: 50%;
      width: 60px;
      height: 60px;
      background: #eee;
    }
  }
  .des {
    font-size: 16px;
    .d1 {
      color: #fff;
      margin-bottom: 10px;
      padding-top: 5px;
    }
    .item {
      font-size: 12px;
      color: #b3c2f5;
      display: inline-block;
      padding: 3px 5px;
      background: #4b577a;
    }
  }
}
.list {
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  li {
    box-sizing: border-box;
    border-right: 1px solid #ebebeb;
    border-bottom: 1px solid #ebebeb;
    width: 50%;
    text-align: center;
    padding-top: 10px;
    p {
      margin-top: 5px;
      margin-bottom: 0;
      padding-bottom: 5px;
      font-size: 14px;
    }
    img {
      width: 50px;
    }
    &:nth-child(2n) {
      border-right: 0 solid #000;
    }
  }
}
.btn-share {
  padding: 0 10px;
  background: #4b0;
  border: 1px solid #0a0;
  position: fixed;
  right: 10px;
  top: 10px;
}
</style>
