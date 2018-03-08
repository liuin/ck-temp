<template>
  <div class="shareWelcome">
    <div class="top"></div>
    <div class="box">
      <div class="img">
        <img :src="code" alt="">
      </div>
      <p class="name">邀请人: {{name}}</p>
    </div>
    <div class="bottom"></div>
  </div>
</template>
<script>
export default {
  name: "shareWelcome",
  data() {
    return {
      code:
        "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
      name: "name"
    };
  },
  created() {
    var code = this.$route.query.code || 23345;
    this.$api.ajax({
      type: "post",
      url: this.$api.url.demo,
      data: {},
      // dataType: "dataType",
      success: data => {
        this.code = data.code || this.code;
        this.name = data.name || this.name;
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
    }
  }
}

.name {
  font-size: 18px;
  color: #c98000;
  text-align: center;
  padding-top: 3px;
}
</style>
