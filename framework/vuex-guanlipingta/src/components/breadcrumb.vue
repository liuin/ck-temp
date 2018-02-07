<template >
<div class="breadcrumb">
     <el-breadcrumb separator-class="el-icon-arrow-right">
        <template  v-for="(item, index) in current" >
          <el-breadcrumb-item :key="index" :to="{path: '/'+item.action}" v-if="item.action">{{item.title}}</el-breadcrumb-item> 
          <el-breadcrumb-item  v-else :key="index">{{item.title}}</el-breadcrumb-item>
        </template>           
     </el-breadcrumb>
</div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "",
  data() {
    return {
      current: []
    };
  },
  computed: {
    ...mapState("leftMenu", ["menuData"])
  },
  created() {
    
  },
  methods: {
    findMenu(menu, path) {
      if (this.current.length > 0) {
        return "done";
      }
      for (var i = 0; i < menu.length; i++) {
        //          var query = "";
        //          if (menu[i].query && menu[i].query != "") {
        //            query = menu[i].query
        //          }else {
        //            query = ""
        //          }
        //          if ((menu[i].action) && (menu[i].action != "") && (('/' + menu[i].action + query) ==  path )){
        if (
          menu[i].action &&
          menu[i].action != "" &&
          "/" + menu[i].action == path
        ) {
          var arr = [];
          menu[i].subIndex.map((item, index) => {
            if (index == 0) {
              arr.push(this.menuData[item]);
            } else {
              var k = arr[index - 1].sub[item];
              arr.push(k);
            }
          });
          this.current = arr;

          if (arr.length >= 3) {
            this.$store.commit("setState", [
              { defaultActive: "/" + arr[1].action },
              this.$store.state.leftMenu
            ]);
          }

          break;
        } else {
          if (menu[i].sub && menu[i].sub.length > 0) {
            this.findMenu(menu[i].sub, path);
          }
        }
      }
    }
  },
  mounted: function() {
    //      var query = "";
    //      if (this.$route.query) {
    //        for (var i in this.$route.query) {
    //          query += "&" + i
    //        }
    //      }else {
    //        query = ""
    //      }
    //      this.findMenu(this.menuData, this.$route.path + query)
    this.findMenu(this.menuData, this.$route.path);
  }
};
</script>

<style lang="less" scoped>
.breadcrumb {
  background: #fff;
  margin-left: -20px;
  margin-right: -20px;
  padding-left: 20px;
  padding-right: 20px;
  line-height: 40px;
  height: 40px;
}

</style>