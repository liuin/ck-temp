<template>
  <div class="home grebg">
    <van-nav-bar title="客户信息" left-arrow @click-left="$router.back()" />
    <div class="topbox">
      <div class="img">
        <img :src="(personOther.avatar == '') ? dfImg.dfImgBase64 :personOther.avatar+'!desc' " alt="">
      </div>
      <div class="des">
        <div class="d1">{{personOther.nickname || "用户名"}}</div>
        <span class="item">账户：{{personOther.username}}</span>
        <span class="item">邀请码：{{personOther.invite_code}}</span>
      </div>
    </div>
    <div class="line1"></div>

    <van-cell-group v-if="personOther !=''">
      <van-cell title="注册日期" :value="(personOther.create_time!='')? ($moment(userDes.create_time*1000).format('YYYY-MM-DD'))  : ''" />
      <van-cell>
        <template slot="title">
          <span class="van-cell-text">账户状态</span>
        </template>
        <template>
          <span class="van-cell-text">
            <van-button type="primary" size="small">{{userSate[personOther.state]}}</van-button>
            <!-- <van-button type="danger" @click="loginOut()" size="small">退出登录</van-button> -->
          </span>
        </template>
      </van-cell>
      <van-cell title="公司名称" :value="personOther.company" />
      <van-cell title="联系电话" :value="personOther.phone" />
      <van-cell title="电子邮箱" :value="personOther.email" />
    </van-cell-group>
    
    


  </div>
</template>
<script>
import { personOther } from "../store/modules/personOther.js";
import { dfImg } from "../store/modules/gloable.js";
import { mapState } from "vuex";

// import wx from "weixin-js-sdk";
// import { weixinShare } from "../store/modules/weixinShare.js";

export default {
  name: "money",
  computed: {
    ...mapState("login", ["userDes", "userSate"])
  },
  mixins: [personOther, dfImg],
  data() {
    return {};
  },
  created() {},
  methods: {},
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
</style>
