<template>
  <div class="message-cate">
    <breadcrumb></breadcrumb>
    <div class="line3"></div>

    <el-popover ref="popover2"  placement="top"  width="160"  >
       <el-form label-position="top" label-width="80px">
         <el-form-item label="分类名称">
           <el-input></el-input>
         </el-form-item>             
       </el-form>
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" >取消</el-button>
          <el-button type="primary" size="mini" >保存</el-button>
        </div>
     </el-popover>

    <el-button v-popover:popover2>添加分类</el-button>
    <div class="line2"></div>

    <el-table  width="100%"  :data="[{id:18821214125},{}]"  >
      <el-table-column prop="id" label="ID" ></el-table-column>
      <el-table-column prop="" label="分类名称" ></el-table-column>
      <el-table-column prop="" label="当前消息数" ></el-table-column>

      <el-table-column prop="" label="操作" width="250">
        <template slot-scope="scope">
         <el-popover ref="popover1"  placement="top"  width="160"  >
           <el-form label-position="top" label-width="80px">
             <el-form-item label="分类名称">
               <el-input></el-input>
             </el-form-item>             
           </el-form>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" >取消</el-button>
              <el-button type="primary" size="mini" >保存</el-button>
            </div>
         </el-popover>

          <el-button size="mini" v-popover:popover1 >编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

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