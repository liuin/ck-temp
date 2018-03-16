<template>
  <div class="myPoster grebg grebgflex">
    <van-nav-bar title="提成金额" left-arrow @click-left="$router.back()" />
    <div class="bar df-left-right">
      <div class="left">
        <div class="title">
          <span class="active" @click="barListState = !barListState">
            {{activeChoose.label}}
          </span>
          <span class="arrow" :class="sort? 'down': 'up'" @click="sort = !sort"></span>
        </div>
        <transition name="fade">
          <ul class="list" v-if="barListState">
            <li @click="activeChoose = item; barListState= false ; sort = !sort" :class="(activeChoose.value == item.value )? 'active': ''"
              v-for="item in listitme" :key="item.label">{{item.label}}</li>
          </ul>
        </transition>
      </div>
      <div class="right">
        <div class="time" @click="timeState = !timeState">
          时间筛选
          <span class="time-icon"></span>
        </div>
      </div>
    </div>

    <h3 class="title3">个人资金信息:</h3>
    <div class="totle df-left-right">
      <div class="left">
        <p>
          个人冻结提现金额
          <span class="state2">¥{{userDes.active_pull_out_money}}</span>
        </p>

        <p>
          个人可提现金额
          <span class="state2">¥{{userDes.frozen_pull_out_money}}</span>
        </p>
        <p>
          个人已提现金额
          <span class="state2">¥{{userDes.history_pull_out_total || "0.00"}}</span>
        </p>
      </div>
      <div class="right">
        <van-button type="primary" @click="cashDrawState = true">我要提现</van-button>
      </div>
    </div>

    <div class="df-left-right">
      <h3 class="title3">推广员资金信息:</h3>
      <span class="data-cs color2" v-if="time.length>0">筛选日期：({{$moment(time[0]*1000).format('YYYY-MM-DD')}} - {{$moment(time[1]*1000).format('YYYY-MM-DD')}})</span>
    </div>

    <div class="totle df-left-right">
      <div class="left">
        <p v-if="activeChoose.value == 0">
          总冻结提现金额
          <span class="state2">¥{{total.freeze}}</span>
        </p>

        <p v-if="activeChoose.value == 1">
          总可提现金额
          <span class="state2">¥{{total.usable}}</span>
        </p>
      </div>
    </div>
    <van-cell-group class="van-cell-group1">
      <van-pull-refresh v-model="refreshLoading" class="van-pull-refresh1" v-waterfall-lower="waterfallLoad" waterfall-disabled="waterfallLoading"
        waterfall-offset="0">

        <van-cell class="listitme-poster listitme" v-for="item in list" :key="item.id">
          <template slot="title">
            <img @click="$router.push({path:'/personOther', query:{id:item.id}})" :src="(item.avatar!='')? $api.imgdesc(item.avatar): dfImg.dfImgBase64" alt="">
            <span class="name">{{item.nickname || item.username}}</span>
          </template>

          <template v-if="activeChoose.value == 0">
            ¥{{item.frozen_pull_out_money}}
          </template>

          <template v-if="activeChoose.value == 1">
            ¥{{item.active_pull_out_money}}
          </template>

        </van-cell>

        <div class="loadingBottom" v-if="waterfallLoading == true">
          <van-loading type="circle" color="white" />
        </div>
        <div class="enpty" v-if="(list.length == 0) &&(pages == 'end')">
          暂无找到数据
        </div>
      </van-pull-refresh>
    </van-cell-group>

    <TimeChoose @updateTime="updateTime" :timeState.sync="timeState" />


    <CashDraw :cashDrawState.sync="cashDrawState" />

  </div>
</template>
<script>
import TimeChoose from "../components/timeChoose.vue";
import CashDraw from "../components/cashDraw.vue";
import { myPosterState } from "../store/modules/myposter.js";
import { dfImg } from "../store/modules/gloable.js";

// import { weixinShare } from "../store/modules/weixinShare.js";

import { mapState } from "vuex";

