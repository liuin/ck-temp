<template>
  <el-pagination class="pnation" :current-page="currentPage" @current-change="change" background layout="prev, pager, next" :total="total" :page-size="size"></el-pagination>
</template>

<script>
  export default {
    name: 'pnation',
    props:{
      "total": {
        type: [String,Number]
      },
      "size": {
        type: [String,Number]
      },
      "currentPage": {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
      }
    },
    created() {
     
    },
    methods: {
      change(currenPage){
        this.$emit('changePage', currenPage)
      }

    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
</style>