<template>
  <div class="customers grebg grebgflex">
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
            {{item.code}}
          </template>
        </van-cell>

        <div class="loadingBottom" v-if="waterfallLoading == true">
          <van-loading type="circle" color="white" />
        </div>
      </van-pull-refresh>
    </van-cell-group>

  </div>
</template>
<script>
export default {
  name: "customers",
  data() {
    return {
      waterfallLoading: false,
      refreshLoading: false,
      totle: 235855544,
      pages: 1,
      list: [
        {
          img:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          name: "卡吹娜1",
          code: 12345678
        },
        {
          img:
            "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
          name: "卡吹娜2",
          code: 12345678
        }
      ]
    };
  },
  created() {},
  watch: {
    refreshLoading() {
      this.$api.ajax({
        type: "post",
        url: this.$api.url.demo,
        // data: data,
        // dataType: "dataType",
        noLoading: true,
        success: data => {
          // this.$store.commit("login/changeToken", "login");
          // this.$router.push("/");
          this.pages = 0;
          this.refreshLoading = false;

          this.list = [
            {
              img:
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
              name: "卡吹娜ref1",
              code: 12345678
            },
            {
              img:
                "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
              name: "卡吹娜ref2",
              code: 12345678
            }
          ];
        }
      });
    }
  },
  methods: {
    waterfallLoad() {
      this.pages++;
      if (this.pages >= 10 || this.waterfallLoading == true) {
        return;
      }
      this.waterfallLoading = true;
      this.$api.ajax({
        type: "post",
        url: this.$api.url.demo,
        data: {
          page: this.pages
        },
        noLoading: true,
        success: data => {
          this.waterfallLoading = false;

          this.list.push({
            img:
              "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            name: "卡吹娜ref1" + this.pages,
            code: 12345678
          });
        }
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
</style>
