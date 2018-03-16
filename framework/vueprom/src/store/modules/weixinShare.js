const weixinShare = {
  data() {
    return {
      weixinShareUrl: "http://tg.030.cn/shareWelcome?invite_user_code=",
      weixinShareIcon: ""
    }
  },
  created() {
    this.weixinShareUrl = this.weixinShareUrl + this.$store.state.login.invite_code;
    this.checkWx();
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
          data: {
            url: window.location.href
          },
          // dataType: "dataType",
          success: data => {
            this.isWX = true;
            this.$wx.config({
              debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
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

            // wx.ready(function () {
            console.log('ready11');
            // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作。
            //分享到朋友圈
            this.$wx.onMenuShareTimeline({
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
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享到微信朋友
            // console.log(_this.weixinShareUrl);

            this.$wx.onMenuShareAppMessage({
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
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            //分享到QQ
            this.$wx.onMenuShareQQ({
              title: "熊居网", // 分享标题
              desc: "", // 分享描述
              link: _this.weixinShareUrl, // 分享链接，该链接域名必须与当前企业的可信域名一致
              imgUrl: _this.weixinShareIcon, // 分享图标
              success: function () {
                // 用户确认分享后执行的回调函数
                _this.$toast({
                  type: "success",
                  message: "分享成功",
                  duration: 1000
                });
              },
              cancel: function () {
                // 用户取消分享后执行的回调函数
              }
            });
            // });
          }
        });
      } else {
        console.log("不是来自微信内置浏览器");
        this.isWX = false;
      }
    }
  }
}

export {
  weixinShare
}
