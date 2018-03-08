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
      <div class="item">
        <a href="http://service.weibo.com/share/share.php?title=%E6%8E%A8%E5%B9%BF%E5%91%98%E5%B9%B3%E5%8F%B0%20&url=http%3A%2F%2Flocalhost%3A8080%2Fcode&source=bookmark&appkey=2992571369&pic=&ralateUid=#_loginLayer_1520407301048">
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
        <div class="item">
          <a href="http://connect.qq.com/widget/shareqq/index.html?url=http%3A%2F%2Flocalhost%3A8080%2Fcode&showcount=0&desc=%E6%8E%A8%E5%B9%BF%E5%91%98%E5%B9%B3%E5%8F%B0&summary=%E6%8E%A8%E5%B9%BF%E5%91%98%E5%B9%B3%E5%8F%B0&title=%E6%8E%A8%E5%B9%BF%E5%91%98%E5%B9%B3%E5%8F%B0&site=jiathis&pics=">
            <img src="../assets/img/share-qq.png" alt="">
            <p>QQ</p>
          </a>
        </div>
      </template>


      <div class="item js-copy">
        <img src="../assets/img/share-copy.png" alt="">
        <p>复制链接</p>
      </div>
      <div class="item" @click="shareMsg()">
        <img src="../assets/img/share-msg.png" alt="">
        <p>短信</p>
      </div>
    </div>

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
      shareLink: "shareUrl",
      isWX: true
    };
  },
  created() {
    this.$api.ajax({
      type: "post",
      url: this.$api.url.demo,
      data: {},
      // dataType: "dataType",
      success: data => {
        this.code = data.code || this.code;
      }
    });

    function isWeiXin() {
      var ua = window.navigator.userAgent.toLowerCase();
      if (ua.match(/MicroMessenger/i) == "micromessenger") {
        return true;
      } else {
        return false;
      }
    }
    if (isWeiXin()) {
      console.log(" 是来自微信内置浏览器");
      this.isWX = true;

      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: "", // 必填，公众号的唯一标识
        timestamp: "", // 必填，生成签名的时间戳
        nonceStr: "", // 必填，生成签名的随机串
        signature: "", // 必填，签名，见附录1
        jsApiList: [] // 必填，需要使用的JS接口列表
      });

      wx.ready(function() {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作。
      });
    } else {
      console.log("不是来自微信内置浏览器");
      this.isWX = false;
    }
  },
  methods: {
    wxshare(type) {
      if (this.isWX) {
        if (type == "pengyou") {
          //分享到微信朋友
          wx.onMenuShareAppMessage({
            title: "", // 分享标题
            desc: "", // 分享描述
            link: "", // 分享链接，该链接域名必须与当前企业的可信域名一致
            imgUrl: "", // 分享图标
            type: "", // 分享类型,music、video或link，不填默认为link
            dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
        }
        if (type == "pengyouquan") {
          //分享到朋友圈
          wx.onMenuShareTimeline({
            title: "", // 分享标题
            link: "", // 分享链接
            imgUrl: "", // 分享图标
            success: function() {
              // 用户确认分享后执行的回调函数
            },
            cancel: function() {
              // 用户取消分享后执行的回调函数
            }
          });
        }
        //分享到QQ
        wx.onMenuShareQQ({
          title: "", // 分享标题
          desc: "", // 分享描述
          link: "", // 分享链接
          imgUrl: "", // 分享图标
          success: function() {
            // 用户确认分享后执行的回调函数
          },
          cancel: function() {
            // 用户取消分享后执行的回调函数
          }
        });
      } else {
        this.$toast({
          // type: "success",
          message: "请用微信扫描上面二维码",
          duration: 1000
        });
      }
    },
    shareMsg() {
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
        }
      });
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
  .img {
    margin: 0 auto;
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    img {
      width: 160px;
      height: 160px;
      background: #aaa;
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
    justify-content: space-around;
    .item {
      text-align: center;
      margin: 0 10px;
      margin-bottom: 10px;
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
</style>
