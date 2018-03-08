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
        <ul class="list" v-if="barListState">
          <li @click="activeChoose = item; barListState= false ; sort = !sort" :class="(activeChoose.value == item.value )? 'active': ''"
            v-for="item in listitme" :key="item.label">{{item.label}}</li>
        </ul>
      </div>
      <div class="right">
        <div class="time" @click="timeState = !timeState">
          时间筛选
          <span class="time-icon"></span>
        </div>
      </div>
    </div>

    <div class="totle df-left-right">
      <div class="left">
        <p>
          总冻结提现金额
          <span class="state2">¥{{totle.freeze}}</span>
        </p>

        <p>
          可提现金额
          <span class="state2">¥{{totle.usable}}</span>
        </p>
        <p>
          已提现金额
          <span class="state2">¥{{totle.hasGet}}</span>
        </p>
      </div>
      <div class="right">
        <van-button type="primary" @click="cashDrawState = true">我要提现</van-button>
      </div>
    </div>


    <van-cell-group class="van-cell-group1">
      <van-pull-refresh v-model="refreshLoading" class="van-pull-refresh1" v-waterfall-lower="waterfallLoad" waterfall-disabled="waterfallLoading"
        waterfall-offset="0">

        <van-cell class="listitme-poster listitme" v-for="item in list" :key="item.name">
          <template slot="title">
            <img :src="item.img" alt="">
            <span class="name">{{item.name}}</span>
          </template>

          <template v-if="activeChoose.value == 0">
            ¥{{item.moneyUser}}
          </template>

          <template v-if="activeChoose.value == 1">
            ¥{{item.moneyFreeze}}
          </template>

        </van-cell>

        <div class="loadingBottom" v-if="waterfallLoading == true">
          <van-loading type="circle" color="white" />
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
export default {
  name: "myPoster",
  components: {
    TimeChoose,
    CashDraw
  },
  mixins: [myPosterState],
  data() {
    return {
      cashDrawState: false,
      time: [],
      totle: {
        freeze: 0,
        usable: 0,
        hasGet: 0
      },
      timeState: false,
      sort: true,
      barListState: false,
      activeChoose: {
        label: "冻结提成金额",
        value: 0
      },
      listitme: [
        {
          label: "冻结提成金额",
          value: 0
        },
        {
          label: "可提现金额",
          value: 1
        }
      ],
      pages: 1,
      list: [
        {
          img:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          name: "卡吹1",
          code: 12345678,
          state: 1,
          activeDep: 100,
          regDate: 18020030,
          counter: 1000,
          moneyUser: 100,
          moneyFreeze: 100
        },
        {
          img:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          name: "卡吹2f2",
          code: 12345678,
          state: 2,
          activeDep: 100,
          regDate: 18020030,
          counter: 2000,
          moneyUser: 100,
          moneyFreeze: 100
        },
        {
          img:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          name: "卡吹法第三方ef2",
          code: 12345678,
          state: 0,
          activeDep: 100,
          regDate: 18020030,
          counter: 1000,
          moneyUser: 100,
          moneyFreeze: 100
        }
      ],
      waterfallLoading: false,
      refreshLoading: false
    };
  },
  watch: {
    sort(newVal) {
      this.resetLoad();
      console.log("排列");
    },
    refreshLoading() {
      this.resetLoad(() => {
        this.pages = 0;
        this.refreshLoading = false;
      });
    }
  },
  created() {},
  methods: {
    updateTime(val) {
      console.log(val);
      this.resetLoad();
    },
    resetLoad(cb, type) {
      this.$api.ajax({
        type: "post",
        url: this.$api.url.demo,
        // data: data,
        // dataType: "dataType",
        noLoading: true,
        success: data => {
          // this.$store.commit("login/changeToken", "login");
          // this.$router.push("/");

          if (cb) {
            cb();
          }

          if (type == "waterfallLoading") {
            return;
          } else {
            this.pages = 1;
            this.waterfallLoading = false;
          }
          this.list = [
            {
              img:
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
              name: "卡吹1",
              code: 12345678,
              state: 1,
              activeDep: 100,
              regDate: 18020030,
              counter: 1000,
              moneyUser: 100,
              moneyFreeze: 100
            },
            {
              img:
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
              name: "卡吹2f2",
              code: 12345678,
              state: 2,
              activeDep: 100,
              regDate: 18020030,
              counter: 2000,
              moneyUser: 100,
              moneyFreeze: 100
            },
            {
              img:
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
              name: "卡吹法第三方ef2",
              code: 12345678,
              state: 0,
              activeDep: 100,
              regDate: 18020030,
              counter: 1000,
              moneyUser: 100,
              moneyFreeze: 100
            }
          ];
        }
      });
    },
    waterfallLoad() {
      this.pages++;
      if (this.pages >= 10 || this.waterfallLoading == true) {
        return;
      }
      this.waterfallLoading = true;

      this.resetLoad(() => {
        this.waterfallLoading = false;
        this.list.push({
          img:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          name: "卡吹娜ref1" + this.pages,
          code: 12345678,
          state: 0,
          activeDep: 100,
          regDate: 18020030,
          counter: 1000,
          moneyUser: 100,
          moneyFreeze: 100
        });
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
</style>
