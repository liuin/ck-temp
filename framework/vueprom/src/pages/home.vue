<template>
  <div class="home grebg">
    <div class="topbox">
      <div class="img">
        <img :src="data.img" alt="">
      </div>
      <div class="des">
        <div class="d1">{{data.d1}}</div>
        <span class="item">{{data.number}}</span>
        <span class="item">邀请码{{data.code}}</span>
      </div>
    </div>
    <div class="line1"></div>

    <van-cell-group>
      <van-cell title="注册日期" :value="data.regdate" />
      <!-- <van-cell title="单元格" value="内容" label="描述信息" /> -->
      <van-cell>
        <template slot="title">
          <span class="van-cell-text">账户状态</span>
        </template>
        <template>
          <span class="van-cell-text">
            <van-button type="primary" size="small">{{state}}</van-button>
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
      state: "审核"
    };
  },
  created() {
    console.log(this.$store.state.login);
  },
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
    margin-right: 10px;
    img {
      border-radius: 50%;
      width: 70px;
      height: 70px;
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
    padding-top: 20px;
    font-size: 17px;
    p {
      margin-top: 10px;
      margin-bottom: 0;
      padding-bottom: 20px;
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
