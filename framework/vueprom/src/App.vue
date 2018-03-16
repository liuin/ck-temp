<template>
  <div id="app">
    <keep-alive>
      <transition name="fade">
        <router-view ></router-view>
      </transition>
    </keep-alive>
    <!-- <van-loading v-if="$store.state.ajaxLoad" class="loading" type="circle" color="width" /> -->
    <!-- <van-loading v-if="true" class="loading-g" type="circle" color="width" /> -->
    <!-- <div class="marks" v-if="$store.state.ajaxLoad"> -->
    <transition name="fade">
      <div class="marks" v-if="$store.state.ajaxLoad">
        <div class="van-loading van-loading--circular van-loading--white">
          <span class="van-loading__spinner van-loading__spinner--circular">
            <svg viewBox="25 25 50 50" class="van-loading__circular">
              <circle cx="50" cy="50" r="20" fill="none"></circle>
            </svg>
          </span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import wx from "weixin-js-sdk";
// import { weixinShare } from "./store/modules/weixinShare.js";

export default {
  name: "app"
  // mixins: [weixinShare]
};
</script>

<style scoped lang="less">
.marks {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.21);
  z-index: 2000;
}

.van-loading--white {
  padding: 10px;
  border-radius: 3px;
  background-color: rgba(0, 0, 0, 0.5);
}

.van-loading {
  display: inline-block;
  margin: 5px 0 5px 20px;
}

.van-loading {
  width: 30px;
  height: 30px;
  z-index: 0;
  font-size: 0;
  line-height: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -15px;
  margin-top: -15px;
  vertical-align: middle;
}

.van-loading--white circle {
  stroke: #fff;
}

.van-loading__circular circle {
  stroke-width: 3;
  stroke-linecap: round;
  -webkit-animation: van-circular 1.5s ease-in-out infinite;
  animation: van-circular 1.5s ease-in-out infinite;
}

.van-loading__spinner {
  animation-duration: 2s;
}

@-webkit-keyframes van-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}

@keyframes van-circular {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -40;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -120;
  }
}
</style>
