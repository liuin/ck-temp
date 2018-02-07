<template>
  <div class="message-list-detail">
    <breadcrumb></breadcrumb>

  <div class="line3"></div>

   <el-button type="primary" @click="$router.push({path:'/message/listAdd', query: {'edit': '123'}})" class="edit">重新编辑</el-button>

    <div class="line2"></div>
    <el-row>
      <el-col :span="8">
        <p class="p1">标题：我是标题我是标题</p>
        <p class="p1">推送时间：2018-01-10 00:00:00</p>
        <p class="p1">活动时间：2018-01-10至 2018-01-18</p>
        <p class="p1">封面图片：<img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" style="width:200px; height:150px; display:inline-block; background:#eee; vertical-align:top;" alt=""> </p>
      </el-col>

      <el-col :span="7">
        <p class="p1">分类：分类一</p>
        <p class="p1">状态：已结束</p>
        <p class="p1">点击量：</p>
        <p class="p1">送达量：</p>
        <p class="p1">推送量：</p>
      </el-col>

      <el-col :span="7">
        <p class="p1">推送用户：标签一</p>
        <p class="p1">推送地区：广东省 中山市</p>
        <p class="p1">点击率：</p>
        <p class="p1">送达率：</p>
      </el-col>
    </el-row>

    <div class="editbox">
      在这个寒冷的冬季
      小熊物流联合灯网、熊居网发暖心福利了
      好了接下来 直接进入主题，
      从现在起，
      我说的每一个字，
      都希望认真看懂哈，
      因为这是一个事关：
      如何0元拿福利的事
      新客户0元购保温杯或者莫斯利安（二选一）
      老客户可领取红包  人人有份！
    </div>


  </div>
</template>

<script>

  export default {
    name: '',
    data() {
      return {
        
      }
    },
    created() {
    },
    methods: {      
    },
    mounted:function(){
    }
  }
</script>

<style lang="less" scoped>
  .edit{display:block;margin-left:auto;}
  .p1 {line-height:30px;}
</style>