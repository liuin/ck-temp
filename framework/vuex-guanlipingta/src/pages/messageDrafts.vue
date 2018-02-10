<template>
  <div class="message-list">
    <div class="box">
      <el-table  width="100%" border :data="[{id:18821214125},{}]"  >
        <el-table-column prop="id" label="ID" ></el-table-column>      
        <el-table-column prop="" label="标题" ></el-table-column>      
        <el-table-column prop="" label="分类" ></el-table-column>  
        <el-table-column prop="" label="保存时间"  ></el-table-column> 
  
        <el-table-column prop="" label="操作" width="250">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push({path: '/message/listAdd', 'query': {'edit': '123'}})">编辑</el-button>
            <el-button size="mini" >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
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
</style>