export default {
  name: "myPoster",
  components: {
    TimeChoose,
    CashDraw
  },
  computed: {
    ...mapState("login", ["userDes", "userSate"])
  },
  mixins: [myPosterState, dfImg],
  data() {
    return {
      cashDrawState: false,
      time: [],
      total: {
        freeze: 0,
        usable: 0,
        hasGet: 0
      },
      timeState: false,
      sort: true,
      barListState: false,
      activeChoose: {
        label: "冻结提成金额",
        value: 0,
        key: "frozen_push_money"
      },
      listitme: [
        {
          label: "冻结提成金额",
          value: 0,
          key: "frozen_push_money"
        },
        {
          label: "可提现金额",
          value: 1,
          key: "active_push_money"
        }
      ],
      pages: 1,
      list: [],
      waterfallLoading: false,
      refreshLoading: false
    };
  },
  watch: {
    sort(newVal) {
      this.pages = 1;

      this.list = [];
    },
    refreshLoading() {
      this.pages = 1;
      this.list = [];

      setTimeout(() => {
        this.refreshLoading = false;
      }, 300);
    }
  },
  created() {
    this.$store.dispatch("login/getUserDes").then(data => {
      console.log(data);
    });

    this.$api.ajax({
      type: "post",
      url: this.$api.url.userGetAllFrozenMoneyByMe,
      // data: {},
      // dataType: "dataType",
      success: data => {
        this.total.freeze = data.my_promoters_frozen_money;
      }
    });

    this.$api.ajax({
      type: "post",
      url: this.$api.url.userGetAllActiveMoneyByMe,
      // data: {},
      // dataType: "dataType",
      success: data => {
        this.total.usable = data.my_promoters_active_money;
      }
    });
  },
  methods: {
    updateTime(val) {
      // console.log(val);
      this.time = val;
      this.pages = 1;
      this.list = [];
      // console.log(this.$moment(this.time[0] * 1000).format("YYYY-MM-DD"));
    },
    resetLoad(cb, type) {
      let conditions = {
        register_time: this.time
      };

      var sendDate = {
        conditions: this.time.length > 1 ? JSON.stringify(conditions) : "",
        order_field: this.activeChoose.key,
        order_by: this.sort ? 1 : 2,
        page: this.pages
      };

      this.$api.ajax({
        type: "post",
        url: this.$api.url.userGetPromotersByMe,
        data: sendDate,
        // dataType: "dataType",
        noLoading: true,
        success: data => {
          // this.$store.commit("login/changeToken", "login");
          // this.$router.push("/");
          if (data.list.length == 0) {
            this.pages = "end";
          } else {
            this.pages++;
          }
          if (cb) {
            cb();
          }

          console.log(data);
          // if (type == "waterfallLoading") {
          //   return;
          // } else {
          //   this.pages = 1;
          //   this.waterfallLoading = false;
          // }

          this.list = this.list.concat(data.list);
        }
      });
    },
    waterfallLoad() {
      if (this.pages == "end" || this.waterfallLoading == true) {
        return;
      }
      this.waterfallLoading = true;

      this.resetLoad(() => {
        this.waterfallLoading = false;
      }, "waterfallLoading");
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.bar {
  height: 35px;
  background: #343c5c;
  color: #fff;
  font-size: 14px;
  line-height: 35px;
  .left {
    .title {
      padding-left: 20px;
      .arrow {
        display: inline-block;
        border-left: 4px solid transparent;
        border-top: 6px solid #fff;
        border-right: 4px solid transparent;
        border-bottom: 6px solid transparent;
        position: relative;
        top: 5px;
      }
      .arrow.up {
        transform-origin: center;
        transform: rotate(180deg);
        top: -1px;
      }
    }
  }
  .right {
    .time {
      border-left: 1px solid #fff;
      padding-left: 10px;
      line-height: 18px;
      margin-top: 8px;
      padding-right: 12px;
      .time-icon {
        background: url("../assets/img/choose.png");
        width: 20px;
        height: 20px;
        background-size: 100%;
        display: inline-block;
        vertical-align: middle;
      }
    }
  }
  .list {
    background: #f2f3f5;
    position: absolute;
    color: #4b4d59;
    line-height: 40px;
    width: 100%;
    width: 320px;
    z-index: 10;
    li {
      margin: 0 10px;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      &:last-child {
        border-bottom: 0 solid #000;
      }
      &.active {
        color: #1e96fa;
      }
      &.active:before {
        background: url("../assets/img/current.png");
        width: 11.5px;
        height: 18.5px;
        background-size: 100%;
        content: " ";
        position: absolute;
        right: 0;
        top: 10px;
      }
    }
  }
}

.listitme {
  img {
    width: 35px;
    height: 35px;
    background: #eee;
    vertical-align: middle;
  }
  .name {
    text-overflow: ellipsis;
    display: inline-block;
    width: 180px;
    word-wrap: break-word;
    word-break: break-all;
    white-space: nowrap;
    overflow: hidden;
    vertical-align: middle;
  }
}

.loadingBottom {
  padding-top: 10px;
  text-align: center;
  margin: 0 auto;
  width: 20px;
  padding-bottom: 10px;
}

.state2 {
  color: #f44;
}

.state1 {
  color: #1e96fa;
}

.totle {
  background: #fff;
  padding-top: 5px;
  line-height: 20px;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 5px;
  font-size: 14px;
  .left {
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 25px;
    p {
      margin: 0;
    }
  }
  .right {
    padding-top: 20px;
    padding-left: 15px;
    border-left: 1px solid #eee;
  }
}

.enpty {
  padding-top: 10px;
  font-size: 14px;
  color: #666;
  text-align: center;
}

.title3 {
  padding: 0 10px;
  line-height: 40px;
  margin-bottom: 0;
}
.data-cs {
  line-height: 40px;
  padding-right: 10px;
}
</style>
