<template>
  <el-container id="app" direction="vertical">
    <transition name="el-fade-in">
      <el-progress class="topprogress" status="success" v-if="!($store.state.progress.per == 100) && ($store.state.login.token != '')"
        :percentage="($store.state.progress.per >= 100)? 100 : $store.state.progress.per" :show-text="false"></el-progress>
    </transition>
    <!-- /空布局 -->

    <template v-if="$store.state.login.token == ''">
      <el-main class="login-main">
        <transition name="el-fade-in-linear">
          <router-view/>
        </transition>
      </el-main>
    </template>

    <!-- /左右布局 -->
    <template v-else>
      <transition name="el-fade-in-linear">
        <el-header class="header">
          <el-row type="flex" class="row1" align="middle">
            <el-col :span="10">
              <h2 style="margin-bottom:0; ">笨熊物流后台管理系统</h2>
            </el-col>
            <el-col :span="14" class="c20">
              <el-button type="text" class="admin" @click="$router.push('/person')">{{$store.state.login.nickname}}</el-button> &nbsp;&nbsp;&nbsp;
              <el-button type="text" class="admin" @click="loginOut()">退出</el-button>
            </el-col>
          </el-row>o
        </el-header>
      </transition>
      <el-container>
        <transition name="el-fade-in-linear">
          <el-aside class="aside-left" width="200px">
            <leftMenu />
          </el-aside>
        </transition>
        <el-main class="app-main">
          <transition name="el-fade-in-linear">
            <breadcrumb v-if="$store.state.leftMenu.menuData.length > 0"></breadcrumb>
          </transition>
          <div class="main-wrap" v-loading="$store.state.ajaxLoad">
            <div class="page">
              <transition name="el-fade-in-linear">
                <router-view v-if="!$store.state.ajaxLoad" />
              </transition>
            </div>
          </div>
        </el-main>
      </el-container>

    </template>
  </el-container>

</template>

<script>
import leftMenu from "@/components/leftMenu";
//import breadcrumb from '@/components/breadcrumb.vue'
//import pnation from '@/components/pnation.vue'
export default {
  name: "App",
  components: {
    leftMenu
  },
  methods: {
    loginOut() {
      // this.$router.push("/login");
      this.$store.dispatch("admin/logout").then(data => {
        this.$store.commit("setState", [
          {
            aid: "",
            token: ""
          },
          this.$store.state.login
        ]);
        sessionStorage.setItem("aid", "");
        sessionStorage.setItem("token", "");
        sessionStorage.setItem("nickname", "");

        this.$router.push("/login");
      });
    }
  }
};
</script>

<style lang="less" scoped>
.header {
  background: #4397e6;
  color: #fff;
  .row1 {
    height: 100%;
  }
}

.c20 {
  text-align: right;
}

.admin {
  color: #fff;
  display: inline-block;
  margin-left: auto;
}

h1 {
  margin: 0;
}

.aside-left {
  background: #263238;
}

.app-main {
  background: #f1f4f5;
  padding-top: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.login-main {
  height: 100%;
}
</style>
