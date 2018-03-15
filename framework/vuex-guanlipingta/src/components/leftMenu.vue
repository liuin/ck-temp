<template>
  <el-row class="tac" v-loading="_.isEmpty(menuData)">
    <el-col>
      <el-menu :unique-opened="true" :router="true" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :default-active="$store.state.leftMenu.defaultActive">
        <el-submenu v-for="(item, index) in menuData" :key="index" :index="'menu'+index">

          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>


          <el-menu-item v-for="(itemSub, indexSub) in item.sub" :index="'/' + itemSub.action" :key="indexSub">
            <i v-if="itemSub.icon" :class="itemSub.icon"></i> {{itemSub.title}}</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "leftMenu",
  data() {
    return {
      menu: []
    };
  },
  computed: {
    ...mapState("leftMenu", ["menuData"])
  },
  created() {
    this.$store.dispatch("leftMenu/loadLeftMenu");
    // this.$store.dispatch("leftMenu/uploadLeftMenu");
  },
  methods: {
    handleClose() {},
    handleOpen(index) {}
  },
  mounted: function() {}
};
</script>

<style lang="less" scoped>
.tac {
  height: 100%;
}
</style>
