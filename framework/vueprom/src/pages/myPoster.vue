<template>
  <div class="myPoster grebg grebgflex">
    <van-nav-bar title="我的推广员" left-arrow @click-left="$router.back()" />
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
    <div class="df-left-right" v-if="time.length>0">
      <span class="data-cs color2">筛选日期：({{$moment(time[0]*1000).format('YYYY-MM-DD')}} - {{$moment(time[1]*1000).format('YYYY-MM-DD')}})</span>
    </div>

    <van-cell-group class="van-cell-group1">
      <van-pull-refresh v-model="refreshLoading" class="van-pull-refresh1" v-waterfall-lower="waterfallLoad" waterfall-disabled="waterfallLoading"
        waterfall-offset="0">

        <van-cell class="listitme-poster listitme"  v-for="(item,index) in list" :key="item.name">
          <template slot="title">
            <img @click="$router.push({path:'/personOther', query:{id:item.id}})" :src="(item.avatar!='')? $api.imgdesc(item.avatar): dfImg.dfImgBase64" alt="">
            <span class="name">{{item.nickname || item.username}}
              <span v-if="activeChoose.value == 0" :class="'state'+ item.state">({{myPosterState.state[item.state]}})</span>
            </span>
          </template>

          <template v-if="activeChoose.value == 0">

            <van-button size="small" type="danger" @click="actionsheetState=true;actionsheetItem = {item:item,index:index}">修改状态</van-button>
            <!-- <van-button size="small" @click="changeState(item)" v-if="item.state==1"  type="primary" >审核</van-button>
              <van-button size="small" v-if="item.state==2" @click="changeState(item)"  type="danger" >解锁</van-button> -->
          </template>

          <template v-if="activeChoose.value == 1">
            {{item.active_count}}
          </template>

          <template v-if="activeChoose.value == 2">
            {{$moment(item.create_time * 1000).format("YYYY-MM-DD")}}
          </template>

          <!-- <template v-if="activeChoose.value == 3">
              {{item.code}}
            </template>

            <template v-if="activeChoose.value == 4">
              {{item.counter}}
            </template> -->

        </van-cell>
        <div class="loadingBottom" v-if="waterfallLoading == true">
          <van-loading type="circle" color="white" />
        </div>
      </van-pull-refresh>
    </van-cell-group>
    <div class="enpty" v-if="(list.length ==0) &&(pages == 'end')">
      暂无找到数据
    </div>
    <van-actionsheet v-model="actionsheetState" :actions="actions" cancel-text="取消" />
    <TimeChoose @updateTime="updateTime" :timeState.sync="timeState" />
  </div>
</template>
<script>
import TimeChoose from "../components/timeChoose.vue";
import { myPosterState } from "../store/modules/myposter.js";
import { dfImg } from "../store/modules/gloable.js";

// import wx from "weixin-js-sdk";
// import { weixinShare } from "../store/modules/weixinShare.js";

export default {
  name: "myPoster",
  components: {
    TimeChoose
  },
  mixins: [myPosterState, dfImg],

  data() {
    return {
      actionsheetItem: {},
      actionsheetState: false,
      actions: [
        {
          name: "认证中",
          callback: this.changeState,
          type: 1
        },
        {
          name: "已认证",
          callback: this.changeState,
          type: 2
        },
        {
          name: "已锁定",
          callback: this.changeState,
          type: 3
        }
      ],
      time: [],
      timeState: false,
      sort: true,
      barListState: false,
      activeChoose: {
        label: "我的推广员",
        value: 0,
        key: "nickname"
      },
      listitme: [
        {
          label: "我的推广员",
          value: 0,
          key: "nickname"
        },
        {
          label: "活跃度",
          value: 1,
          key: "active_count"
        },
        {
          label: "注册日期",
          value: 2,
          key: "verified_count"
        }
        // {
        //   label: "邀请码",
        //   value: 3
        // },
        // {
        //   label: "认证数量",
        //   value: 4
        // }
      ],
      pages: 1,
      list: [],
      waterfallLoading: false,
      refreshLoading: false
    };
  },
  watch: {
    sort(newVal) {
      // this.resetLoad();
      this.list = [];
      this.pages = 1;
    },
    refreshLoading() {
      // sett
      this.list = [];

      setTimeout(() => {
        this.pages = 1;
        this.refreshLoading = false;
      }, 300);

      // });
    }
  },
  created() {
    this.waterfallLoad();
  },
  methods: {
    changeState(item) {
      if (item.type == this.list[this.actionsheetItem.index].state) {
        this.actionsheetState = false;
        return;
      }

      const sendDate = {
        state: item.type,
        my_promoter_id: this.actionsheetItem.item.id
      };
      this.$api.ajax({
        type: "post",
        url: this.$api.url.userSetMyPromoterState,
        data: sendDate,
        // dataType: "dataType",
        success: data => {
          this.$toast({
            type: "success",
            message: "修改成功",
            duration: 1000
          });
          this.list[this.actionsheetItem.index].state = item.type;
          this.actionsheetState = false;
          // this.actionsheetItem.state = item.type;
        }
      });
    },
    updateTime(val) {
      this.list = [];
      this.pages = 1;
      this.time = val;
      // this.resetLoad();
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
          console.log(this.pages);

          if (data.list.length == 0) {
            this.pages = "end";
          } else {
            this.pages++;
          }
          this.list = this.list.concat(data.list);

          if (cb) {
            cb();
          }
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

.state1 {
  color: #f44;
}

.state2 {
  color: #1e96fa;
}

.enpty {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 200px;
  height: 200px; // background: #666;
  line-height: 200px;
  font-size: 18px;
  color: #666;
  text-align: center;
  border-radius: 10px;
  margin-left: -100px;
  margin-top: -100px;
}

.data-cs {
  line-height: 40px;
  padding-right: 10px;
  padding-left: 10px;
}
</style>
