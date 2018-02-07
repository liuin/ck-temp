<template>
  <el-container id="app" direction="vertical">
    <transition name="el-fade-in">
      <el-progress class="topprogress" status="success" v-if="!($store.state.progress.per == 100) && ($store.state.login.token != '')"
        :percentage="($store.state.progress.per >= 100)? 100 : $store.state.progress.per" :show-text="false"></el-progress>
    </transition>
    <!-- /空布局 -->
    <template v-if="$store.state.login.token == ''">
      <el-main>
        <router-view/>
      </el-main>
    </template>

    <!-- /左右布局 -->
    <template v-else>
      <el-header class="header">
        <el-row type="flex" class="row1" align="middle">
          <el-col :span="4">
            <h1>LOGO</h1>
          </el-col>
          <el-col :span="20" class="c20">
            <el-button type="text" class="admin" @click="$router.push('/person')">管理员</el-button> &nbsp;&nbsp;&nbsp;
            <el-button type="text" class="admin" @click="loginOut()">退出</el-button>
          </el-col>
        </el-row>
      </el-header>

      <el-container>
        <el-aside class="aside-left" width="200px">
          <leftMenu />
        </el-aside>
        <el-main class="app-main" >
          <breadcrumb v-if="$store.state.leftMenu.menuData.length > 0"></breadcrumb>
          <div class="main-wrap" v-loading="$store.state.ajaxLoad">
            <router-view v-if="!$store.state.ajaxLoad" />
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
        this.$store.dispatch("admin/logout").then(data => {
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
  }

</style>
