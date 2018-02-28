<template>
  <div class="home">
    home
  </div>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'home',
    data() {
      return {
        
      }
    },
    created() {
      this.$router.push('user/driverList');
    },
    methods: {
    },
    mounted:function(){
      
    }
  }
</script>

<style lang="less" scoped>
</style>