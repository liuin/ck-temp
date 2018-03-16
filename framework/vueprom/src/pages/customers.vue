<template>
  <div class="customers grebg grebgflex" >
    <van-nav-bar title="客户数量" left-arrow @click-left="$router.back()" />

    <van-cell-group class="van-cell-group1">
      <van-cell>
        <template slot="title">
          <span class="van-cell-text">总客户数量: {{totle}}</span>
        </template>
      </van-cell>
      <van-pull-refresh v-model="refreshLoading" class="van-pull-refresh1" v-waterfall-lower="waterfallLoad" waterfall-disabled="waterfallLoading"
        waterfall-offset="0">

        <van-cell class="listitme" v-for="item in list" :key="item.name">
          <template slot="title">
            <img :src="item.img" alt="">
            <span class="name">{{item.name}}</span>
          </template>
          <template>
            {{cuesterState[item.state]}}
          </template>
        </van-cell>
        <div class="loadingBottom" v-if="waterfallLoading == true && endData == false">
          <van-loading type="circle" color="white" />
        </div>
      </van-pull-refresh>
    </van-cell-group>


    <div class="enpty" v-if="list.length ==0 && endData == true">
      暂无数据
    </div>

  </div>
</template>
<script>
// import wx from "weixin-js-sdk";
import { dfImg } from "../store/modules/gloable.js";
// import { weixinShare } from "../store/modules/weixinShare.js";

export default {
  name: "customers",
  data() {
    return {
      cuesterState: {
        1: "通过",
        2: "未通过",
        0: "未审核",
        3: "信息更新"
      },
      waterfallLoading: false,
      refreshLoading: false,
      totle: "加载中...",
      endData: false,
      ajaxLoadState: false,
      page: 1,
      list: []
    };
  },
  mixins: [dfImg],
  created() {
    this.waterfallLoad();
  },
  watch: {
    refreshLoading() {
      this.page = 1;
      this.endData = false;
      this.loadData("refresh", () => {
        this.refreshLoading = false;
        // this.page++;
      });
    }
  },
  methods: {
    loadData(type, cb) {
      if (this.ajaxLoadState == true) {
        this.waterfallLoading = false;
        return;
      }
      this.ajaxLoadState = true;
      this.$api.ajax({
        type: "post",
        url: this.$api.url.userGetCustomersByMe,
        data: {
          page: this.page
        },
        noLoading: true,
        // dataType: "dataType",
        success: data => {
          this.page++;
          this.totle = data.total;
          this.ajaxLoadState = false;
          if (data.list.length == 0) {
            this.endData = true;
            this.waterfallLoading = false;
            return;
          }
          let arr = [];
          for (let index = 0; index < data.list.length; index++) {
            var item = {
              img:
                data.list[index].dealer_avatar + "!desc" || dfImg.dfImgBase64,
              name: data.list[index].dealer_name,
              state: data.list[index].dealer_state
              // "code": 12345678
            };
            arr.push(item);
          }

          if (type == "refresh") {
            this.list = arr;
          } else {
            this.list = this.list.concat(arr);
          }

          if (cb) {
            return cb();
          }
        }
      });
    },
    waterfallLoad() {
      if (
        this.endData == true ||
        this.waterfallLoading == true ||
        this.refreshLoading == true
      ) {
        return;
      }

      this.waterfallLoading = true;
      this.loadData("waterfall", () => {
        this.waterfallLoading = false;
      });
    }
  },
  mounted: function() {}
};
</script>
<style lang="less" scoped>
.loadingBottom {
  padding-top: 10px;
  text-align: center;
  margin: 0 auto;
  width: 20px;
  padding-bottom: 10px;
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

.van-pull-refresh1 {
  height: 100%;
}

.customers {
  display: flex;
  flex-direction: column;
}

.enpty {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 100px;
  height: 100px;
  // background: #666;
  line-height: 100px;
  font-size: 18px;
  color: #666;
  text-align: center;
  border-radius: 10px;
  margin-left: -50px;
  margin-top: -50px;
}
</style>
