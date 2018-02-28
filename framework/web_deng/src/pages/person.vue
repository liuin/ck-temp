<template>
  <div class="person">
    <div class="box">
      <p class="p1">姓名：{{update.account}}</p>
      <p class="p1">用户名：{{update.nickname}}</p>
      <p class="p1">角色：{{update.admin_group_title}}</p>
      <p class="p1" style="margin-bottom:0;">密码：*****
        <el-button @click="$router.push({path: 'person/pwd'})">修改密码</el-button>
      </p>
    </div>
  </div>
</template>

<script>
  import {
    mapState
  } from "vuex"

  export default {
    name: '',
    data() {
      return {

      }
    },
    computed: {
      ...mapState('admin', ['update'])
    },
    created() {

      this.$store.dispatch('admin/show', {
        id: this.$store.state.login.aid
      })

      console.log(this.update);
    },
    methods: {},
    mounted: function () {}
  }

</script>

<style lang="less" scoped>
  .p1 {
    margin-bottom: 20px;
  }

</style>
