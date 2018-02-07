<template >
<div>

     <el-breadcrumb separator-class="el-icon-arrow-right">
        <template  v-for="(item, index) in current" >
          <el-breadcrumb-item :to="{path: '/'+item.action}" v-if="item.action">{{item.title}}</el-breadcrumb-item> 
          <el-breadcrumb-item  v-else>{{item.title}}</el-breadcrumb-item>
        </template>           
     </el-breadcrumb>
</div>
</template>

<script>
  import {mapState} from "vuex"  

  export default {
    name: '',
    data() {
      return {
        current : []
      }
    },
    computed:{
      ...mapState('leftMenu', ['menuData'])
    },
    created() {
    },
    methods: {      
      findMenu(menu, path, deep){
        if (this.current.length > 0) {return}
        if (!deep) { var deep = "start" }

        for (var i = 0;  i<menu.length ; i++) {
          if ((menu[i].action) && (menu[i].action != "") && ('/' + menu[i].action ==  path )){
//            deep.push(menu[i]);
//            this.current = deep
            deep += '-' + i;
            console.log('ok!');  
            console.log(deep);
//            this.current = deep;
//            console.log(menuIn);
            break
          }else {            
//            deep = deep.substring(0, deep.length - 2);
//            return
            if ((menu[i].sub) && (menu[i].sub.length > 0)) {   
//              deep.push(menu[i].sub)
              deep += '-' + i
              this.findMenu (menu[i].sub, path, deep)
            }else {
//              if (deep.length > 0) {
//              }
//              console.log(deep);
//              deep = deep.splice(deep.length - 1, 1);
              deep = "";
            }
          }
        }
      }
    },
    mounted:function(){
      this.findMenu(this.menuData, this.$route.path)
    }
  }
</script>

<style lang="less" scoped>
</style>