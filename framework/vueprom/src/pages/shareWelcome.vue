<template>
  <div class="shareWelcome">
    <div class="top"></div>
    <div class="box">
      <div class="img">
        <img :src="code" alt="">
      </div>
      <p class="name">邀请码: {{name}}</p>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
export default {
  name: "shareWelcome",
  data() {
    return {
      code: "http://imgdev.030.cn/common/default.jpg!desc",
      name: "name"
    };
  },
  created() {
    // this.name = this.$route.query.invite_user_code || "0000";
    this.name = this.$route.query.invite_user_code || "0000";
    this.$api.ajax({
      type: "post",
      url: this.$api.url.userGetInviteQrCode,
      // dataType: "dataType",
      data: { invite_user_code: this.$route.query.invite_user_code },
      success: data => {
        this.code = data.invite_qr_code + "!desc" || this.code;
      }
    });
  },
  methods: {},
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.shareWelcome {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
  .top,
  .bottom {
    flex: 1;
    width: 100%;
  }
  .bottom {
    background: url("../assets/img/codeliinkbg-rp.jpg");
    width: 320px;
    height: 6px;
    background-repeat: repeat-y;
    background-size: 100%;
  }
}

.boxwrap {
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
}

.box {
  background: url("../assets/img/codeliinkbg.jpg");
  background-repeat: no-repeat;
  width: 320px;
  height: 514px;
  background-size: 100%;
  .img {
    padding-top: 277px;
    text-align: center;
    img {
      width: 162px;
      height: 162px;
      background: #eee;
      display: block;
      margin: 0 auto;
    }
  }
}

.name {
  font-size: 18px;
  color: #c98000;
  text-align: center;
  padding-top: 7px;
}
</style>
